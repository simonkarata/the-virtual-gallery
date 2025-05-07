"use client";

import { useGalleryContext } from "@/context/GalleryContext";
import { useEffect, useState } from "react";
import TourButton from "./TourButton";

export default function LoadingLogic() {
  const { selectedGallery } = useGalleryContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedGallery) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedGallery]);

  if (!selectedGallery) {
    return <p className="text-gray-400 text-sm">Select a gallery to preview.</p>;
  }

  const displayText = loading
    ? `Loading model: ${selectedGallery}`
    : `Ready to load model: ${selectedGallery}`;

  return (
    <>
      <p className="text-xs text-gray-400">{displayText}</p>
      {!loading && <TourButton />}
    </>
  );
}
