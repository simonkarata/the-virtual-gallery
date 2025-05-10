"use client"

import type React from "react"
import { useState } from "react"
import { useGalleryContext } from "@/context/GalleryContext"
import { type GalleryCategory, categoryLabels } from "@/utils/modelMap"

interface CategoryFilterProps {
  style?: React.CSSProperties
}

export function CategoryFilter({ style }: CategoryFilterProps) {
  const { selectedCategory, setSelectedCategory } = useGalleryContext()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignItems: "center",
    ...style,
  }

  const buttonStyle = (category: string): React.CSSProperties => {
    const isSelected = selectedCategory === category
    const isHovered = hoveredCategory === category

    return {
      padding: "8px 16px",
      borderRadius: "24px",
      fontSize: "14px",
      fontWeight: 500,
      transition: "all 0.2s ease",
      backgroundColor: isSelected ? "#6b46c1" : isHovered ? "#f3f0ff" : "white",
      color: isSelected ? "white" : "#4a5568",
      border: isSelected ? "1px solid #6b46c1" : "1px solid #e2e8f0",
      cursor: "pointer",
      transform: isHovered && !isSelected ? "translateY(-2px)" : "translateY(0)",
      boxShadow: isHovered && !isSelected ? "0 4px 6px rgba(0, 0, 0, 0.05)" : "none",
    }
  }

  return (
    <div style={containerStyle}>
      {Object.entries(categoryLabels).map(([category, label]) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category as GalleryCategory)}
          style={buttonStyle(category)}
          onMouseEnter={() => setHoveredCategory(category)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
