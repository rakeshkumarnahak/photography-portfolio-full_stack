import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { categories } from "@/lib/data"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Photography Categories</h2>
        <CategoryGrid categories={categories} />
      </section>
    </div>
  )
}

