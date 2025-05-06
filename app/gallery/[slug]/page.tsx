'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import GalleryView from '@/components/GalleryView';
import { useGalleryContext } from '@/context/GalleryContext';
import modelMap from '@/utils/modelMap';

export default function GallerySlugPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { setSelectedGallery } = useGalleryContext();

  useEffect(() => {
    if (slug && modelMap[slug]) {
      setSelectedGallery(modelMap[slug]);
    }
  }, [slug, setSelectedGallery]);

  return (
    <main className="h-screen w-full">
      <GalleryView />
    </main>
  );
}
