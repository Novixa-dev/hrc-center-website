# Google AI Studio & Gemini Integration Guide

## Overview

The Hadramout Research Center (HRC) web platform features an integrated **AI Academic Research Assistant (المساعد الأكاديمي الذكي)** powered by Google AI Studio (Gemini).

Visitors, scholars, and students can interact with the assistant in Arabic or English to explore:
- *Al-Ahgaff University Journal* (مجلة جامعة الأحقاف) issues, scope, and double-blind peer review policies.
- Published historical monographs such as *Class and Politics in Hadramout* (الطبقة والسياسة في حضرموت).
- Specialized training programs (English Language Intensive Diploma, AI for Research & Productivity, Motion Graphics, Soroban Mental Arithmetic).
- Scientific conferences and call-for-papers procedures.

---

## 1. How to Obtain a Free Google AI Studio Key

1. Navigate to **[Google AI Studio](https://aistudio.google.com/)** and sign in with your Google account.
2. Click **Get API Key** in the top navigation or sidebar.
3. Click **Create API Key** (choose a Google Cloud project or create a default one).
4. Copy the generated API key (starts with `AIza...`).

---

## 2. Configuring on Vercel

To enable live Google AI Studio generation in your production deployment on Vercel:

1. Open your project on the **[Vercel Dashboard](https://vercel.com/dashboard)**.
2. Go to **Settings** > **Environment Variables**.
3. Add the following variables:
   - **Key**: `GEMINI_API_KEY`  
     **Value**: `AIzaSy...` (your Google AI Studio key)  
     **Target**: Production, Preview, Development
   - **Key** *(optional)*: `GEMINI_MODEL`  
     **Value**: `gemini-2.5-flash` (or `gemini-1.5-flash`)
4. Redeploy the project or push a new commit to trigger automatic deployment.

---

## 3. Local Development

In your local working copy:
1. Create or open `.env.local`:
   ```bash
   GEMINI_API_KEY=your_google_ai_studio_key_here
   GEMINI_MODEL=gemini-2.5-flash
   ```
2. Run `pnpm dev` and click the floating **المساعد الأكاديمي الذكي** button in the corner to test in real-time.

---

## 4. Built-in Offline Fallback Architecture

If `GEMINI_API_KEY` is not provided (e.g., initial test environment, key rotation, or quota exhaustion):
- The assistant automatically switches to the **HRC Grounding Engine**.
- It analyzes user queries for academic keywords (Journal, Conferences, Training, History) and returns authoritative, pre-verified answers from HRC's catalog.
- The UI indicates the source as `"قاعدة المعرفة الأكاديمية لمركز بحوث حضرموت"` (HRC Knowledge Base) without throwing 500 errors or disrupting user experience.

---

## 5. Security & Privacy

- **Server-Side Execution**: The Gemini API key is accessed strictly within server API routes (`src/app/api/assistant/route.ts` and `src/lib/ai/gemini.ts`). It is **never exposed** to client bundles or browser dev tools.
- **Zod Input Sanitization**: All inbound messages are validated with strict character limits (max 2,000 characters) to prevent prompt injection and abusive token consumption.
