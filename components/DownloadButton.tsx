"use client"

import type React from "react"

interface DownloadButtonProps {
  fileUrl: string
  fileName: string
  style?: React.CSSProperties
}

export default function DownloadButton({ fileUrl, fileName, style }: DownloadButtonProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()

    const link = document.createElement("a")
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#6b46c1",
    backgroundColor: "#f3f0ff",
    padding: "6px 12px",
    borderRadius: "16px",
    border: "1px solid #e9d8fd",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    ...style,
  }

  return (
    <button onClick={handleDownload} style={buttonStyle} aria-label={`Download ${fileName}`}>
      <span style={{ fontSize: "12px" }}>↓</span> Download
    </button>
  )
}
