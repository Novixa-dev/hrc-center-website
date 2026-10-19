# Production Deployment & Hosting Guide

> Step-by-step instructions for deploying and hosting the Hadramout Research Center website in production.

---

## 1. Overview & Architecture

The HRC website is built on **Next.js 16 (App Router)** with **React 19**, **next-intl**, and Tailwind CSS.
It is architected for maximum performance and reliability:
- **55 static pages** prerendered ahead of time (SSG).
- Edge-ready localized routing (`/ar` and `/en`).
- Server actions for secure form delivery and honeypot validation.
- Zero client hydration waterfalls (~100 KB total client JS).

---

## 1a. Current production: `hrc.novixa.dev` on the Novixa VPS

This is the live setup. Options A and B below are kept as alternatives.

**Pipeline** — [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml), on every
push to `main` (or *Run workflow* in the Actions tab):

1. `verify` — `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`. A failure stops the deploy.
2. `deploy` — runs `pnpm build` on the runner (Next.js `output: 'standalone'`,
   `NEXT_PUBLIC_*` baked in), smoke-tests the standalone server on key routes, packages
   it with the [`Dockerfile`](../../Dockerfile) (no install inside Docker — `pnpm install`
   hangs there), copies the image to the server over SSH, runs
   `docker compose up -d` in `/opt/hrc-center`, waits for the container health check,
   then installs [`deploy/nginx/hrc-center.mailcow.conf`](../../deploy/nginx/hrc-center.mailcow.conf)
   into mailcow's nginx **only if it changed** (`nginx -t` first; the previous file is
   restored if the test fails; reload is graceful).

**Shared server.** The VPS also runs mailcow and other Novixa sites. Public traffic for
every site enters through mailcow's nginx (80/443, Cloudflare in front, Cloudflare Origin
certificate for `*.novixa.dev`). The deploy only touches things named `hrc-center*`:

| What | Where |
|---|---|
| Compose project + runtime `.env` | `/opt/hrc-center/` (`.env` is rewritten from GitHub secrets on every deploy) |
| Container | `hrc-center-app` → `127.0.0.1:3088` (loopback only) |
| Docker network | `hrc-center-edge` (attached to `mailcowdockerized-nginx-mailcow-1`, also persisted in mailcow's `docker-compose.override.yml`) |
| nginx site block | `/opt/mailcow-dockerized/data/conf/nginx/hrc-center.conf` (+ `hrc-center/origin.{pem,key}`) |
| Images | `hrc-center-website:sha-<7>` — the 3 newest are kept |

**GitHub secrets:** `SSH_HOST`, `SSH_USER`, `SSH_PASSWORD` (or `SSH_KEY`, preferred). Optional:
`RESEND_API_KEY`, `GEMINI_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`,
`NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_ANALYTICS`; variable `GEMINI_MODEL`. Changing a
`NEXT_PUBLIC_*` value needs a new deploy (it is compiled into the bundle).

**Rollback** to an earlier image (on the server):

```bash
cd /opt/hrc-center
docker image ls hrc-center-website          # pick a previous sha-xxxxxxx tag
sed -i 's/^APP_TAG=.*/APP_TAG=sha-xxxxxxx/' .env && docker compose up -d
```

**Logs / status:** `docker logs -f hrc-center-app` · `docker inspect -f '{{.State.Health.Status}}' hrc-center-app`.

---

## 2. Option A: Vercel Deployment

Vercel provides native edge support, automatic SSL, CDN caching, and continuous deployment from Git.

### Step 1: Connect Repository
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Select the Git repository (`hrc-center-website`).
4. Framework preset will automatically detect **Next.js**.

### Step 2: Build & Output Settings
Vercel reads `vercel.json` automatically, but ensure settings reflect:
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install --frozen-lockfile`

### Step 3: Configure Environment Variables
In the project settings under **Environment Variables**, add the following:

| Variable | Description | Example / Production Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin without trailing slash | `https://hrc.ahgaff.edu` or `https://hrc-center.org` |
| `NEXT_PUBLIC_WHATSAPP` | International phone number without `+` | `9675360303` (leave empty if not ready) |
| `RESEND_API_KEY` | Resend API key for contact email delivery | `re_123456789...` |
| `CONTACT_TO_EMAIL` | Center inbox receiving contact submissions | `info@hrc-center.org` |
| `CONTACT_FROM_EMAIL` | Verified sender address in Resend | `contact@hrc-center.org` |

### Step 4: Deploy
Click **Deploy**. Deployment finishes in under 60 seconds.

### Step 5: Custom Domain & DNS Setup
1. In Vercel Project Settings, navigate to **Domains**.
2. Enter your production domain (e.g. `hrc.ahgaff.edu` or `hrc-hadramout.org`).
3. Add the DNS records provided by Vercel in your DNS manager:
   - For an **Apex domain** (`example.org`):
     - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - For a **Subdomain** (`hrc.ahgaff.edu`):
     - Type: `CNAME`, Name: `hrc`, Value: `cname.vercel-dns.com`
4. Vercel automatically generates and renews a free Let's Encrypt SSL certificate within 2 minutes of DNS propagation.

---

## 3. Option B: Self-Hosted Linux VPS / Node Server

If hosting internally on University infrastructure or a dedicated Linux VPS (Ubuntu 22.04 / Debian 12):

### Step 1: Server Prerequisites
Ensure Node.js 20+ and pnpm are installed:
```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
corepack enable
corepack prepare pnpm@latest --activate
```

### Step 2: Clone and Configure
```bash
git clone https://github.com/novixa/hrc-center-website.git /var/www/hrc-website
cd /var/www/hrc-website

# Create production environment file
cp .env.example .env.production
nano .env.production
# Fill NEXT_PUBLIC_SITE_URL, RESEND_API_KEY, etc.
```

### Step 3: Install & Build
```bash
pnpm install --frozen-lockfile
pnpm build
```

### Step 4: Run with Process Manager (PM2)
```bash
sudo npm install -g pm2
pm2 start "pnpm start" --name "hrc-website"
pm2 save
pm2 startup
```
The application will listen on port `3000`.

### Step 5: Nginx Reverse Proxy & SSL
Configure `/etc/nginx/sites-available/hrc-website`:
```nginx
server {
    server_name hrc.ahgaff.edu;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static build chunks
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```
Enable and provision SSL via Certbot:
```bash
sudo ln -s /etc/nginx/sites-available/hrc-website /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d hrc.ahgaff.edu
```

---

## 4. Post-Deployment Verification Checklist

Once deployed to production, run this rapid verification:

1. **Root Redirect:** Visiting `https://domain.com/` redirects cleanly to `https://domain.com/ar` (or `/en` based on browser headers).
2. **Canonical & Hreflang:** Inspect source on `/ar` and `/en`; verify `<link rel="canonical">` points to the production domain.
3. **Contact Form:** Submit a test message on `/ar/contact`. Verify successful status banner and receipt in target inbox.
4. **Sitemap & Feeds:**
   - Verify `https://domain.com/sitemap.xml` renders valid XML.
   - Verify `https://domain.com/robots.txt` points to `sitemap.xml`.
   - Verify `https://domain.com/ar/news/rss.xml` displays news feed.
5. **Security Headers:**
   Run `curl -I https://domain.com/ar` and check for:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy`
6. **Lighthouse Run:** Run Chrome DevTools Lighthouse audit on mobile. Target ≥ 95 on Performance, Accessibility, Best Practices, and SEO.
