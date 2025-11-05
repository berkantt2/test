'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import ImageGallery from '@/components/ImageGallery';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🖼️ Image Upload Sistemi
          </h1>
          <p className="text-gray-600">
            Resimlerinizi yükleyin ve galeride görüntüleyin
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Yüklenen Resimler
          </h2>
          <ImageGallery key={refreshKey} />
        </div>
      </div>
    </main>
  );
}

