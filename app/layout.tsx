import type React from "react"
import { GalleryProvider } from "@/context/GalleryContext"
import "./globals.css"

export const metadata = {
  title: "3D Gallery Explorer",
  description: "Explore interactive 3D gallery models",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GalleryProvider>{children}</GalleryProvider>
      </body>
    </html>
  )
}
