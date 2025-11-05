import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const fileName = path.join('/');
    
    // Güvenlik kontrolü - sadece dosya adına izin ver
    if (fileName.includes('..') || fileName.includes('/')) {
      return NextResponse.json(
        { error: 'Geçersiz dosya yolu' },
        { status: 400 }
      );
    }

    const uploadsDir = process.env.UPLOADS_DIR || join(process.cwd(), 'uploads');
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

