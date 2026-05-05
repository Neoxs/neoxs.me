# ── Stage 1: pruner ────────────────────────────────────────────────────────────
FROM node:22-alpine AS pruner
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune --scope=mfe-lab --docker

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
RUN pnpm turbo run build --filter=mfe-lab

# ── Stage 4: runner ────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner
RUN apk add --no-cache curl
RUN rm /etc/nginx/conf.d/default.conf

# Copy dist into /lab/ to match vite `base: '/lab/'`
COPY --from=builder /app/apps/mfe-lab/dist /usr/share/nginx/html/lab
COPY apps/mfe-lab/nginx.conf /etc/nginx/conf.d/mfe-lab.conf

# Ensure static files are owned by the nginx worker user
RUN chown -R nginx:nginx /usr/share/nginx/html/lab

EXPOSE 3003
CMD ["nginx", "-g", "daemon off;"]
