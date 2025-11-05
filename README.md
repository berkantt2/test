# Next.js Image Upload Sistemi

Coolify ile deploy edilebilen basit bir resim yükleme sistemi.

## Özellikler

- 🖼️ Resim yükleme (JPEG, PNG, GIF, WebP)
- 📁 Dosya boyutu kontrolü (max 5MB)
- 🎨 Modern ve responsive UI
- 💾 Persistent storage desteği
- 🐳 Docker ile containerization
- ☁️ Coolify ile deploy edilebilir

## Kurulum

### Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## Coolify ile Deploy

### Persistent Storage Yapılandırması

Coolify'da deploy ederken:

1. **Volume Mount Ekle:**
   - Volume Path: `/app/uploads`
   - Host Path: `/data/your-app-name/uploads` (veya istediğiniz path)

2. **Environment Variable (Opsiyonel):**
   - `UPLOADS_DIR=/app/uploads` (varsayılan olarak zaten `/app/uploads` kullanılıyor)

### Docker Build

```bash
# Docker image oluştur
docker build -t nextjs-image-upload .

# Docker container çalıştır
docker run -p 3000:3000 -v $(pwd)/uploads:/app/uploads nextjs-image-upload
```

## API Endpoints

### POST /api/upload
Resim yüklemek için kullanılır.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (File)

**Response:**
```json
{
  "success": true,
  "fileName": "1234567890-image.jpg",
  "url": "/api/files/1234567890-image.jpg",
  "size": 123456,
  "type": "image/jpeg"
}
```

### GET /api/files/[...path]
Yüklenen resimleri görüntülemek için kullanılır.

### GET /api/images
Yüklenen tüm resimlerin listesini döndürür.

## Teknolojiler

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Docker

## Lisans

MIT

