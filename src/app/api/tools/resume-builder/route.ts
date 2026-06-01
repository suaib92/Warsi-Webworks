import { NextRequest, NextResponse } from 'next/server';
import { ResumeAIInputSchema } from '@/lib/ai/validators';
import { PROMPTS } from '@/lib/ai/prompt-library';
import { generateCompletion } from '@/lib/ai/nvidia-provider';
import { checkRateLimit } from '@/lib/ai/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    // 2. Input Validation
    const body = await req.json();
    const result = ResumeAIInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input format.', details: result.error.format() },
        { status: 400 }
      );
    }

    const { action, text, context } = result.data;

    // 3. Prompt Construction
    const userPrompt = `
ACTION REQUESTED: ${action}

PROVIDED TEXT:
"${text || 'None'}"

CONTEXT/PARAMETERS:
"${context || 'None'}"

Execute the requested action and return the result.
`;

    // 4. AI Generation
    const aiResponse = await generateCompletion({
      systemPrompt: PROMPTS.RESUME_AI,
      userPrompt: userPrompt,
      temperature: 0.5, // Lower temp for more professional, deterministic outputs
    });

    // 5. Return Output
    return NextResponse.json(aiResponse);

  } catch (error: any) {
    console.error('[API Error - Resume Builder]:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during generation.' },
      { status: 500 }
    );
  }
}
