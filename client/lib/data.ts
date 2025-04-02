import type { Category, GalleryImage } from "./types"

export const categories: Category[] = [
  {
    name: "Portrait",
    slug: "portrait",
    coverImage: "/placeholder.svg?height=600&width=800",
  },
  {
    name: "Wildlife",
    slug: "wildlife",
    coverImage: "/placeholder.svg?height=600&width=800",
  },
  {
    name: "Nature",
    slug: "nature",
    coverImage: "/placeholder.svg?height=600&width=800",
  },
  {
    name: "Abstract",
    slug: "abstract",
    coverImage: "/placeholder.svg?height=600&width=800",
  },
  {
    name: "Black & White",
    slug: "black-and-white",
    coverImage: "/placeholder.svg?height=600&width=800",
  },
  {
    name: "Fashion",
    slug: "fashion",
    coverImage: "/placeholder.svg?height=600&width=800",
  },
]

// Helper function to generate placeholder images for each category
export function getCategoryImages(category: string): GalleryImage[] {
  // In a real application, you would fetch these from a database or API
  return Array.from({ length: 9 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    src: `/placeholder.svg?height=${600 + i * 50}&width=${800 + i * 30}`,
    alt: `${category} image ${i + 1}`,
    width: 800 + i * 30,
    height: 600 + i * 50,
  }))
}

