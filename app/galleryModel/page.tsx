'use client';

import { useGalleryContext } from '@/context/GalleryContext';
import GalleryView from '@/components/GalleryView';

export default function GalleryModelPage() {
  const { selectedGallery } = useGalleryContext();

  return (
    <main className="h-screen w-full">
      <GalleryView />
    </main>
  );
}
