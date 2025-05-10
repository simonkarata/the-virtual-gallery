"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import GalleryHeader from "./GalleryHeader"
import GalleryGrid from "./GalleryGrid"
import { CategoryFilter } from "./CategoryFilter"

interface MainContentProps {
  searchQuery: string
  onSearch: (query: string) => void
  isMobile: boolean
}

export default function MainContent({ searchQuery, onSearch, isMobile }: MainContentProps) {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [filterHeight, setFilterHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  // Measure component heights
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
    if (filterRef.current) {
      setFilterHeight(filterRef.current.offsetHeight)
    }
  }, [isMobile])

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  }

  const headerContainerStyle: React.CSSProperties = {
    backgroundColor: "white",
    zIndex: 30,
    width: "100%",
    height: isMobile ? "auto" : "60px",
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  }

  const categoriesContainerStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    zIndex: 20,
    width: "100%",
    height: isMobile ? "auto" : "50px",
    display: "flex",
    alignItems: "center",
    paddingLeft: 0,
    marginBottom: "16px",
  }

  const gridContainerStyle: React.CSSProperties = {
    flex: 1,
    overflow: "hidden",
    width: "100%",
    position: "relative",
  }

  const gridScrollContainerStyle: React.CSSProperties = {
    height: "100%",
    overflowY: "auto",
    paddingRight: "8px",
  }

  return (
    <div style={containerStyle}>
      {/* Header section */}
      <div style={headerContainerStyle} ref={headerRef}>
        <GalleryHeader onSearch={onSearch} isMobile={isMobile} />
      </div>

      {/* Categories section */}
      <div style={categoriesContainerStyle} ref={filterRef}>
        <CategoryFilter style={{ padding: "0", margin: "0" }} />
      </div>

      {/* Grid section */}
      <div style={gridContainerStyle}>
        <div style={gridScrollContainerStyle}>
          <GalleryGrid searchQuery={searchQuery} isMobile={isMobile} />
        </div>
      </div>
    </div>
  )
}
