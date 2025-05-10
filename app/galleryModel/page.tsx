"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useGalleryContext } from "@/context/GalleryContext"
import GalleryView from "@/components/GalleryView"
import LoadingLogic from "@/components/LoadingLogic"
import modelMap from "@/utils/modelMap"

export default function GalleryModelPage() {
  const router = useRouter()
  const { selectedGallery, setSelectedGallery } = useGalleryContext()
  const [isLoading, setIsLoading] = useState(true)
  const [modelPreloaded, setModelPreloaded] = useState(false)

  useEffect(() => {
    // If no gallery is selected, redirect to home or select the first one
    if (!selectedGallery) {
      const firstGalleryId = Object.keys(modelMap)[0]
      if (firstGalleryId) {
        setSelectedGallery(firstGalleryId)
      } else {
        router.push("/")
      }
    }

    // Preload model resources
    if (selectedGallery) {
      const gallery = modelMap[selectedGallery]

      // Preload the image as a simple way to simulate model preloading
      const preloadImage = new Image()
      preloadImage.src = gallery.image

      preloadImage.onload = () => {
        setModelPreloaded(true)

        // Simulate loading completion
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      }

      preloadImage.onerror = () => {
        // Even on error, we should stop loading after a timeout
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }
  }, [selectedGallery, setSelectedGallery, router])

  if (isLoading) {
    return (
      <LoadingLogic
        isLoading={true}
        text={modelPreloaded ? "Preparing 3D environment..." : "Loading model resources..."}
      />
    )
  }

  if (!selectedGallery) {
    return <LoadingLogic isLoading={true} text="Loading gallery..." />
  }

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    padding: "0",
    overflow: "hidden",
  }

  return (
    <div style={containerStyle}>
      <GalleryView galleryId={selectedGallery} />
    </div>
  )
}
