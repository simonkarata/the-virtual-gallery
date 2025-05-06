'use client';

import { useGalleryContext } from '@/context/GalleryContext';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function ArrowStates() {
  const { navigatePrevious, navigateNext, previousGalleries, nextGalleries } = useGalleryContext();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={navigatePrevious}
        disabled={previousGalleries.length === 0}
        className="text-2xl text-gray-700 hover:text-gray-900 disabled:opacity-50"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={navigateNext}
        disabled={nextGalleries.length === 0}
        className="text-2xl text-gray-700 hover:text-gray-900 disabled:opacity-50"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
