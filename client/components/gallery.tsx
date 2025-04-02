"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageModal } from "./image-modal";
import type { GalleryImage } from "@/lib/types";
import { photoApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface GalleryProps {
  category: string;
}

interface Photo {
  _id: string;
  imageUrl: string;
  alt: string;
  width?: number;
  height?: number;
  title: string;
  description?: string;
  dateTaken?: string;
  location?: string;
  category: {
    slug: string;
  };
}

export function Gallery({ category }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPhotos();
  }, [category]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const photos = await photoApi.getAllPhotos();

      // Filter by category if specified
      const filteredPhotos = category
        ? photos.filter((photo: Photo) => photo.category.slug === category)
        : photos;

      // Transform photos to GalleryImage format
      const galleryImages = filteredPhotos.map((photo: Photo) => ({
        id: photo._id,
        src: photo.imageUrl,
        alt: photo.alt,
        width: photo.width || 800,
        height: photo.height || 600,
        title: photo.title,
        description: photo.description,
        dateTaken: photo.dateTaken,
        location: photo.location,
      }));

      setImages(galleryImages);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast({
        title: "Error",
        description: "Failed to load photos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }

    setSelectedImage(images[newIndex]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 dark:text-gray-400">No photos found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="cursor-pointer"
            onClick={() => openModal(image)}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium">{image.title}</h3>
              {image.location && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {image.location}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        image={selectedImage}
        onNavigate={navigateImage}
        totalImages={images.length}
        currentIndex={
          selectedImage
            ? images.findIndex((img) => img.id === selectedImage.id)
            : 0
        }
        category={category}
      />
    </>
  );
}
