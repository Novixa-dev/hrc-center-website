# Production Readiness & Go-Live Checklist

> **Target Release:** Version 1.0.0 (`v1.0.0`)  
> **Platform:** Hadramout Research Center Official Web Portal  
> **Authority:** Novixa Digital Solutions & HRC IT Operations  

This document serves as the formal operational sign-off checklist prior to pointing production DNS records (`hrc.ahgaff.edu`) to the hosting environment.

---

## 1. Pre-Flight Verification (T-7 Days)

| Category | Verification Item | Status | Verified By | Notes |
|---|---|---|---|---|
| **Code Freeze** | Git repository tagged at `v1.0.0` with clean working tree | ✅ PASS | Novixa Lead | Commit `25bafba` |
| **Unit Tests** | 109/109 Vitest unit tests passing across all collections | ✅ PASS | CI / Automated | `pnpm test:unit` |
| **E2E Tests** | 206/206 Playwright tests passing on Desktop & Mobile viewports | ✅ PASS | CI / Automated | `pnpm test:e2e` |
| **Static Build** | 55/55 static pages prerendered in Next.js production build | ✅ PASS | Next.js Turbopack | `pnpm build` |
| **Accessibility** | 0 axe-core violations; WCAG 2.2 AA and AAA compliance | ✅ PASS | Automated axe | Tested on all 13 routes |
| **Contrast** | 0 color contrast failures in `scripts/check-contrast.py` | ✅ PASS | Python audit | Light and Dark modes |
| **Progressive Enh.** | Full document & contact form functional without JavaScript | ✅ PASS | Automated E2E | `shell.spec.ts` |
| **Layout Stability** | CLS < 0.05 across desktop and mobile | ✅ PASS | PerformanceObserver | Measured < 0.031 |
| **Security Headers** | `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, `Permissions-Policy` | ✅ PASS | `vercel.json` | Configured and verified |

---

## 2. Infrastructure & Environment Configuration (T-2 Days)

| Component | Target Requirement | Production Value | Check |
|---|---|---|---|
| **Canonical URL** | `NEXT_PUBLIC_SITE_URL` | `https://hrc.ahgaff.edu` (or custom domain) | ⬜ Required at deploy |
| **WhatsApp Contact** | `NEXT_PUBLIC_WHATSAPP` | International format without `+` (e.g. `9675360303`) | ⬜ Optional (HRC to confirm) |
| **Email Service** | `RESEND_API_KEY` | Production API key from verified Resend domain | ⬜ Required for email delivery |
| **Receiving Inbox** | `CONTACT_TO_EMAIL` | Official center inbox (e.g. `info@hrc-center.org`) | ⬜ Required for email delivery |
| **Sender Address** | `CONTACT_FROM_EMAIL` | Verified sender (e.g. `notifications@hrc-center.org`) | ⬜ Required for email delivery |
| **Node.js Runtime** | Node 20 LTS or 22 LTS | Active LTS on VPS or Vercel Node 20 runtime | ✅ Supported |
| **SSL / TLS** | Automatic Let's Encrypt / Vercel Edge TLS | Forced HTTPS redirect (port 443) | ✅ Handled by edge |

---

## 3. Go-Live Day Actions (T-0)

- [ ] **Step 1: Deploy to Staging/Production Environment**
  - Verify build logs show `55/55 static pages` generated with zero errors.
- [ ] **Step 2: DNS Cutover**
  - Configure `A` or `CNAME` records at domain registrar.
  - Verify propagation using `dig hrc.ahgaff.edu` or online DNS checkers.
- [ ] **Step 3: SSL Certificate Issuance**
  - Verify HTTPS certificate is active and valid (green padlock).
- [ ] **Step 4: End-to-End Smoke Test on Production URL**
  - Visit `https://domain.com/` → confirms clean redirect to `/ar` (or `/en`).
  - Switch language to `/en` → confirms route mirror.
  - Navigate to `/ar/training` → toggle filter chips; confirm URL updates.
  - Navigate to `/ar/research` → verify Journal Issue 1 links.
  - Submit live test message on `/ar/contact` → confirm delivery to `CONTACT_TO_EMAIL`.
- [ ] **Step 5: Search Engine Registration**
  - Submit `https://domain.com/sitemap.xml` to Google Search Console.
  - Verify `https://domain.com/robots.txt` is crawlable.

---

## 4. Post-Launch Monitoring (T+24 Hours)

- [ ] Check Vercel / Nginx server error logs for unexpected 500 errors.
- [ ] Verify contact form submission success rate and spam rejection rates.
- [ ] Review Core Web Vitals in Google Search Console (LCP, FID/INP, CLS).
- [ ] Announce platform launch across official channels using [`docs/marketing/hrc-social-kit.md`](../marketing/hrc-social-kit.md).

---

## 5. Sign-Off Authorization

| Role | Name / Organization | Signature | Date |
|---|---|---|---|
| **Technical Lead** | Novixa Digital Solutions | *Novixa Engineering Team* | 2026-09-09 |
| **Client Project Lead** | Hadramout Research Center | _________________________ | __ / __ / 2026 |
| **University IT Liaison** | Al-Ahgaff University IT | _________________________ | __ / __ / 2026 |
