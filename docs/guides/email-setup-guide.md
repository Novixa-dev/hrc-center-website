# Email & Contact Notification Setup Guide

## Overview

Contact form inquiries submitted through the Hadramout Research Center (HRC) website are delivered via **Resend** (modern transactional email service) with automatic fallback to structured logging.

Delivered emails feature:
- Responsive, academic-branded HTML layout with HRC & Novixa styling.
- Bilingual RTL / LTR typography.
- Clear sender contact details (Name, Reply-To Email, Subject, Timestamp).
- Anti-spam honeypot filtering and minimum interaction threshold checks.

---

## 1. Setting up Resend (Recommended)

1. Sign up at **[Resend](https://resend.com/)**.
2. Go to **API Keys** and click **Create API Key** (permission: `Sending access`).
3. Under **Domains**, add your institutional domain (e.g., `hrc-ahgaff.org` or `mail.hrc-ahgaff.org`).
4. Add the requested DNS records at your domain registrar:
   - **DKIM** (TXT record)
   - **SPF** (TXT record)
   - **MX** (or return-path CNAME)
5. While waiting for domain verification, you can immediately test using Resend's verified test sender: `onboarding@resend.dev`.

---

## 2. Configuring on Vercel

In the **Vercel Dashboard**:
1. Open your project settings: **Settings** > **Environment Variables**.
2. Add:
   - `RESEND_API_KEY`: `re_xxxxxxxxxxxx`
   - `CONTACT_TO_EMAIL`: `info@hrc-ahgaff.org` (or admin inbox)
   - `CONTACT_FROM_EMAIL`: `HRC Web Portal <contact@hrc-ahgaff.org>` (or `onboarding@resend.dev` for testing)
3. Redeploy or trigger a build.

---

## 3. Verification & Testing

1. Open the live website `/ar/contact` (or `/en/contact`).
2. Fill in the form:
   - Name: `Test Researcher`
   - Email: `test@example.com`
   - Subject: `General Inquiry`
   - Message: `Testing institutional contact delivery.`
3. Submit the form. A success alert will appear.
4. Check the destination inbox (`CONTACT_TO_EMAIL`) or the Resend Dashboard logs at `https://resend.com/emails` to view the delivered email.
