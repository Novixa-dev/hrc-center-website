import { z } from 'zod';

/** Contact subjects. `key` maps to messages `contact.subjects.<key>`. */
export const CONTACT_SUBJECTS = [
  'general',
  'research',
  'consultancy',
  'training',
  'program',
  'media',
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export function isContactSubject(v: unknown): v is ContactSubject {
  return (
    typeof v === 'string' && (CONTACT_SUBJECTS as readonly string[]).includes(v)
  );
}

/**
 * The visible fields. Error messages are message *keys* (`contact.errors.<key>`)
 * so the UI localizes them — the schema never carries user-facing English.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'name').max(120, 'nameLong'),
  email: z.string().trim().email('email').max(254, 'emailLong'),
  subject: z.enum(CONTACT_SUBJECTS, { message: 'subject' }),
  message: z.string().trim().min(20, 'messageShort').max(4000, 'messageLong'),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Minimum seconds between the form rendering and a genuine human submitting it. */
export const MIN_FILL_SECONDS = 3;

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; fieldErrors: Partial<Record<keyof ContactInput, string>> }
  | { ok: false; spam: 'honeypot' | 'tooFast' };

/**
 * Validate a raw submission. `honeypot` must be empty; `elapsedSeconds` is the
 * time from render to submit. Spam checks run first and return a generic result
 * (the UI shows a neutral "please try again" — never "you look like a bot").
 */
export function validateContact(raw: {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  honeypot?: unknown;
  elapsedSeconds?: number | undefined;
}): ContactValidation {
  if (typeof raw.honeypot === 'string' && raw.honeypot.trim() !== '') {
    return { ok: false, spam: 'honeypot' };
  }
  if (
    typeof raw.elapsedSeconds === 'number' &&
    raw.elapsedSeconds >= 0 &&
    raw.elapsedSeconds < MIN_FILL_SECONDS
  ) {
    return { ok: false, spam: 'tooFast' };
  }

  const parsed = contactSchema.safeParse({
    name: raw.name,
    email: raw.email,
    subject: raw.subject,
    message: raw.message,
  });
  if (parsed.success) return { ok: true, data: parsed.data };

  const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !fieldErrors[key]) {
      fieldErrors[key] =
        typeof issue.message === 'string' && issue.message
          ? issue.message
          : key;
    }
  }
  return { ok: false, fieldErrors };
}
