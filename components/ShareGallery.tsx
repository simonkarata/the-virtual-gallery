"use client"

import type React from "react"

interface ShareGalleryProps {
  shareUrl: string
  title: string
  style?: React.CSSProperties
}

export default function ShareGallery({ shareUrl, title, style }: ShareGalleryProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: shareUrl,
        })
        .catch((err) => console.error("Error sharing:", err))
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy:", err))
    }
  }

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#6b46c1",
    backgroundColor: "white",
    padding: "6px 12px",
    borderRadius: "16px",
    border: "1px solid #e9d8fd",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    ...style,
  }

  return (
    <button onClick={handleShare} style={buttonStyle} aria-label={`Share ${title}`}>
      <span style={{ fontSize: "12px" }}>↗</span> Share
    </button>
  )
}
