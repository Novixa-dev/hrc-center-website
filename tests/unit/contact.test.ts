import { describe, expect, it } from 'vitest';
import {
  CONTACT_SUBJECTS,
  isContactSubject,
  MIN_FILL_SECONDS,
  validateContact,
} from '@/lib/contact';

describe('contact validation & spam checks', () => {
  const validPayload = {
    name: 'أحمد الحضرمي',
    email: 'ahmed@example.com',
    subject: 'research',
    message: 'هذه رسالة استفسار مفصلة تزيد عن عشرين حرفاً لغرض البحث العلمي.',
    honeypot: '',
    elapsedSeconds: 5,
  };

  it('accepts a fully valid submission', () => {
    const result = validateContact(validPayload);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe(validPayload.name);
      expect(result.data.email).toBe(validPayload.email);
      expect(result.data.subject).toBe('research');
    }
  });

  it('validates all allowed contact subjects', () => {
    for (const sub of CONTACT_SUBJECTS) {
      expect(isContactSubject(sub)).toBe(true);
      const res = validateContact({ ...validPayload, subject: sub });
      expect(res.ok).toBe(true);
    }
    expect(isContactSubject('invalid-subject')).toBe(false);
  });

  it('rejects submissions with filled honeypot as spam', () => {
    const result = validateContact({
      ...validPayload,
      honeypot: 'https://spambot.xyz',
    });
    expect(result).toEqual({ ok: false, spam: 'honeypot' });
  });

  it('rejects submissions submitted faster than MIN_FILL_SECONDS as spam', () => {
    const result = validateContact({
      ...validPayload,
      elapsedSeconds: MIN_FILL_SECONDS - 1,
    });
    expect(result).toEqual({ ok: false, spam: 'tooFast' });
  });

  it('flags missing or invalid name', () => {
    const shortName = validateContact({ ...validPayload, name: ' ' });
    expect(shortName.ok).toBe(false);
    if (!shortName.ok && 'fieldErrors' in shortName) {
      expect(shortName.fieldErrors.name).toBeDefined();
    }
  });

  it('flags invalid email address format', () => {
    const badEmail = validateContact({
      ...validPayload,
      email: 'not-an-email',
    });
    expect(badEmail.ok).toBe(false);
    if (!badEmail.ok && 'fieldErrors' in badEmail) {
      expect(badEmail.fieldErrors.email).toBeDefined();
    }
  });

  it('flags invalid subject', () => {
    const badSubject = validateContact({ ...validPayload, subject: 'random' });
    expect(badSubject.ok).toBe(false);
    if (!badSubject.ok && 'fieldErrors' in badSubject) {
      expect(badSubject.fieldErrors.subject).toBeDefined();
    }
  });

  it('flags message shorter than 20 characters', () => {
    const shortMsg = validateContact({ ...validPayload, message: 'قصير جداً' });
    expect(shortMsg.ok).toBe(false);
    if (!shortMsg.ok && 'fieldErrors' in shortMsg) {
      expect(shortMsg.fieldErrors.message).toBe('messageShort');
    }
  });

  it('flags message longer than 4000 characters', () => {
    const longMsg = validateContact({
      ...validPayload,
      message: 'أ'.repeat(4001),
    });
    expect(longMsg.ok).toBe(false);
    if (!longMsg.ok && 'fieldErrors' in longMsg) {
      expect(longMsg.fieldErrors.message).toBe('messageLong');
    }
  });
});
