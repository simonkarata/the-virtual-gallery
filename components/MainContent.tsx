'use client';

import { useState } from 'react';
import GalleryHeader from '@/components/GalleryHeader';
import GalleryGrid from './GalleryGrid';

export default function MainContent() {
  const [selectedGalleryTitle, setSelectedGalleryTitle] = useState('');

  return (
    <section className="w-[70%] p-8 bg-gray-50 border-r border-gray-300 overflow-y-auto h-screen">
      <GalleryHeader selectedTitle={selectedGalleryTitle} />
      <GalleryGrid />
    </section>
  );
}
