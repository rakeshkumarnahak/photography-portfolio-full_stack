"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@/lib/types";
import { photoApi } from "@/lib/api";
import { format } from "date-fns";

interface ImagePageProps {
  params: {
    category: string;
    id: string;
  };
}

export default function ImagePage({ params }: ImagePageProps) {
  const router = useRouter();
  const [image, setImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const photo = await photoApi.getPhotoById(params.id);
        setImage({
          id: photo._id,
          src: photo.imageUrl,
          alt: photo.alt,
          width: photo.width || 1920,
          height: photo.height || 1080,
          title: photo.title,
          description: photo.description,
          dateTaken: photo.dateTaken,
          location: photo.location,
        });
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [params.id]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      const imageContainer = document.getElementById("image-container");
      if (imageContainer) {
        imageContainer.requestFullscreen();
        setIsFullScreen(true);
      }
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Image not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Image section */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div
          id="image-container"
          className="relative w-full max-w-7xl aspect-[16/9] rounded-xl overflow-hidden bg-background/5"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain p-4"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />

          {/* Full screen button */}
          <div className="absolute bottom-6 right-6 z-10">
            <Button
              size="icon"
              variant="secondary"
              onClick={toggleFullScreen}
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <Maximize className="h-5 w-5" />
              <span className="sr-only">Toggle full screen</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="w-full bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">{image.title}</h1>

          {image.description && (
            <p className="text-muted-foreground text-lg mb-6">
              {image.description}
            </p>
          )}

          <div className="space-y-3">
            {image.dateTaken && (
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{format(new Date(image.dateTaken), "MMMM d, yyyy")}</span>
              </div>
            )}

            {image.location && (
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{image.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
