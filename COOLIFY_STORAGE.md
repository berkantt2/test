# Coolify Storage Ayarlama Rehberi

## 📦 Persistent Storage Ekleme

Resim yükleme sisteminde yüklenen dosyaların kalıcı olması için storage eklemeniz gerekiyor.

## ⚠️ ÖNEMLİ: Alan İsimleri

Coolify'da storage formunda **iki alan** var:
- **Destination Path** (Container içi yol)
- **Source Path** (Sunucu üzerindeki yol)

## Adım Adım Talimatlar

### 1. Storage Sayfasına Gidin
- Coolify dashboard'da uygulamanızı açın
- Üst menüden **"Storage"** sekmesine tıklayın

### 2. Yeni Storage Ekle
- **"+ Add"** butonuna tıklayın

### 3. Storage Ayarlarını Doldurun

**ÇOK ÖNEMLİ:** Alanları doğru doldurun!

```
Destination Path: /app/uploads
Source Path: (BOŞ BIRAK veya /data/{app-name}/uploads)
```

**Örnek:**
```
Destination Path: /app/uploads
Source Path: /data/nextjs-image-upload/uploads
```

**VEYA** Source Path'i boş bırakın (Coolify otomatik oluşturur)

### 4. Kaydet
- **"Save"** veya **"Add Storage"** butonuna tıklayın

## ✅ Doğru Ayarlar

- ✅ **Destination Path**: `/app/uploads` (mutlaka bu olmalı!)
- ✅ **Source Path**: Boş bırakılabilir veya `/data/{app-name}/uploads`

## ❌ Yanlış Ayarlar

- ❌ **Destination Path**: `/root/test` (YANLIŞ! Container içi path olmalı)
- ❌ **Destination Path**: `/uploads` (eksik - `/app/uploads` olmalı)
- ❌ **Destination Path**: `./uploads` (yanlış format - mutlak path olmalı)
- ❌ **Source Path**: `/app/uploads` (YANLIŞ! Bu container içi path, host path olmalı)

## 🔍 Nasıl Kontrol Edilir?

Storage eklendikten sonra:
1. Bir resim yükleyin
2. Container'ı yeniden başlatın
3. Resmin hala göründüğünü kontrol edin

Eğer resim kaybolursa, storage düzgün bağlanmamış demektir.

## 📝 Notlar

- Storage eklenmeden yüklenen resimler container yeniden başlatıldığında kaybolur
- Volume Path, uygulama kodundaki `UPLOADS_DIR` environment variable'ı ile eşleşmeli
- Varsayılan olarak uygulama `/app/uploads` path'ini kullanır

