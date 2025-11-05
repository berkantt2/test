import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathArray } = await params;
    // Path array'ini birleştir - Next.js dynamic route [...path] için
    // Örnek: /api/files/1234567890-image.jpg -> pathArray = ['1234567890-image.jpg']
    // Örnek: /api/files/folder/image.jpg -> pathArray = ['folder', 'image.jpg']
    const fileName = pathArray.join('/');
    
    // Güvenlik kontrolü - path traversal saldırılarını önle
    if (fileName.includes('..') || fileName.includes('\\') || fileName.startsWith('/')) {
      return NextResponse.json(
        { error: 'Geçersiz dosya yolu' },
        { status: 400 }
      );
    }
    
    // Dosya adı boş olamaz
    if (!fileName || fileName.trim() === '') {
      return NextResponse.json(
        { error: 'Dosya adı belirtilmedi' },
        { status: 400 }
      );
    }

    // Standalone build'de process.cwd() farklı olabilir, mutlak path kullan
    const uploadsDir = process.env.UPLOADS_DIR || '/app/uploads';
    const filePath = join(uploadsDir, fileName);

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 404 }
      );
    }

    const file = await readFile(filePath);
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    
    // Content-Type belirleme
    const contentType = 
      fileExtension === 'jpg' || fileExtension === 'jpeg' ? 'image/jpeg' :
      fileExtension === 'png' ? 'image/png' :
      fileExtension === 'gif' ? 'image/gif' :
      fileExtension === 'webp' ? 'image/webp' :
      'application/octet-stream';

    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Dosya okuma hatası:', error);
    return NextResponse.json(
      { error: 'Dosya okunamadı' },
      { status: 500 }
    );
  }
}

