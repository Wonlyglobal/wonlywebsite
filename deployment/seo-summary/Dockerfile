FROM node:22-alpine

WORKDIR /app
RUN addgroup -g 8796 wonly-seo && adduser -D -H -u 8796 -G wonly-seo wonly-seo

COPY scripts/lib/seo-summary.mjs scripts/lib/seo-summary.mjs
COPY scripts/run-seo-summary-api.mjs scripts/run-seo-summary-api.mjs
COPY scripts/generate-live-seo-summary.mjs scripts/generate-live-seo-summary.mjs
COPY scripts/seo-summary-experiments.json scripts/seo-summary-experiments.json
COPY scripts/verify-seo-summary-production.mjs scripts/verify-seo-summary-production.mjs

USER 8796:8796
CMD ["node", "scripts/run-seo-summary-api.mjs"]
