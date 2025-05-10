"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useGalleryContext } from "@/context/GalleryContext"
import modelMap from "@/utils/modelMap"
import DownloadButton from "./DownloadButton"
import ShareGallery from "./ShareGallery"

interface GalleryCardProps {
  id: string
  isMobile: boolean
}

export default function GalleryCard({ id, isMobile }: GalleryCardProps) {
  const router = useRouter()
  const { selectedGallery, setSelectedGallery } = useGalleryContext()
  const isSelected = selectedGallery === id
  const data = modelMap[id]
  const [isHovered, setIsHovered] = useState(false)

  const handleSelect = () => {
    try {
      if (isSelected) {
        setSelectedGallery(null)
      } else {
        setSelectedGallery(id)
      }
    } catch (error) {
      console.error("Failed to set selected gallery:", error)
    }
  }

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedGallery(id)
    router.push(`/gallery/${id}`)
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/gallery/${id}`

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: isSelected
      ? "0 0 0 2px #6b46c1, 0 4px 6px rgba(0, 0, 0, 0.1)"
      : isHovered
        ? "0 8px 16px rgba(0, 0, 0, 0.1)"
        : "0 1px 3px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.2s ease",
    height: isMobile ? "auto" : "100%",
    border: "1px solid #f0f0f0",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
  }

  const imageContainerStyle: React.CSSProperties = {
    position: "relative",
    height: isMobile ? "120px" : "140px",
    width: "100%",
    overflow: "hidden",
  }

  const contentStyle: React.CSSProperties = {
    padding: isMobile ? "12px" : "16px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "4px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }

  const categoryStyle: React.CSSProperties = {
    fontSize: isMobile ? "10px" : "12px",
    color: "#666",
    marginBottom: "4px",
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: isMobile ? "10px" : "12px",
    color: "#555",
    marginBottom: isMobile ? "8px" : "12px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }

  const actionsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
    gap: isMobile ? "4px" : "8px",
  }

  const imageOverlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const viewDetailsButtonStyle: React.CSSProperties = {
    padding: "6px 12px",
    backgroundColor: "white",
    color: "#333",
    borderRadius: "16px",
    border: "none",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }

  return (
    <div
      onClick={handleSelect}
      style={cardStyle}
      aria-label={`Gallery card for ${data.title}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div style={imageContainerStyle}>
        <Image
          src={data.image || "/placeholder.svg"}
          alt={`Preview of ${data.title}`}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
          sizes="(max-width: 768px) 100px, 240px"
          onError={(e) => {
            e.currentTarget.src = "/fallback.png"
          }}
        />
        <div style={imageOverlayStyle}>
          <button onClick={handleViewDetails} style={viewDetailsButtonStyle}>
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={contentStyle}>
        <div>
          <h2 style={titleStyle}>{data.title}</h2>
          <p style={categoryStyle}>Category: {data.category}</p>
          <p style={descriptionStyle}>{data.description || "No description provided."}</p>
        </div>

        {/* Actions */}
        <div style={actionsStyle}>
          <DownloadButton
            fileUrl={data.pdf || ""}
            fileName={`${data.title}.pdf`}
            style={{
              fontSize: isMobile ? "10px" : "12px",
              padding: isMobile ? "4px 6px" : "4px 8px",
              height: "28px",
              flex: 1,
            }}
          />
          <ShareGallery
            shareUrl={shareUrl}
            title={data.title}
            style={{
              fontSize: isMobile ? "10px" : "12px",
              padding: isMobile ? "4px 6px" : "4px 8px",
              height: "28px",
              flex: 1,
            }}
          />
        </div>
      </div>
    </div>
  )
}
