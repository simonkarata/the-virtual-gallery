export interface GalleryData {
  title: string
  description: string
  image: string
  modelPath: string
  pdf?: string
  category?: string
}

// Define the actual gallery category type based on the keys of modelMap
export type GalleryCategory = "all" | "modernart" | "classic" | "surreal" | "phenomenal" | "sonder" | "ethereal"

// Category display labels
export const categoryLabels: Record<GalleryCategory, string> = {
  all: "All Galleries",
  modernart: "Modern Art",
  classic: "Classic",
  surreal: "Surreal",
  phenomenal: "Urban",
  sonder: "Media",
  ethereal: "Classical",
}

const modelMap: Record<string, GalleryData> = {
  modernart: {
    title: "Art Gallery",
    description: "Explore contemporary creativity and styles.",
    image: "/models/artGalleryImg.jpg",
    modelPath: "/models/artGallery.glb",
    pdf: "/models/galleryData.pdf",
    category: "Art",
  },
  classic: {
    title: "Clock Room",
    description: "Step into timeless masterpieces.",
    image: "/models/clockImg.jpg",
    modelPath: "/models/clock.glb",
    pdf: "/models/galleryData.pdf",
    category: "Classic",
  },
  surreal: {
    title: "The Entryway - Museum Diorama",
    description: "Dive into dreamlike visual narratives.",
    image: "/models/theEntrywayMuseumImg.jpg",
    modelPath: "/models/theEntrywayMuseum.glb",
    pdf: "/models/galleryData.pdf",
    category: "Surreal",
  },
  phenomenal: {
    title: "Town Center",
    description: "Urban-themed creative display.",
    image: "/models/townCenterImg.jpg",
    modelPath: "/models/townCenter.glb",
    pdf: "/models/galleryData.pdf",
    category: "Urban",
  },
  sonder: {
    title: "MTV VMA Gallery",
    description: "Award-themed media space.",
    image: "/models/mtvVmaGalleryImg.jpg",
    modelPath: "/models/mtvVmaGallery.glb",
    pdf: "/models/galleryData.pdf",
    category: "Media",
  },
  ethereal: {
    title: "The Picture Gallery",
    description: "Visual storytelling in classical form.",
    image: "/models/thePictureGalleryImg.jpg",
    modelPath: "/models/thePictureGallery.glb",
    pdf: "/models/galleryData.pdf",
    category: "Classical",
  },
}

export default modelMap
