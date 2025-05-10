"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { GalleryProvider } from "@/context/GalleryContext"
import MainContent from "@/components/MainContent"
import SideContent from "@/components/SideContent"
import { useMediaQuery } from "@/hooks/use-media-query"
import LoadingLogic from "@/components/LoadingLogic"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial loading
  useEffect(() => {
    // Preload essential resources
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  }

  const mainContentStyle: React.CSSProperties = {
    flex: "1",
    overflowY: "auto",
    padding: "0 16px",
    backgroundColor: "#f8fafc",
    borderRight: isMobile ? "none" : "1px solid #e2e8f0",
    height: isMobile ? "calc(70vh - 60px)" : "100%",
    order: 1,
  }

  const sideContentStyle: React.CSSProperties = {
    width: isMobile ? "100%" : "30%",
    height: isMobile ? "30vh" : "100%",
    transition: "all 0.3s ease",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    order: isMobile ? 2 : 2,
    borderTop: isMobile ? "1px solid #e2e8f0" : "none",
  }

  if (isLoading) {
    return <LoadingLogic isLoading={true} text="Loading Virtual Exhibitions..." />
  }

  return (
    <GalleryProvider>
      <div style={containerStyle}>
        <div style={mainContentStyle}>
          <MainContent searchQuery={searchQuery} onSearch={setSearchQuery} isMobile={isMobile} />
        </div>
        <div style={sideContentStyle}>
          <SideContent isMobile={isMobile} />
        </div>
      </div>
    </GalleryProvider>
  )
}
