"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { GalleryCategory } from "@/utils/modelMap"

interface GalleryContextType {
  selectedGallery: string | null
  setSelectedGallery: (id: string | null) => void
  selectedCategory: GalleryCategory
  setSelectedCategory: (category: GalleryCategory) => void
}

// Create context with default values
const GalleryContext = createContext<GalleryContextType>({
  selectedGallery: null,
  setSelectedGallery: () => {},
  selectedCategory: "all",
  setSelectedCategory: () => {},
})

interface GalleryProviderProps {
  children: ReactNode
}

export function GalleryProvider({ children }: GalleryProviderProps) {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all")

  return (
    <GalleryContext.Provider
      value={{
        selectedGallery,
        setSelectedGallery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </GalleryContext.Provider>
  )
}

export const useGalleryContext = () => useContext(GalleryContext)
