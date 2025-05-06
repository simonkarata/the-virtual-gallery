'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useGalleryContext } from '@/context/GalleryContext';
import { GalleryData } from '@/utils/modelMap';
import { FaDownload } from 'react-icons/fa';
import DownloadButton from './DownloadButton';
import ShareGallery from './ShareGallery';

type Props = {
  id: string;
  data: GalleryData;
};

export default function GalleryCard({ id, data }: Props) {
  const { selectedGallery, setSelectedGallery } = useGalleryContext();
  const router = useRouter();
  const isSelected = selectedGallery?.title === data.title;

  const handleSelect = () => {
    try {
      setSelectedGallery(data);
    } catch (error) {
      console.error('Failed to set selected gallery:', error);
    }
  };

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/galleryModel`;

  return (
    <div
      onClick={handleSelect}
      className={`bg-white rounded-lg shadow-md p-4 flex flex-col justify-between min-h-[320px] ${
        isSelected ? 'ring-2 ring-purple-600' : ''
      }`}
      aria-label={`Gallery card for ${data.title}`}
    >
      {/* Thumbnail */}
      <div className="relative h-[100] w-full  flex items-center justify-center">
        <Image
          src={data.image}
          alt={`Preview of ${data.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={(e) => {
            e.currentTarget.src = '/fallback.png'; // optional fallback image
          }}
        />
      </div>

      {/* Text content */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{data.title}</h2>
        <p className="text-sm text-gray-500 mt-1">Category: {id}</p>
        <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-3">
          {data.description || 'No description provided.'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-2">
        <DownloadButton
          fileUrl={data.pdf}
          fileName={`${data.title}.pdf`}
        />
        <ShareGallery shareUrl={shareUrl} title={data.title} />
      </div>
    </div>
  );
}
