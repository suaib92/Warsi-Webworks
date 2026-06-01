import OpenAI from 'openai';

// Initialize the OpenAI client pointing to the NVIDIA NIM endpoint
// Using meta/llama-3.1-70b-instruct as a powerful, fast, and cost-effective default model.
const DEFAULT_MODEL = 'meta/llama-3.1-70b-instruct';

export const nvidiaClient = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY || '',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

interface GenerateCompletionArgs {
  systemPrompt: string;
  userPrompt: string;
  model?: string;
  temperature?: number;
}

/**
 * A robust wrapper around the NVIDIA API call that includes retries and error handling.
 */
export async function generateCompletion({
  systemPrompt,
  userPrompt,
  model = DEFAULT_MODEL,
  temperature = 0.7,
}: GenerateCompletionArgs) {
  
  if (!process.env.NVIDIA_API_KEY) {
    throw new Error('NVIDIA_API_KEY is not configured in the environment.');
  }

  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await nvidiaClient.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: temperature,
        max_tokens: 1500,
        response_format: { type: 'json_object' }, // Enforce JSON response
      });

      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content returned from AI provider.');
      }

      // Track usage metrics internally (could be sent to PostHog/Datadog here)
      const usage = response.usage;
      console.log(`[AI Tracking] Model: ${model} | Tokens: ${usage?.total_tokens} | Success`);

      return JSON.parse(content);

    } catch (error: any) {
      attempt++;
      
      // Log the error
      console.error(`[AI Error] Attempt ${attempt} failed:`, error.message);

      // If it's a rate limit or server error, we can wait and retry
      if (error.status === 429 || error.status >= 500) {
        if (attempt >= MAX_RETRIES) {
          throw new Error('AI Provider is currently overloaded. Please try again in a few moments.');
        }
        // Exponential backoff: wait 1s, 2s, 4s...
        const waitTime = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        // If it's a 400 Bad Request, API key issue, or parsing error, fail immediately
        throw new Error(`AI generation failed: ${error.message}`);
      }
    }
  }
}
