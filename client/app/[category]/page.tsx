import { Gallery } from "@/components/gallery"
import { categories, getCategoryImages } from "@/lib/data"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories.find((c) => c.slug === params.category)

  if (!category) {
    notFound()
  }

  const images = getCategoryImages(params.category)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{category.name}</h1>
      <Gallery images={images} />
    </div>
  )
}

