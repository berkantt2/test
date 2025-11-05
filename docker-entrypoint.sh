#!/bin/sh
set -e

# Uploads klasörünün izinlerini kontrol et ve düzelt
# Bu script root olarak çalışacak, sonra nextjs kullanıcısına geçecek
if [ -d "/app/uploads" ]; then
  # Klasör varsa izinleri düzelt (volume mount sonrası root sahibi olabilir)
  chown -R nextjs:nodejs /app/uploads 2>/dev/null || true
  chmod -R 755 /app/uploads 2>/dev/null || true
fi

# Next.js sunucusunu nextjs kullanıcısı olarak başlat
exec su-exec nextjs node server.js

