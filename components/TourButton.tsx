"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useGalleryContext } from "@/context/GalleryContext"

interface TourButtonProps {
  galleryId?: string
  disabled?: boolean
  style?: React.CSSProperties
}

export default function TourButton({ galleryId, disabled = false, style }: TourButtonProps) {
  const router = useRouter()
  const { setSelectedGallery } = useGalleryContext()

  const handleStartTour = () => {
    if (disabled) return

    if (galleryId) {
      setSelectedGallery(galleryId)
      router.push(`/gallery/${galleryId}`)
    } else {
      router.push(`/galleryModel`)
    }
  }

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "24px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    backgroundColor: disabled ? "#e2e8f0" : "#6b46c1",
    color: disabled ? "#a0aec0" : "white",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    fontWeight: 600,
    ...style,
  }

  return (
    <button onClick={handleStartTour} style={buttonStyle} disabled={disabled}>
      <span style={{ fontSize: "12px" }}>▶</span>
      <span>Start Tour</span>
    </button>
  )
}
