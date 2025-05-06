'use client';

import React from 'react';
import { FaDownload } from 'react-icons/fa';

type Props = {
  fileUrl: string;
  fileName?: string;
};

export default function DownloadButton({ fileUrl, fileName = 'download' }: Props) {
  const handleDownload = () => {
    if (!fileUrl) {
      console.warn('No file URL provided for download.');
      alert('File URL is missing. Please try again.');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file. Please try again later.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      aria-label={`Download ${fileName}`}
      className="flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900 px-3 py-1.5 rounded-full border border-purple-200 shadow-sm hover:shadow transition"
    >
      <FaDownload className="text-base" />
      Download
    </button>
  );
}
