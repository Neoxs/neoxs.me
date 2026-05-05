# ── Stage 1: pruner ────────────────────────────────────────────────────────────
FROM node:22-alpine AS pruner
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune --scope=mfe-infra --docker

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
RUN pnpm turbo run build --filter=mfe-infra

# ── Stage 4: runner ────────────────────────────────────────────────────────────
# Vite SPA — no Node.js needed, nginx serves static files directly
FROM nginx:1.27-alpine AS runner
RUN apk add --no-cache curl
RUN rm /etc/nginx/conf.d/default.conf

# Copy dist into /infra/ to match vite `base: '/infra/'`
COPY --from=builder /app/apps/mfe-infra/dist /usr/share/nginx/html/infra
COPY apps/mfe-infra/nginx.conf /etc/nginx/conf.d/mfe-infra.conf

# Ensure static files are owned by the nginx worker user
RUN chown -R nginx:nginx /usr/share/nginx/html/infra

EXPOSE 3004
CMD ["nginx", "-g", "daemon off;"]
