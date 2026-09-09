import { describe, it, expect } from 'vitest';
import {
  askResearchAssistant,
  HRC_GROUNDING_SYSTEM_PROMPT,
} from '@/lib/ai/gemini';
import { POST } from '@/app/api/assistant/route';

describe('HRC AI Research Assistant & Grounding Engine', () => {
  it('contains comprehensive HRC institutional grounding prompt', () => {
    expect(HRC_GROUNDING_SYSTEM_PROMPT).toContain('Hadramout Research Center');
    expect(HRC_GROUNDING_SYSTEM_PROMPT).toContain('Al-Ahgaff University');
    expect(HRC_GROUNDING_SYSTEM_PROMPT).toContain(
      'Al-Ahgaff University Journal',
    );
    expect(HRC_GROUNDING_SYSTEM_PROMPT).toContain(
      'Class and Politics in Hadramout',
    );
  });

  it('answers inquiries about Al-Ahgaff journal in Arabic with accurate metadata', async () => {
    const res = await askResearchAssistant({
      message: 'ما هي أعداد مجلة الأحقاف وتخصصاتها؟',
      locale: 'ar',
    });

    expect(res.reply).toContain('مجلة جامعة الأحقاف');
    expect(res.reply).toContain('التحكيم العلمي');
    expect(res.suggestions).toBeDefined();
    expect(res.suggestions?.length).toBeGreaterThan(0);
  });

  it('answers inquiries about training programs in English', async () => {
    const res = await askResearchAssistant({
      message: 'What professional training courses do you offer?',
      locale: 'en',
    });

    expect(res.reply).toContain('English Language');
    expect(res.reply).toContain('Soroban');
    expect(res.suggestions).toBeDefined();
  });

  it('handles general inquiries gracefully with institutional summary', async () => {
    const resAr = await askResearchAssistant({
      message: 'أهلاً بكم',
      locale: 'ar',
    });
    expect(resAr.reply).toContain('مركز بحوث حضرموت');

    const resEn = await askResearchAssistant({
      message: 'Hello there',
      locale: 'en',
    });
    expect(resEn.reply).toContain('Hadramout Research Center');
  });

  it('API route POST validates request body and rejects empty messages', async () => {
    const req = new Request('http://localhost:3000/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it('API route POST accepts valid message and returns assistant response', async () => {
    const req = new Request('http://localhost:3000/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'عن المؤتمر العلمي', locale: 'ar' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.reply).toBeDefined();
    expect(data.source).toBeDefined();
  });
});
