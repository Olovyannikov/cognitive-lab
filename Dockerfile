FROM node:20-alpine

# 1.Подготавливаем pnpm
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# 2.Ставим зависимости
COPY ./package.json ./pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
# dev+prod, vite внутри

# 3.Копируем исходники # всё, включая express-entry.ts
COPY . .

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

# 4.Обычный npm‑скрипт: сначала билд, потом SSR‑сервер
CMD ["pnpm","run","start"]