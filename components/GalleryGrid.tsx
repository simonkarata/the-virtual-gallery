'use client';

import GalleryCard from './GalleryCard';
import modelMap from '@/utils/modelMap';

export default function GalleryGrid() {
  return (
    <div className="flex flex-wrap justify-start gap-6 mt-10 sm:mt-16">
      {Object.entries(modelMap).map(([slug, data]) => (
        <div
          key={slug}
          className="w-[300px] flex-shrink-0 rounded-2xl border border-gray-200 shadow-sm bg-white"
        >
          <GalleryCard id={slug} data={data} />
        </div>
      ))}
    </div>
  );
}
