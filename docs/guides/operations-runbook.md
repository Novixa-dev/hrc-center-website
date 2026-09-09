# Production Operations & Maintenance Runbook

> **Platform:** Hadramout Research Center Web Platform  
> **Maintainer:** HRC IT Operations & Novixa Digital Solutions  
> **Classification:** Operational Documentation (Tier 1 & Tier 2)

---

## 1. System Overview & Key Paths

The HRC web platform is a modern, static-first web application:
- **Application Directory:** `/var/www/hrc-website` (or Vercel root)
- **Node.js Process:** PM2 service name `hrc-website` listening on `localhost:3000`
- **Reverse Proxy:** Nginx (`/etc/nginx/sites-available/hrc-website`)
- **SSL Certificates:** Let's Encrypt / Certbot (`/etc/letsencrypt/live/hrc.ahgaff.edu/`)
- **Environment Configuration:** `/var/www/hrc-website/.env.production` (or Vercel Dashboard)
- **Logs:**
  - PM2 logs: `pm2 logs hrc-website`
  - Nginx error log: `/var/log/nginx/error.log`
  - Nginx access log: `/var/log/nginx/access.log`

---

## 2. Common Operational Procedures

### Procedure A: Deploying Content or Code Updates
When researchers or editors add new news, courses, or publications:

```bash
# 1. SSH into the production server
ssh admin@hrc.ahgaff.edu

# 2. Navigate to project root
cd /var/www/hrc-website

# 3. Pull latest changes from master
git pull origin master

# 4. Install any new dependencies
pnpm install --frozen-lockfile

# 5. Build static pages
pnpm build

# 6. Gracefully reload the Node.js process (zero downtime)
pm2 reload hrc-website
```

---

## 3. Incident Management & Troubleshooting

### Scenario 1: Contact Form Submissions Not Arriving

#### Symptoms
Users submit the contact form, see a success banner, but the center inbox does not receive emails.

#### Diagnosis & Resolution
1. **Check Environment Variables:**
   - Ensure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are configured in the environment.
2. **Verify Resend Domain Verification:**
   - Log into [Resend Dashboard](https://resend.com/domains).
   - Verify that your sending domain (e.g. `hrc-center.org`) has active `DKIM` and `SPF` DNS records.
3. **Inspect Server Logs:**
   - In dev/fallback mode without an API key, submissions are printed to console:
     ```bash
     pm2 logs hrc-website --lines 50 | grep "Contact message"
     ```
   - If Resend returns an error (e.g., domain unverified or rate limited), the error message will be recorded in the PM2 error logs.

---

### Scenario 2: 404 Error on Newly Added Article or Course

#### Symptoms
An editor added a new Markdown file, but visiting its URL returns HTTP 404.

#### Diagnosis & Resolution
1. **Check Bilingual Parity:**
   - Next.js static generation requires an identical slug in both languages.
   - If `src/content/news/ar/my-new-post.md` exists, ensure `src/content/news/en/my-new-post.md` **also exists with the exact same filename**.
2. **Check Frontmatter Syntax:**
   - Ensure required fields (`title`, `summary`, `date`) are formatted correctly in YAML.
   - Run `pnpm test:unit` to validate frontmatter schemas across all collections.
3. **Rebuild:**
   - Static routes are generated at build time. Run `pnpm build` to compile the new route.

---

### Scenario 3: Site Returns 502 Bad Gateway (Self-Hosted VPS)

#### Symptoms
Nginx returns `502 Bad Gateway` when accessing the site.

#### Diagnosis & Resolution
1. **Check if Node.js process is alive:**
   ```bash
   pm2 status
   ```
2. **If PM2 shows `errored` or `stopped`:**
   ```bash
   pm2 restart hrc-website
   pm2 logs hrc-website --err --lines 50
   ```
3. **Check memory or port contention:**
   ```bash
   sudo netstat -tlpn | grep 3000
   free -h
   ```

---

### Scenario 4: SSL Certificate Expiration Warning

#### Symptoms
Browsers display a security warning regarding an untrusted or expiring SSL certificate.

#### Diagnosis & Resolution
1. **On Vercel:** SSL renewal is 100% automated. If an issue occurs, verify domain DNS records point to `76.76.21.21` or `cname.vercel-dns.com`.
2. **On Self-Hosted Linux VPS:**
   ```bash
   # Test Let's Encrypt dry run
   sudo certbot renew --dry-run

   # Force certificate renewal if needed
   sudo certbot renew --force-renewal
   sudo systemctl reload nginx
   ```

---

## 4. Routine Maintenance & Security

### Monthly Maintenance Checklist
- [ ] Run `pnpm audit` to check for upstream security vulnerabilities in dependencies.
- [ ] Review spam logs and honeypot traps to verify abusive submissions are blocked.
- [ ] Rotate API keys (e.g., `RESEND_API_KEY`) every 6–12 months or when staff changes occur.
- [ ] Verify that backup copies of the Git repository exist off-site (e.g. GitHub and secondary backup).

---

## 5. Escalation & Technical Support

For architectural issues or major upgrades:
- **Technical Studio:** Novixa Digital Solutions (`team@novixa.dev`)
- **Institution:** Hadramout Research Center, Al-Ahgaff University, Mukalla, Hadramout
