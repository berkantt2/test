import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { statSync } from 'fs';

export async function GET() {
  try {
    const uploadsDir = process.env.UPLOADS_DIR || join(process.cwd(), 'uploads');
    
    let files: string[] = [];
    try {
      files = await readdir(uploadsDir);
    } catch (error) {
      // Klasör yoksa boş dizi döndür
      return NextResponse.json({ images: [] });
    }

    // Sadece resim dosyalarını filtrele
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageFiles = files.filter(file => {
      const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
      return imageExtensions.includes(ext);
    });

    // Dosya bilgilerini topla
    const images = imageFiles.map(fileName => {
      const filePath = join(uploadsDir, fileName);
      const stats = statSync(filePath);
      
      return {
        fileName,
        url: `/api/files/${fileName}`,
        size: stats.size,
        type: 'image/' + fileName.split('.').pop()?.toLowerCase(),
      };
    });

    // En yeni dosyalar önce gelsin
    images.sort((a, b) => {
      const aTime = parseInt(a.fileName.split('-')[0]) || 0;
      const bTime = parseInt(b.fileName.split('-')[0]) || 0;
      return bTime - aTime;
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Resim listesi hatası:', error);
    return NextResponse.json(
      { error: 'Resimler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

