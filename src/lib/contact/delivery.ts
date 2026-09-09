import type { ContactInput } from '@/lib/contact';

export interface DeliveryResult {
  ok: boolean;
  deliveryId?: string | undefined;
  error?: string | undefined;
}

export interface ContactDeliveryPayload extends ContactInput {
  receivedAt: string;
  locale?: string;
  userAgent?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtmlEmail(payload: ContactDeliveryPayload): string {
  const isAr = payload.locale !== 'en';
  const dir = isAr ? 'rtl' : 'ltr';
  const textAlign = isAr ? 'right' : 'left';

  return `
<!DOCTYPE html>
<html lang="${payload.locale ?? 'ar'}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[HRC Enquiry] ${escapeHtml(payload.subject)}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #1e293b; direction: ${dir}; text-align: ${textAlign};">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
    <!-- Header -->
    <tr>
      <td style="padding: 28px; background-color: #0f2b48; color: #ffffff; text-align: center;">
        <div style="font-size: 20px; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 4px;">
          مركز بحوث حضرموت — جامعة الأحقاف
        </div>
        <div style="font-size: 13px; color: #94a3b8; letter-spacing: 0.5px;">
          Hadramout Research Center — Web Inquiries
        </div>
      </td>
    </tr>
    <!-- Subject Banner -->
    <tr>
      <td style="padding: 20px 28px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
        <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 9999px; background-color: #e0e7ff; color: #3730a3;">
          ${escapeHtml(payload.subject)}
        </span>
        <div style="font-size: 13px; color: #64748b; margin-top: 8px;">
          ${isAr ? 'تاريخ الاستلام:' : 'Received at:'} <strong>${escapeHtml(payload.receivedAt)}</strong>
        </div>
      </td>
    </tr>
    <!-- Sender Details -->
    <tr>
      <td style="padding: 24px 28px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 14px; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
          <tr>
            <td width="30%" style="color: #64748b; font-weight: 600;">${isAr ? 'الاسم:' : 'Sender Name:'}</td>
            <td style="color: #0f172a; font-weight: bold;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td width="30%" style="color: #64748b; font-weight: 600;">${isAr ? 'البريد الإلكتروني:' : 'Sender Email:'}</td>
            <td style="color: #0f172a;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(payload.email)}</a></td>
          </tr>
        </table>
        
        <!-- Message Body -->
        <div style="font-size: 13px; font-weight: bold; color: #475569; text-transform: uppercase; margin-bottom: 8px;">
          ${isAr ? 'نص الرسالة والاستفسار:' : 'Message Content:'}
        </div>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #1e293b;">${escapeHtml(payload.message)}</div>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding: 20px 28px; background-color: #f1f5f9; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0;">
        <div>${isAr ? 'تم إرسال هذه الرسالة عبر البوابة الإلكترونية لمركز بحوث حضرموت' : 'Sent via Hadramout Research Center Web Portal'}</div>
        <div style="margin-top: 4px; font-size: 11px; color: #94a3b8;">Engineered & Handled via Novixa Platform</div>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}

/**
 * Deliver a validated contact message. Uses a configured provider (e.g. Resend via API key)
 * or falls back to structured logging in development/staging when no provider secret exists.
 * No secret is committed; configure via process.env in production.
 */
export async function deliverContactMessage(
  payload: ContactDeliveryPayload,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@hrc-ahgaff.org';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          reply_to: payload.email,
          subject: `[HRC Enquiry: ${payload.subject}] from ${payload.name}`,
          text: `Name: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\nReceived: ${payload.receivedAt}\nLocale: ${payload.locale ?? 'ar'}\n\nMessage:\n${payload.message}`,
          html: buildHtmlEmail(payload),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('[contact-delivery] Provider rejected message:', errText);
        return { ok: false, error: 'Provider delivery failed' };
      }

      const json = (await res.json()) as { id?: string };
      return { ok: true, deliveryId: json.id };
    } catch (err) {
      console.error('[contact-delivery] Error calling provider:', err);
      return { ok: false, error: 'Provider connection error' };
    }
  }

  // Fallback (Dev / Staging / No key): Structured logging so the UX is testable
  console.info('[contact-delivery:dev-log]', {
    to: toEmail,
    from: payload.email,
    name: payload.name,
    subject: payload.subject,
    receivedAt: payload.receivedAt,
    locale: payload.locale,
    messageLength: payload.message.length,
  });

  return {
    ok: true,
    deliveryId: `dev-${Date.now()}`,
  };
}
