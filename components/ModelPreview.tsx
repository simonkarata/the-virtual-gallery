"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import modelMap from "@/utils/modelMap"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense } from "react"

// 3D Model component
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />
}

interface ModelPreviewProps {
  galleryId: string
}

export default function ModelPreview({ galleryId }: ModelPreviewProps) {
  const [loading, setLoading] = useState(true)
  const modelRef = useRef<HTMLDivElement>(null)
  const gallery = modelMap[galleryId]

  // Preload the model
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [galleryId, gallery])

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    background: "linear-gradient(135deg, #4a1d96 0%, #4338ca 100%)",
    borderRadius: "12px",
    overflow: "hidden",
  }

  const contentStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    zIndex: 10,
    padding: "16px",
  }

  const loadingStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 20,
  }

  const spinnerStyle: React.CSSProperties = {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "8px",
    textAlign: "center",
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "24px",
    textAlign: "center",
  }

  const modelContainerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    opacity: loading ? 0 : 1,
    transition: "opacity 0.5s ease",
  }

  return (
    <div style={containerStyle} ref={modelRef}>
      {/* 3D Model */}
      <div style={modelContainerStyle}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Model url={gallery.modelPath} />
            <Environment preset="studio" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate
              autoRotateSpeed={1}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content overlay */}
      <div style={contentStyle}>
        {loading ? (
          <div style={loadingStyle}>
            <div style={spinnerStyle}></div>
            <p>Loading 3D preview...</p>
          </div>
        ) : (
          <>
            <h3 style={titleStyle}>{gallery.title}</h3>
            <p style={descriptionStyle}></p>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
