'use client';

import { useEffect, useState } from 'react';
import GalleryInput from './GalleryInput';

interface GalleryHeaderProps {
  selectedTitle: string;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({ selectedTitle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm(selectedTitle);
  }, [selectedTitle]);

  return (
    <div className="flex items-center justify-center gap-[5px] mt-4 mb-6 px-4">
      {/* Arrow icons (SVG or your existing component) */}
      <span className="text-2xl">🡐🡒</span>

      {/* Main Heading */}
      <h1 className="text-xl font-bold tracking-tight text-gray-900">
        VIRTUAL EXHIBITION:
      </h1>

      {/* Gallery Input (5px to the right of heading) */}
      <GalleryInput value={searchTerm} onChange={setSearchTerm} />
    </div>
  );
};

export default GalleryHeader;
