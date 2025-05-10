"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useGalleryContext } from "@/context/GalleryContext"
import ModelPreview from "./ModelPreview"
import TourButton from "./TourButton"

interface SideContentProps {
  isMobile: boolean
}

export default function SideContent({ isMobile }: SideContentProps) {
  const router = useRouter()
  const { selectedGallery } = useGalleryContext()

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "16px",
  }

  const previewContainerStyle: React.CSSProperties = {
    position: "relative",
    flex: 1,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const placeholderStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    color: "#a0aec0",
    textAlign: "center",
    padding: "16px",
    background: "linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)",
  }

  const placeholderIconStyle: React.CSSProperties = {
    fontSize: "48px",
    marginBottom: "16px",
    color: "#6b46c1",
  }

  const buttonContainerStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? "16px" : "20px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "8px",
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>3D Preview</h2>

      <div style={previewContainerStyle}>
        {selectedGallery ? (
          <>
            <ModelPreview galleryId={selectedGallery} />
            <div style={buttonContainerStyle}>
              <TourButton galleryId={selectedGallery} />
            </div>
          </>
        ) : (
          <div style={placeholderStyle}>
            <div style={placeholderIconStyle}>🖼️</div>
          </div>
        )}
      </div>
    </div>
  )
}
