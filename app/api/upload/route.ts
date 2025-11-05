import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { chmod } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Dosya boyutu 5MB\'dan küçük olmalıdır' },
        { status: 400 }
      );
    }

    // Sadece resim dosyalarına izin ver
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Sadece resim dosyaları yüklenebilir (JPEG, PNG, GIF, WebP)' },
        { status: 400 }
      );
    }

    // Uploads klasörünü oluştur (persistent storage için)
    // Standalone build'de process.cwd() farklı olabilir, bu yüzden mutlak path kullan
    const uploadsDir = process.env.UPLOADS_DIR || '/app/uploads';
    
    // Klasör yoksa oluştur ve izinleri kontrol et
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true, mode: 0o755 });
    } else {
      // Klasör varsa bile izinleri güncelle (volume mount sonrası izinler sıfırlanmış olabilir)
      try {
        await chmod(uploadsDir, 0o755);
      } catch (e) {
        // İzin hatası varsa görmezden gel, klasör mount edilmiş olabilir
        console.warn('Uploads klasörü izinleri güncellenemedi:', e);
      }
    }

    // Dosya adını oluştur (timestamp + original name)
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = join(uploadsDir, fileName);

    // Dosyayı kaydet
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Public URL oluştur
    const publicUrl = `/api/files/${fileName}`;

    return NextResponse.json({
      success: true,
      fileName,
      url: publicUrl,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload hatası:', error);
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    return NextResponse.json(
      { 
        error: 'Dosya yükleme sırasında bir hata oluştu',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

