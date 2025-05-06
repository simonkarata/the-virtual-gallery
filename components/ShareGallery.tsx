'use client';

import React from 'react';
import { FaUpload } from 'react-icons/fa';

type Props = {
  shareUrl: string;
  title: string;
};

export default function ShareGallery({ shareUrl, title }: Props) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || 'Check out this gallery!',
          url: shareUrl,
        });
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Sharing failed:', err);
      alert('Unable to share at the moment.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm bg-purple-100 text-purple-900 px-3 py-1.5 rounded-full hover:bg-purple-200 active:scale-95 transition-transform"
    >
      <FaUpload className="text-xs" />
      Share
    </button>
  );
}
