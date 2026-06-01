import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { BusinessNameInputSchema } from '@/lib/ai/validators';
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
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    // 2. Input Validation
    const body = await req.json();
    const result = BusinessNameInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input format.', details: result.error.format() },
        { status: 400 }
      );
    }

    const { seed, industry } = result.data;

    // 3. Prompt Construction
    const userPrompt = `
Industry: ${industry}
Seed Keyword (Optional): ${seed || 'None provided'}

Please generate exactly 20 brandable names.
`;

    // 4. AI Generation
    const aiResponse = await generateCompletion({
      systemPrompt: PROMPTS.BUSINESS_NAME,
      userPrompt: userPrompt,
      temperature: 0.9, // Higher temp for more creative naming
    });

    // 5. Return Output
    return NextResponse.json(aiResponse);

  } catch (error: any) {
    console.error('[API Error - Business Name]:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during generation.' },
      { status: 500 }
    );
  }
}
