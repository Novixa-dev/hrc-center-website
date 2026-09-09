import { NextResponse } from 'next/server';
import { z } from 'zod';
import { askResearchAssistant } from '@/lib/ai/gemini';

const AssistantRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  locale: z.enum(['ar', 'en']).optional().default('ar'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(4000),
      }),
    )
    .optional()
    .default([]),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = AssistantRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.format() },
        { status: 400 },
      );
    }

    const response = await askResearchAssistant(parsed.data);
    return NextResponse.json(response);
  } catch (error) {
    console.error('[api/assistant] Handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process assistant request' },
      { status: 500 },
    );
  }
}
