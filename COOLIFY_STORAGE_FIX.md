# 🔧 Coolify Storage - DOĞRU AYARLAR

## ⚠️ ÖNEMLİ: Coolify'da Storage Alanları

Coolify'da storage eklerken **iki alan** var ve bunların **doğru doldurulması kritik**:

### 📋 Coolify Storage Formu

Coolify'da storage eklerken şu alanlar görünür:

1. **Destination Path** (Hedef Yol - Container içi)
2. **Source Path** (Kaynak Yol - Sunucu üzerinde)

### ✅ DOĞRU AYARLAR

```
Destination Path: /app/uploads
Source Path: (BOŞ BIRAK veya Coolify'ın otomatik oluşturmasına izin ver)
```

**VEYA manuel olarak:**

```
Destination Path: /app/uploads
Source Path: /data/{app-name}/uploads
```

**Örnek:**
```
Destination Path: /app/uploads
Source Path: /data/nextjs-image-upload/uploads
```

### ❌ YANLIŞ AYARLAR

```
❌ Destination Path: /root/test (YANLIŞ!)
❌ Destination Path: uploads (YANLIŞ - mutlak path olmalı)
❌ Source Path: /app/uploads (YANLIŞ - bu container içi path!)
```

## 🎯 Adım Adım

1. **Coolify'da Storage sekmesine git**
2. **"+ Add" butonuna tıkla**
3. **Formu doldur:**
   - **Destination Path**: `/app/uploads` (mutlaka bu!)
   - **Source Path**: **BOŞ BIRAK** veya `/data/{uygulama-adi}/uploads`
4. **Kaydet**

## 🔍 Nasıl Kontrol Edilir?

### Test 1: Resim Yükleme
1. Bir resim yükle
2. Console'da hata var mı kontrol et
3. Resim görünüyor mu kontrol et

### Test 2: Persistent Storage Test
1. Bir resim yükle
2. Container'ı **redeploy** et (restart değil, redeploy!)
3. Resim hala görünüyor mu kontrol et
4. ✅ Görünüyorsa = Storage doğru çalışıyor
5. ❌ Kaybolduysa = Storage yanlış ayarlanmış

## 🐛 Yaygın Hatalar

### Hata 1: Path'ler Ters
```
Destination Path: /root/test  ❌
Source Path: /app/uploads     ❌
```
**Çözüm:** Tam tersini yap!

### Hata 2: Relative Path
```
Destination Path: uploads  ❌
```
**Çözüm:** Mutlak path kullan: `/app/uploads`

### Hata 3: Source Path Container Path'i
```
Source Path: /app/uploads  ❌ (Bu container içi path!)
```
**Çözüm:** Source Path host sunucusundaki path olmalı (örn: `/data/...`)

## 📝 Notlar

- **Destination Path** = Container içinde uygulamanın dosyaları arayacağı yer
- **Source Path** = Sunucu üzerinde dosyaların fiziksel olarak saklanacağı yer
- Volume mount edildiğinde, Source Path'teki klasör Destination Path'e bağlanır
- Source Path boş bırakılırsa, Coolify otomatik oluşturur (genellikle `/data/{app-name}/...`)

## 🔧 Sorun Giderme

### Resimler yüklenmiyor
1. Storage eklendi mi kontrol et
2. Destination Path `/app/uploads` mi kontrol et
3. Container log'larını kontrol et
4. İzin sorunları var mı kontrol et

### Resimler kayboluyor
1. Storage doğru ayarlanmış mı kontrol et
2. Redeploy sonrası kayboluyorsa storage bağlantısı yok demektir
3. Source Path doğru mu kontrol et

