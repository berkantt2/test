'use client';

import { useEffect, useState } from 'react';

interface ImageInfo {
  fileName: string;
  url: string;
  size: number;
  type: string;
}

export default function ImageGallery() {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      // Uploads klasöründeki dosyaları listelemek için basit bir API
      // Not: Production'da daha güvenli bir yöntem kullanılmalı
      const response = await fetch('/api/images');
      if (response.ok) {
        const data = await response.json();
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Resimler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Henüz resim yüklenmedi</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
        >
          <img
            src={image.url}
            alt={image.fileName}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-center p-2">
              <p className="text-sm truncate">{image.fileName}</p>
              <p className="text-xs">{(image.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

