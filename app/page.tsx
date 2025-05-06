'use client';

import MainContent from '@/components/MainContent';
import SideContent from '@/components/SideContent';

export default function HomePage() {
  return (
    <div className="flex flex-row md:flex-col w-full h-screen">
      <div className="flex-1 overflow-auto">
        <MainContent /> {/* whatever displays the GalleryGrid */}
      </div>
      <div className="md:w-[30%] w-[30%]  ">
        <SideContent />
      </div>
      
    </div>

  );
}
