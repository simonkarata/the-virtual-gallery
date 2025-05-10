"use client"

import type React from "react"

interface LoadingLogicProps {
  isLoading: boolean
  text?: string
}

export default function LoadingLogic({ isLoading, text = "Loading..." }: LoadingLogicProps) {
  if (!isLoading) return null

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }

  const spinnerStyle: React.CSSProperties = {
    width: "48px",
    height: "48px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #6b46c1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  }

  const textStyle: React.CSSProperties = {
    marginTop: "16px",
    color: "#4a5568",
    fontSize: "16px",
  }

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
        <p style={textStyle}>{text}</p>
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
