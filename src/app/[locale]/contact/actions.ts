'use server';

import { validateContact, type ContactInput } from '@/lib/contact';
import { deliverContactMessage } from '@/lib/contact/delivery';

export type ContactFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
  submittedValues?: Partial<Record<keyof ContactInput, string>>;
  spam?: boolean;
};

export async function submitContactAction(
  _prevState: ContactFormState | undefined,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const subject = formData.get('subject')?.toString() ?? '';
  const message = formData.get('message')?.toString() ?? '';
  const honeypot = formData.get('website')?.toString() ?? '';
  const renderedAtStr = formData.get('renderedAt')?.toString();
  const locale = formData.get('locale')?.toString() ?? 'ar';

  const renderedAt = renderedAtStr ? parseInt(renderedAtStr, 10) : 0;
  const elapsedSeconds =
    renderedAt > 0 ? (Date.now() - renderedAt) / 1000 : undefined;

  const validation = validateContact({
    name,
    email,
    subject,
    message,
    honeypot,
    elapsedSeconds,
  });

  if (!validation.ok) {
    if ('spam' in validation) {
      return {
        ok: false,
        spam: true,
        message: 'spam',
        submittedValues: { name, email, subject, message },
      };
    }
    return {
      ok: false,
      fieldErrors: validation.fieldErrors,
      submittedValues: { name, email, subject, message },
    };
  }

  const delivery = await deliverContactMessage({
    ...validation.data,
    receivedAt: new Date().toISOString(),
    locale,
  });

  if (!delivery.ok) {
    return {
      ok: false,
      message: 'generic',
      submittedValues: { name, email, subject, message },
    };
  }

  return {
    ok: true,
  };
}
