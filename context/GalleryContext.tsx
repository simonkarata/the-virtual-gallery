'use client';

import React, { createContext, useContext, useState } from 'react';

export type GalleryData = {
  title: string;
  description: string;
  image: string;
  modelPath: string;
  pdf: string;
};

type GalleryContextType = {
  selectedGallery: GalleryData | null;
  setSelectedGallery: (gallery: GalleryData) => void;
  previousGalleries: GalleryData[];
  nextGalleries: GalleryData[];
  navigatePrevious: () => void;
  navigateNext: () => void;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGalleryContext = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }
  return context;
};

export const GalleryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGallery, setSelectedGalleryState] = useState<GalleryData | null>(null);
  const [previousGalleries, setPreviousGalleries] = useState<GalleryData[]>([]);
  const [nextGalleries, setNextGalleries] = useState<GalleryData[]>([]);

  const setSelectedGallery = (gallery: GalleryData) => {
    if (selectedGallery && selectedGallery.title !== gallery.title) {
      setPreviousGalleries((prev) => [selectedGallery, ...prev.slice(0, 4)]);
      setNextGalleries([]);
    }
    setSelectedGalleryState(gallery);
  };

  const navigatePrevious = () => {
    if (!selectedGallery || previousGalleries.length === 0) return;
    const [prevGallery, ...rest] = previousGalleries;
    setNextGalleries((next) => [selectedGallery, ...next]);
    setSelectedGalleryState(prevGallery);
    setPreviousGalleries(rest);
  };

  const navigateNext = () => {
    if (!selectedGallery || nextGalleries.length === 0) return;
    const [nextGallery, ...rest] = nextGalleries;
    setPreviousGalleries((prev) => [selectedGallery, ...prev.slice(0, 4)]);
    setSelectedGalleryState(nextGallery);
    setNextGalleries(rest);
  };

  return (
    <GalleryContext.Provider
      value={{
        selectedGallery,
        setSelectedGallery,
        previousGalleries,
        nextGalleries,
        navigatePrevious,
        navigateNext,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
