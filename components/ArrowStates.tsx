"use client"

interface ArrowStatesProps {
  onPrevious: () => void
  onNext: () => void
}

export default function ArrowStates({ onPrevious, onNext }: ArrowStatesProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        onClick={onPrevious}
        style={{
          padding: "8px",
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#555",
          transition: "background-color 0.3s",
        }}
        aria-label="Previous gallery"
      >
        ←
      </button>

      <button
        onClick={onNext}
        style={{
          padding: "8px",
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#555",
          transition: "background-color 0.3s",
        }}
        aria-label="Next gallery"
      >
        →
      </button>
    </div>
  )
}
