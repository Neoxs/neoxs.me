# ── Stage 1: pruner ────────────────────────────────────────────────────────────
FROM node:22-alpine AS pruner
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune --scope=mfe-blog --docker

# ── Stage 2: deps ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# ── Stage 3: builder ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app
COPY --from=deps /app/ .
COPY --from=pruner /app/out/full/ .
# turbo.json wires `prepare` (nuxt prepare) as a build dependency — runs automatically
RUN pnpm turbo run build --filter=mfe-blog

# ── Stage 4: runner ────────────────────────────────────────────────────────────
# Nuxt's .output/ is fully self-contained — includes server/node_modules/
FROM node:22-alpine AS runner
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3002 NITRO_HOST=0.0.0.0 NITRO_PORT=3002
WORKDIR /app

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder /app/apps/mfe-blog/.output ./

RUN chown -R app:app /app
USER app

EXPOSE 3002
CMD ["node", "server/index.mjs"]
