"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import modelMap, { type GalleryData } from "@/utils/modelMap"
import ModelPreview from "@/components/ModelPreview"
import DownloadButton from "@/components/DownloadButton"
import ShareGallery from "@/components/ShareGallery"
import LoadingLogic from "@/components/LoadingLogic"
import { useGalleryContext } from "@/context/GalleryContext"

export default function GalleryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [gallery, setGallery] = useState<GalleryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { setSelectedGallery } = useGalleryContext()

  const slug = params?.slug as string

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Find the gallery with the matching slug
    if (modelMap[slug]) {
      setGallery(modelMap[slug])
      setSelectedGallery(slug)
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [slug, setSelectedGallery])

  const handleView3D = () => {
    setSelectedGallery(slug)
    router.push(`/galleryModel`)
  }

  if (isLoading) {
    return <LoadingLogic isLoading={true} text="Loading gallery details..." />
  }

  if (!gallery) {
    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 16px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}>Gallery not found</h1>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6b46c1",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ← Back to galleries
        </button>
      </div>
    )
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/gallery/${slug}`

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 16px",
  }

  const backButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    marginBottom: "24px",
    color: "#4a5568",
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "8px 0",
    fontSize: "14px",
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "32px",
  }

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: 700,
    color: "#1a202c",
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: "18px",
    color: "#4a5568",
  }

  const actionsStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  }

  const infoBoxStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "24px",
    backgroundColor: "#f8fafc",
  }

  const infoTitleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "16px",
    color: "#1a202c",
  }

  const infoItemStyle: React.CSSProperties = {
    marginBottom: "8px",
    color: "#4a5568",
  }

  const mediaContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  }

  const imageWrapperStyle: React.CSSProperties = {
    position: "relative",
    height: isMobile ? "200px" : "300px",
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
  }

  const modelWrapperStyle: React.CSSProperties = {
    position: "relative",
    height: isMobile ? "200px" : "300px",
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
  }

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    top: "8px",
    left: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    zIndex: 10,
  }

  const view3DButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    color: "#333",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  }

  return (
    <div style={containerStyle}>
      <button onClick={() => router.push("/")} style={backButtonStyle}>
        ← Back to galleries
      </button>

      <div style={gridStyle}>
        <div style={contentStyle}>
          <h1 style={titleStyle}>{gallery.title}</h1>
          <p style={descriptionStyle}>{gallery.description}</p>

          <div style={actionsStyle}>
            <button
              onClick={handleView3D}
              style={view3DButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f1f1"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f8f9fa"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <span>▶</span> View 3D Model
            </button>
            <DownloadButton
              fileUrl={gallery.pdf || ""}
              fileName={`${gallery.title}.pdf`}
              style={{ padding: "8px 16px", fontSize: "14px", height: "40px" }}
            />
            <ShareGallery
              shareUrl={shareUrl}
              title={gallery.title}
              style={{ padding: "8px 16px", fontSize: "14px", height: "40px" }}
            />
          </div>

          <div style={infoBoxStyle}>
            <h2 style={infoTitleStyle}>Gallery Information</h2>
            <div>
              <p style={infoItemStyle}>
                <strong>Category:</strong> {gallery.category || "Uncategorized"}
              </p>
              <p style={infoItemStyle}>
                <strong>Documentation:</strong> Available as PDF
              </p>
            </div>
          </div>
        </div>

        <div style={mediaContainerStyle}>
          <div style={imageWrapperStyle}>
            <div style={labelStyle}>Gallery Image</div>
            <Image
              src={gallery.image || "/placeholder.svg"}
              alt={gallery.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div style={modelWrapperStyle}>
            <div style={labelStyle}>3D Model</div>
            <ModelPreview galleryId={slug} />
          </div>
        </div>
      </div>
    </div>
  )
}
