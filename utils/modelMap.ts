// utils/modelMap.ts

export type GalleryData = {
  title: string;
  description: string;
  image: string;
  modelPath: string;
  pdf: string;
};

const modelMap: Record<string, GalleryData> = {
  modernart: {
    title: "art_gallery",
    description: "Explore contemporary creativity and styles.",
    image: "/models/art-gallery-jpg.jpg",
    modelPath: "/models/art_gallery.glb",
    pdf: "/models/galleryData.pdf",
  },
  classic: {
    title: "gallery-room",
    description: "Step into timeless masterpieces.",
    image: "/models/gallery-room-jpg.jpg",
    modelPath: "/models/art_gallery.glb",
    pdf: "/models/galleryData.pdf",
  },
  surreal: {
    title: "The Entryway - Museum Diorama",
    description: "Dive into dreamlike visual narratives.",
    image: "/models/the-entryway-museum-diorama.jpg",
    modelPath: "/models/the-entryway-museum-diorama.glb",
    pdf: "/models/galleryData.pdf",
  },
  phenomenal: {
    title: "Town Center",
    description: "Urban-themed creative display.",
    image: "/models/town-center.jpg",
    modelPath: "/models/town-center.glb",
    pdf: "/models/galleryData.pdf",
  },
  sonder: {
    title: "mtv_vma_gallery_2016",
    description: "Award-themed media space.",
    image: "/models/mtv_vma_gallery_2016-jpg.jpg",
    modelPath: "/models/mtv_vma_gallery_2016.glb",
    pdf: "/models/galleryData.pdf",
  },
  ethereal: {
    title: "the_picture_gallery",
    description: "Visual storytelling in classical form.",
    image: "/models/art-gallery-jpg.jpg",
    modelPath: "/models/the_picture_gallery.glb",
    pdf: "/models/galleryData.pdf",
  },
};

export default modelMap;
