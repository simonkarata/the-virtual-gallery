import type React from "react"
import { GalleryProvider } from "@/context/GalleryContext"

export default function GalleryModelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <GalleryProvider>{children}</GalleryProvider>
}
