"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useGalleryContext } from "@/context/GalleryContext"
import modelMap from "@/utils/modelMap"
import ArrowStates from "./ArrowStates"
import GalleryInput from "./GalleryInput"

interface GalleryHeaderProps {
  onSearch: (query: string) => void
  isMobile: boolean
}

export default function GalleryHeader({ onSearch, isMobile }: GalleryHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { selectedGallery, setSelectedGallery } = useGalleryContext()
  const galleryIds = Object.keys(modelMap)

  useEffect(() => {
    if (selectedGallery) {
      const gallery = modelMap[selectedGallery]
      setSearchQuery(gallery.title)
    }
  }, [selectedGallery])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)

    if (!value) {
      setSelectedGallery(null)
    }
  }

  const handlePrevious = () => {
    if (!galleryIds.length) return

    if (!selectedGallery) {
      setSelectedGallery(galleryIds[galleryIds.length - 1])
      return
    }

    const currentIndex = galleryIds.indexOf(selectedGallery)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryIds.length - 1
    setSelectedGallery(galleryIds[prevIndex])
  }

  const handleNext = () => {
    if (!galleryIds.length) return

    if (!selectedGallery) {
      setSelectedGallery(galleryIds[0])
      return
    }

    const currentIndex = galleryIds.indexOf(selectedGallery)
    const nextIndex = currentIndex < galleryIds.length - 1 ? currentIndex + 1 : 0
    setSelectedGallery(galleryIds[nextIndex])
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "8px" : "16px",
          height: "100%",
        }}
      >
        <ArrowStates onPrevious={handlePrevious} onNext={handleNext} />

        <h1
          style={{
            fontSize: isMobile ? "18px" : "24px",
            fontWeight: 700,
            color: "#333",
            letterSpacing: "0.05em",
            textAlign: "center",
            margin: 0,
          }}
        >
          VIRTUAL EXHIBITIONS
        </h1>

        <GalleryInput
          value={searchQuery}
          onChange={handleSearch}
          onClear={() => {
            setSearchQuery("")
            onSearch("")
            setSelectedGallery(null)
          }}
          style={{
            width: isMobile ? "120px" : "240px",
            height: isMobile ? "32px" : "36px",
          }}
        />
      </div>

      <div
        style={{
          height: "4px",
          width: "100%",
          background: "linear-gradient(to right, #6b46c1, #9f7aea)",
          borderRadius: "2px",
        }}
      />
    </div>
  )
}
