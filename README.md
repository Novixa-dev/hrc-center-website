<div align="center">

# Hadramout Research Center — Web Platform
### مركز بحوث حضرموت — المنصة الرقمية الرسمية

**An independent, bilingual (Arabic / English), accessible, and high-performance digital web platform for the Hadramout Research Center (HRC) at Al‑Ahgaff University, Mukalla, Yemen.**

[![Production Build](https://img.shields.io/badge/Build-Passing%20(55%20SSG%20pages)-success?style=flat-square)](docs/reports/final-delivery-report.md)
[![Tests](https://img.shields.io/badge/Tests-315%20passed%20(100%25)-brightgreen?style=flat-square)](docs/reports/final-delivery-report.md)
[![A11y](https://img.shields.io/badge/WCAG%202.2-Level%20AA%20%26%20AAA-blue?style=flat-square)](docs/reports/final-delivery-report.md)
[![Version](https://img.shields.io/badge/Release-v1.0.0-indigo?style=flat-square)](https://github.com/Novixa-dev/hrc-center-website/releases/tag/v1.0.0)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNovixa-dev%2Fhrc-center-website)

Delivered pro‑bono by [Novixa Digital Solutions](https://novixa-cyan.vercel.app/ar) · Software Engineering & Digital Products.

</div>

---

## Overview

The **Hadramout Research Center (HRC)** web platform provides an authoritative, modern digital home for Eastern Yemen's prominent academic research and training institution.

It features complete bilingual parity (Arabic primary, English secondary), showcasing the peer-reviewed *Al-Ahgaff Journal for Social Sciences*, vocational and linguistic training diplomas, academic conferences, community research services, and accessible inquiry pathways.

---

## Status & Release

- **Current Version:** `v1.1.0` (Production Ready — Google AI Studio & Vercel Suite)
- **Completed Sprints:** 10 / 10 Sprints Complete (Sprint 0 through Sprint 9)
- **Deployment Status:** Fully configured for Vercel and Linux VPS / Node.js
- **Cumulative Report:** [`docs/reports/global-report.md`](docs/reports/global-report.md)
- **Final Delivery Report:** [`docs/reports/final-delivery-report.md`](docs/reports/final-delivery-report.md)
- **Live Progress Tracker:** [`docs/reports/global-progress.md`](docs/reports/global-progress.md)

---

## Key Features

- **100% Bilingual Parity:** 13 page types fully mirrored across Arabic (RTL) and English (LTR) with instant, flicker-free language switching and localized Schema.org structured data.
- **56 Static Prerendered Pages (SSG):** Ultra-fast page loads with zero-compute edge delivery and instant Time to First Byte (TTFB).
- **Authentic Hadrami Aesthetic:** Designed with a classical scholarly palette (warm paper, deep institutional navy, sand/bronze accents) and the authentic eight-point Hadrami star (`نجمة`) motif. Zero generic templates or "AI-smell".
- **WCAG 2.2 AA & AAA Accessibility:** 0 axe-core accessibility violations across 206 automated browser tests; accessible skip links, visible focus rings, and high-contrast typography.
- **Progressive Enhancement & Resilience:** The complete document structure, navigation, and contact form submissions remain 100% functional even when client JavaScript is restricted or disabled.
- **Layout Stability:** Cumulative Layout Shift (CLS) maintained strictly below `0.031` (Google "Good" threshold is < 0.05).
- **Google AI Studio Research Assistant:** Integrated intelligent academic assistant powered by Google Gemini with dual-layer grounding (offline HRC knowledge engine fallback + real-time Gemini generation).
- **Institutional Integrity:** Strictly enforces the "Institutional Truth" policy—unconfirmed leadership appointments or speculative dates are gated behind `confirmed: false` or neutral "to be announced" placeholders.

---

## Technology Stack

| Layer | Technology | Purpose / Notes |
|---|---|---|
| **Framework** | **Next.js 16 (App Router)** | Static site generation (SSG), Turbopack build optimization, React Server Components (RSC) |
| **Language** | **TypeScript 5 (Strict)** | End-to-end type safety, strict null checking, Zod schema validation |
| **Styling** | **Tailwind CSS v4 + Design Tokens** | Pure token-driven CSS architecture (`tokens.css`), 0 arbitrary hex colors in components |
| **AI Integration** | **Google AI Studio (Gemini)** | Academic research assistant, bilingual publication Q&A, and offline fallback engine |
| **Internationalization** | **next-intl 4** | Edge middleware locale negotiation (`/ar`, `/en`), localized metadata, ICU message formatting |
| **Content Engine** | **Markdown + Gray-Matter** | Structured Git-based content collections (`news`, `programs`, `publications`, `conferences`) |
| **Forms & Anti-Bot** | **Server Actions + Resend** | Progressive enhancement `<form action>`, honeypot trap, elapsed submission time detection |
| **Unit Testing** | **Vitest 3** | Fast ESM unit testing (115 tests across 10 suites) |
| **End-to-End Testing** | **Playwright** | Full browser matrix (Desktop Chromium + Mobile Pixel 7, 206 tests across 8 specs) |
| **Code Quality** | **ESLint 9 + Prettier + Husky** | Flat config, Commitlint conventional commits, pre-commit lint-staged hooks |

---

## Quick Start & Local Development

### Prerequisites
- **Node.js:** v20.x or v22.x LTS
- **Package Manager:** `pnpm` v9.x or v10.x (`corepack enable pnpm`)

### Setup
```bash
# Clone the repository
git clone https://github.com/Novixa-dev/hrc-center-website.git
cd hrc-center-website

# Install dependencies with frozen lockfile
pnpm install --frozen-lockfile

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
# Opens at http://localhost:3000 (redirects automatically to /ar)
```

### Verification Commands
```bash
# Run ESLint check
pnpm lint

# Run TypeScript type check
pnpm typecheck

# Run unit tests
pnpm test:unit

# Run full Playwright E2E matrix
pnpm test:e2e

# Run color contrast audit
python scripts/check-contrast.py

# Build production bundle (generates 55 static pages)
pnpm build

# Serve production build locally
pnpm start
```

---

## Repository Map

```
hrc-center-website/
├── docs/                               # Comprehensive project documentation
│   ├── content/                        # Bilingual copy & 36-point review checklist
│   ├── design/                         # Design system, brand identity, tokens, typography, a11y
│   ├── guides/                         # Deploy guide, content editing guide, coding standards
│   ├── marketing/                      # Novixa case study, HRC social kit, handover presentation
│   ├── planning/                       # Master plan, PRD, IA, technical architecture, DoD
│   ├── reports/                        # Global cumulative report, final delivery report, progress
│   ├── research/                       # Primary source gathering (HRC, Al-Ahgaff, Hadramout)
│   ├── skills/                         # Skill specs & references
│   ├── sprints/                        # Sprint dossiers: S0 to S9 (plans, tasks, progress, reports)
│   └── testing/                        # Test strategy & QA checklists
├── public/                             # Public static assets (favicons, brand motif, manifest)
├── src/
│   ├── app/                            # Next.js App Router ([locale] routing, sitemap, robots, RSS)
│   ├── components/                     # Component architecture (ui, layout, sections, brand)
│   ├── content/                        # Markdown content collections (news, programs, publications, conferences)
│   ├── i18n/                           # Routing & internationalization configuration
│   ├── lib/                            # Business logic, collections loader, schema helpers, fonts
│   ├── messages/                       # Bilingual UI catalogs (ar.json, en.json)
│   ├── styles/                         # Tailwind v4 globals and design tokens (tokens.css)
│   └── proxy.ts                        # Edge middleware for localized URL routing
├── tests/
│   ├── e2e/                            # Playwright browser test specs & axe-core accessibility checks
│   └── unit/                           # Vitest unit test suites
├── .env.example                        # Documented environment variable template
├── vercel.json                         # Production deployment configuration & security headers
├── POST_DEPLOYMENT_CONFIG.md           # Master post-deployment keys & production configuration guide
└── README.md                           # This document
```

---

## Handover & Documentation Links

- **Post-Deployment & Keys Playbook:** [`POST_DEPLOYMENT_CONFIG.md`](POST_DEPLOYMENT_CONFIG.md) *(Essential)*
- **Google AI Studio (Gemini) Integration Guide:** [`docs/guides/google-ai-studio-integration.md`](docs/guides/google-ai-studio-integration.md)
- **Transactional Email Setup Guide:** [`docs/guides/email-setup-guide.md`](docs/guides/email-setup-guide.md)
- **Deployment & Hosting Guide:** [`docs/guides/deploy-guide.md`](docs/guides/deploy-guide.md)
- **Content Editing & Authoring Guide:** [`docs/guides/content-editing-guide.md`](docs/guides/content-editing-guide.md)
- **Content Review Checklist (36 items):** [`docs/content/content-review-checklist.md`](docs/content/content-review-checklist.md)
- **Novixa Agency Case Study:** [`docs/marketing/novixa-case-study.md`](docs/marketing/novixa-case-study.md)
- **HRC Launch Social Media Kit:** [`docs/marketing/hrc-social-kit.md`](docs/marketing/hrc-social-kit.md)
- **Handover Presentation Deck:** [`docs/marketing/handover-presentation.md`](docs/marketing/handover-presentation.md)
- **Final Delivery Report:** [`docs/reports/final-delivery-report.md`](docs/reports/final-delivery-report.md)

---

## Content Integrity & Legal Notice

This website represents a **real academic institution**. All factual claims have been verified against official Al-Ahgaff University publications, with any unconfirmed details strictly gated.

Designed and developed by **Novixa Digital Solutions**. Delivered pro‑bono to the **Hadramout Research Center**, Al‑Ahgaff University, Mukalla, Hadramout, Yemen.
