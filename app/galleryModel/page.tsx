'use client';

import { useGalleryContext } from '@/context/GalleryContext';
import GalleryView from '@/components/GalleryView';

export default function GalleryModelPage() {
  const { selectedGallery } = useGalleryContext();

  return (
    <main className="h-screen w-full">
      {selectedGallery ? (
        <GalleryView />
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No gallery selected. Please return to the main page and choose a model.
        </p>
      )}
    </main>
  );
}
