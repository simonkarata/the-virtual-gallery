"use client"

import React, { useEffect, useRef, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF, useProgress, Html } from "@react-three/drei"
import modelMap from "@/utils/modelMap"
import UserControl from "./UserControl"

interface GalleryViewProps {
  galleryId: string
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={[1, 1, 1]} />
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="loader">
        <div className="spinner" />
        <p>Loading... {Math.floor(progress)}%</p>
      </div>
    </Html>
  )
}

export default function GalleryView({ galleryId }: GalleryViewProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([5, 2, 5])
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0])
  const [autoRotate, setAutoRotate] = useState(false)
  const [modelVisible, setModelVisible] = useState(false)

  const gallery = modelMap[galleryId]

  useEffect(() => {
    const timer = setTimeout(() => setModelVisible(true), 500)
    return () => clearTimeout(timer)
  }, [galleryId])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(console.error)
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 5))
    setCameraPosition(([x, y, z]) => [x, y, z - 1])
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5))
    setCameraPosition(([x, y, z]) => [x, y, z + 1])
  }

  const handleResetView = () => {
    setZoomLevel(1)
    setCameraPosition([5, 2, 5])
    setCameraTarget([0, 0, 0])
  }

  const handleMoveCamera = (direction: "left" | "right" | "up" | "down") => {
    const [x, y, z] = cameraPosition
    switch (direction) {
      case "left":
        setCameraPosition([x - 1, y, z])
        break
      case "right":
        setCameraPosition([x + 1, y, z])
        break
      case "up":
        setCameraPosition([x, y + 1, z])
        break
      case "down":
        setCameraPosition([x, y - 1, z])
        break
    }
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "calc(100vh - 120px)",
          backgroundColor: "#1a202c",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Canvas
          camera={{ position: cameraPosition, fov: 50 }}
          style={{ opacity: modelVisible ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={<Loader />}>
            <Model url={gallery.modelPath} />
            <Environment preset="sunset" />
            <OrbitControls
              target={cameraTarget}
              enablePan
              enableZoom
              enableRotate
              autoRotate={autoRotate}
              autoRotateSpeed={1}
            />
          </Suspense>
        </Canvas>

        <button
          onClick={() => router.push("/")}
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "8px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ←
        </button>

        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "8px",
            borderRadius: "24px",
            zIndex: 10,
          }}
        >
          <UserControl icon="↺" label="Reset View" onClick={handleResetView} />
          <UserControl icon="−" label="Zoom Out" onClick={handleZoomOut} disabled={zoomLevel <= 0.5} />
          <UserControl icon="+" label="Zoom In" onClick={handleZoomIn} disabled={zoomLevel >= 5} />
          <UserControl
            icon={autoRotate ? "⏸" : "▶"}
            label={autoRotate ? "Pause Rotation" : "Auto Rotate"}
            onClick={() => setAutoRotate(!autoRotate)}
          />
          <UserControl
            icon={isFullscreen ? "⊞" : "⛶"}
            label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            onClick={toggleFullscreen}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            zIndex: 10,
          }}
        >
          <UserControl icon="↑" label="Move Up" onClick={() => handleMoveCamera("up")} />
          <UserControl icon="←" label="Move Left" onClick={() => handleMoveCamera("left")} />
          <UserControl icon="⌂" label="Center" onClick={handleResetView} />
          <UserControl icon="→" label="Move Right" onClick={() => handleMoveCamera("right")} />
          <UserControl icon="↓" label="Move Down" onClick={() => handleMoveCamera("down")} />
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: 600 }}>{gallery.title}</h2>
        <p style={{ color: "#666" }}>{gallery.description}</p>
      </div>

      <style jsx>{`
        .loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #2d3748;
          border-top: 4px solid #805ad5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
