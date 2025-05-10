"use client"

import type React from "react"
import { useRef } from "react"

interface GalleryInputProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  style?: React.CSSProperties
}

export default function GalleryInput({ value, onChange, onClear, style }: GalleryInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
    } else {
      onChange("")
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const containerStyle: React.CSSProperties = {
    position: "relative",
    ...style,
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    paddingLeft: "28px",
    paddingRight: "28px",
    fontSize: "14px",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    outline: "none",
    transition: "all 0.2s ease",
  }

  const searchIconStyle: React.CSSProperties = {
    position: "absolute",
    left: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#a0aec0",
    fontSize: "14px",
  }

  const clearButtonStyle: React.CSSProperties = {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#a0aec0",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: value ? "block" : "none",
  }

  return (
    <div style={containerStyle}>
      <span style={searchIconStyle}>🔍</span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search galleries..."
        style={inputStyle}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      {value && (
        <button style={clearButtonStyle} onClick={handleClear} aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  )
}
