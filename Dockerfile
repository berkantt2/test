FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# su-exec için gerekli (Alpine'de su yerine)
RUN apk add --no-cache su-exec

# Persistent storage klasörü - volume mount edildiğinde izinler korunacak
# Ama yine de varsayılan olarak oluştur ve izinleri ayarla
RUN mkdir -p /app/uploads && chown -R nextjs:nodejs /app/uploads && chmod -R 755 /app/uploads

# Standalone build kullanıyorsak, public klasörü zaten .next/standalone içinde
# Sadece varsa kopyala
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Entrypoint script'i kopyala ve çalıştırılabilir yap
# Root olarak çalışacak, izinleri düzeltecek, sonra nextjs'e geçecek
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# USER nextjs - Entrypoint root olarak çalışacak, sonra su-exec ile geçecek

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV UPLOADS_DIR=/app/uploads

ENTRYPOINT ["/app/docker-entrypoint.sh"]

