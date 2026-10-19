# Runtime image for hrc.novixa.dev.
# The app is built and smoke-tested on the CI runner (.github/workflows/deploy.yml):
# `pnpm build` → .next/standalone, then static assets, public/ and src/content/ are
# copied into it. This image only packages that folder — no install step inside Docker.

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --chown=node:node .next/standalone ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
