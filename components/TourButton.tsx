'use client';

import { useGalleryContext } from '@/context/GalleryContext';
import { useRouter } from 'next/navigation';

export default function TourButton() {
  const { selectedGallery } = useGalleryContext();
  const router = useRouter();

  if (!selectedGallery) return null;

  const handleTour = () => {
    const slug = selectedGallery.title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/gallery/${slug}`);
  };

  return (
    <button
      onClick={handleTour}
      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-full shadow-md"
    >
      Start Tour
    </button>
  );
}
