export interface Category {
  name: string;
  slug: string;
  coverImage: string;
}

export interface Photo {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  alt: string;
  category: {
    name: string;
    slug: string;
  };
  dateTaken?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  description?: string;
  dateTaken?: string;
  location?: string;
}

export interface ImageMetadata {
  title: string;
  category: string;
  dateTaken?: Date;
  location?: string;
}
