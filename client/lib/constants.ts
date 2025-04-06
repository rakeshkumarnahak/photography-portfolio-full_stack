export interface Category {
  name: string;
  slug: string;
  description?: string;
}

export const categories: Category[] = [
  {
    name: "Portrait",
    slug: "portrait",
    description: "Capturing personalities and emotions through portraiture",
  },
  {
    name: "Landscape",
    slug: "landscape",
    description: "Beautiful natural and urban landscapes",
  },
  {
    name: "Street",
    slug: "street",
    description: "Candid moments from urban life",
  },
  {
    name: "Architecture",
    slug: "architecture",
    description: "Exploring structural design and urban spaces",
  },
  {
    name: "Nature",
    slug: "nature",
    description: "Flora, fauna, and natural phenomena",
  },
  {
    name: "Wildlife",
    slug: "wildlife",
    description: "Capturing animals in their natural habitat",
  },
  {
    name: "Abstract",
    slug: "abstract",
    description: "Creative and conceptual photography",
  },
];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((category) => category.slug === slug);
};

// Helper function to validate category slug
export const isValidCategorySlug = (slug: string): boolean => {
  return categories.some((category) => category.slug === slug);
};
