# ── Stage 1: pruner ────────────────────────────────────────────────────────────
FROM node:22-alpine AS pruner
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune --scope=shell --docker

# ── Stage 2: deps ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app
# Copy pruned package manifests only — this layer caches until a package.json changes
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# ── Stage 3: builder ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app
COPY --from=deps /app/ .
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo run build --filter=shell

# ── Stage 4: runner ────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
WORKDIR /app

# standalone output is self-contained — no pnpm needed at runtime
COPY --from=builder /app/apps/shell/.next/standalone ./
COPY --from=builder /app/apps/shell/.next/static     ./apps/shell/.next/static
COPY --from=builder /app/apps/shell/public/          ./apps/shell/public/

WORKDIR /app/apps/shell
EXPOSE 3000
CMD ["node", "server.js"]
