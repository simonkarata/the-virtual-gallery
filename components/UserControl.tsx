"use client"

import React from "react"

interface UserControlProps {
  icon: string
  label: string
  onClick: () => void
  disabled?: boolean
  style?: React.CSSProperties
}

export default function UserControl({
  icon,
  label,
  onClick,
  disabled = false,
  style,
}: UserControlProps) {
  const [showTooltip, setShowTooltip] = React.useState(false)

  const buttonStyle: React.CSSProperties = {
    padding: "10px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "white",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    position: "relative",
    fontSize: "20px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  }

  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    marginBottom: "8px",
    padding: "4px 8px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    fontSize: "12px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    opacity: showTooltip ? 1 : 0,
    transition: "opacity 0.2s",
    pointerEvents: "none",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      aria-label={label}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {icon}
      <span style={tooltipStyle}>{label}</span>
    </button>
  )
}
