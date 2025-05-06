'use client';

import { useGalleryContext } from '@/context/GalleryContext';
import ModelPreview from './ModelPreview';
import TourButton from '@/components/TourButton';

export default function SideContent() {
  const { selectedGallery } = useGalleryContext();

  if (!selectedGallery) {
    return (
      <div className="flex items-center justify-center h-full border rounded-xl shadow-sm p-4 bg-gray-50 text-gray-400">
        Select a gallery to preview the model
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-white border rounded-xl shadow-md overflow-hidden">
      {/* ModelPreview: 80% of height */}
      <div className="h-[80%] w-full">
        <ModelPreview url={selectedGallery.modelPath} />
      </div>

      {/* Button area: 20% of height, vertically centered */}
      <div className="h-[20%] w-full flex items-center justify-center px-4">
        <TourButton />
      </div>
    </div>
  );
}
