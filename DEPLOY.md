# Coolify Deploy Talimatları

## GitHub Repo Oluşturma

1. GitHub'da yeni bir repository oluşturun:
   - Repository adı: `nextjs-image-upload` (veya istediğiniz isim)
   - Public veya Private seçin
   - README, .gitignore veya license eklemeyin (zaten mevcut)

2. GitHub'da oluşturduğunuz repo URL'sini kopyalayın (örnek: `https://github.com/kullaniciadi/nextjs-image-upload.git`)

3. Terminal'de şu komutları çalıştırın:

```bash
cd /Users/berkan/Desktop/test
git remote add origin https://github.com/KULLANICIADI/REPO-ADI.git
git push -u origin main
```

## Coolify ile Deploy

### 1. Coolify'da Yeni Uygulama Oluştur

1. Coolify dashboard'a giriş yapın
2. "New Resource" > "Application" seçin
3. GitHub repository'nizi seçin veya URL'yi girin
4. Branch: `main`
5. Build Pack: `Dockerfile` seçin

### 2. Persistent Storage Yapılandırması

**ÖNEMLİ:** Yüklenen resimlerin kalıcı olması için storage eklemelisiniz!

1. Coolify'da uygulamanızın sayfasına gidin
2. Üst menüden **"Storage"** sekmesine tıklayın
3. **"+ Add"** butonuna tıklayın
4. Storage ayarlarını doldurun:
   - **Volume Path** (Container içi path): `/app/uploads`
   - **Host Path** (Sunucu üzerindeki path): Bu alanı **BOŞ BIRAKIN** veya Coolify'ın otomatik oluşturmasına izin verin
     - Coolify genellikle otomatik olarak `/data/{app-name}/uploads` gibi bir path oluşturur
     - Eğer manuel belirtmek isterseniz: `/data/nextjs-image-upload/uploads`

**Not:** Volume Path mutlaka `/app/uploads` olmalı çünkü uygulama bu path'i kullanıyor.

### 3. Environment Variables (Opsiyonel)

Gerekirse environment variable ekleyin:
- `UPLOADS_DIR=/app/uploads` (varsayılan olarak zaten bu path kullanılıyor)

### 4. Deploy

1. "Deploy" butonuna tıklayın
2. Build işlemi tamamlanana kadar bekleyin
3. Uygulamanız hazır! 🎉

## Notlar

- Uploads klasörü `/app/uploads` içinde kalıcı olarak saklanacak
- Volume mount sayesinde container yeniden başlatılsa bile dosyalar korunur
- Maximum dosya boyutu: 5MB
- Desteklenen formatlar: JPEG, PNG, GIF, WebP

