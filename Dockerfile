# Production image for hrc.novixa.dev — Next.js standalone server on Node 22.
# Built by .github/workflows/deploy.yml; NEXT_PUBLIC_* values are baked in at build time.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
ENV HUSKY=0 NEXT_TELEMETRY_DISABLED=1
RUN npm install -g pnpm@11.0.8
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile --config.fetch-timeout=600000 --config.fetch-retries=5

FROM deps AS build
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://hrc.novixa.dev
ARG NEXT_PUBLIC_WHATSAPP=
ARG NEXT_PUBLIC_ANALYTICS=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP \
    NEXT_PUBLIC_ANALYTICS=$NEXT_PUBLIC_ANALYTICS
RUN pnpm build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# Markdown collections are read from disk at request time (src/lib/content/collection.ts).
COPY --from=build --chown=node:node /app/src/content ./src/content
USER node
EXPOSE 3000
CMD ["node", "server.js"]
