import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { GalleryProvider } from '@/context/GalleryContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Virtual Gallery',
  description: 'Explore 3D galleries and immersive experiences',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GalleryProvider>
          {children}
        </GalleryProvider>
      </body>
    </html>
  );
}
