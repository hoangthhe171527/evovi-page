# --- Install all deps (incl. vite) and produce Node SSR bundle ---
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
# Docker build does not get Railway env vars unless passed as ARG; force Node target explicitly.
ENV TANSTACK_START_NODE_DEPLOY=1
RUN bun run build

# Slim runtime install (no vite); keeps srvx + whatever the SSR bundle needs from package.json
RUN rm -rf node_modules && bun install --frozen-lockfile --production

# --- Run with Node 22 (matches engines / TanStack Start) ---
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "scripts/start-preview.mjs"]
