import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Image Upload System1',
  description: 'Next.js ile basit resim yükleme sistemi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

