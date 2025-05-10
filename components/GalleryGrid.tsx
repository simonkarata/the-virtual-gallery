"use client"

import React, { useMemo, useRef, useEffect } from "react"
import { useGalleryContext } from "@/context/GalleryContext"
import modelMap from "@/utils/modelMap"
import GalleryCard from "./GalleryCard"

interface GalleryGridProps {
  searchQuery: string
  isMobile: boolean
}

export default function GalleryGrid({ searchQuery, isMobile }: GalleryGridProps) {
  const { selectedGallery, selectedCategory } = useGalleryContext()
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState(0)

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Filter galleries based on search query and category
  const filteredGalleries = useMemo(() => {
    return Object.entries(modelMap).filter(([id, gallery]) => {
      // Filter by category
      if (selectedCategory !== "all" && id !== selectedCategory) {
        return false
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return gallery.title.toLowerCase().includes(query) || gallery.description.toLowerCase().includes(query)
      }

      return true
    })
  }, [searchQuery, selectedCategory])

  // Group galleries by category
  const groupedGalleries = useMemo(() => {
    const groups: Record<string, string[]> = {}

    // First, create a "Featured" group with all galleries if no search query
    if (!searchQuery) {
      groups["Featured"] = filteredGalleries.slice(0, 6).map(([id]) => id)
    }

    // Group by category
    filteredGalleries.forEach(([id, gallery]) => {
      const category = gallery.category || "Uncategorized"
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(id)
    })

    return groups
  }, [filteredGalleries, searchQuery])

  const handleScroll = (category: string, direction: "left" | "right") => {
    const container = carouselRefs.current[category]
    if (!container) return

    // Calculate scroll amount based on card width and container width
    const cardWidth = isMobile ? 160 : 240
    const gap = 16
    const visibleWidth = container.offsetWidth
    const scrollAmount = Math.floor(visibleWidth / (cardWidth + gap)) * (cardWidth + gap)

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // If no galleries match the search
  if (filteredGalleries.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <h3 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "8px" }}>No galleries found</h3>
        <p style={{ color: "#666" }}>Try adjusting your search query</p>
      </div>
    )
  }

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    padding: "0",
  }

  const categoryContainerStyle: React.CSSProperties = {
    marginBottom: "8px",
    width: "100%",
  }

  const categoryHeaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    width: "100%",
    paddingLeft: "0",
  }

  const categoryTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#333",
  }

  const arrowsContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
  }

  const carouselContainerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
  }

  const carouselStyle: React.CSSProperties = {
    display: "flex",
    overflowX: "auto",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
    paddingBottom: "12px",
    scrollSnapType: "x mandatory",
  }

  const carouselInnerStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
  }

  const arrowButtonStyle = (direction: "left" | "right"): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    backgroundColor: "transparent",
    color: "#666",
    border: "1px solid #e2e8f0",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
    fontSize: "16px",
  })

  // Fixed the TypeScript error by using a callback ref pattern
  const setCarouselRef = (category: string) => (el: HTMLDivElement | null) => {
    carouselRefs.current[category] = el
  }

  return (
    <div style={containerStyle} ref={containerRef}>
      {Object.entries(groupedGalleries).map(([category, galleryIds]) => (
        <div key={category} style={categoryContainerStyle}>
          <div style={categoryHeaderStyle}>
            <h2 style={categoryTitleStyle}>{category}</h2>
            <div style={arrowsContainerStyle}>
              <button
                onClick={() => handleScroll(category, "left")}
                style={arrowButtonStyle("left")}
                aria-label={`Scroll ${category} left`}
              >
                ←
              </button>
              <button
                onClick={() => handleScroll(category, "right")}
                style={arrowButtonStyle("right")}
                aria-label={`Scroll ${category} right`}
              >
                →
              </button>
            </div>
          </div>
          <div style={carouselContainerStyle}>
            <div ref={setCarouselRef(category)} style={carouselStyle}>
              <div style={carouselInnerStyle}>
                {galleryIds.map((id) => (
                  <div
                    key={id}
                    style={{
                      width: isMobile ? "160px" : "240px",
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <GalleryCard id={id} isMobile={isMobile} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        div[style*="overflow-x: auto"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
