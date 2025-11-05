# Coolify Storage Ayarlama Rehberi

## 📦 Persistent Storage Ekleme

Resim yükleme sisteminde yüklenen dosyaların kalıcı olması için storage eklemeniz gerekiyor.

## Adım Adım Talimatlar

### 1. Storage Sayfasına Gidin
- Coolify dashboard'da uygulamanızı açın
- Üst menüden **"Storage"** sekmesine tıklayın

### 2. Yeni Storage Ekle
- **"+ Add"** butonuna tıklayın

### 3. Storage Ayarlarını Doldurun

Açılan formda şu değerleri girin:

```
Volume Path: /app/uploads
```

**Host Path** için:
- **Seçenek 1 (Önerilen):** Boş bırakın - Coolify otomatik oluşturur
- **Seçenek 2:** Manuel olarak `/data/nextjs-image-upload/uploads` yazın

### 4. Kaydet
- **"Save"** veya **"Add Storage"** butonuna tıklayın

## ✅ Doğru Ayarlar

- ✅ **Volume Path**: `/app/uploads` (mutlaka bu olmalı!)
- ✅ **Host Path**: Boş bırakılabilir veya `/data/{app-name}/uploads`

## ❌ Yanlış Ayarlar

- ❌ Volume Path: `/uploads` (eksik!)
- ❌ Volume Path: `./uploads` (yanlış format!)
- ❌ Volume Path: `/app/uploads/images` (fazla!)

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

