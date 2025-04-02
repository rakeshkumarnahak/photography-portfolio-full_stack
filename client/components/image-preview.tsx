"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { format } from "date-fns"
import { Calendar, MapPin } from "lucide-react"
import type { ImageMetadata } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ImagePreviewProps {
  imageUrl: string | null
  metadata: ImageMetadata | null
}

export function ImagePreview({ imageUrl, metadata }: ImagePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border shadow-sm h-full flex flex-col"
    >
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Image Preview</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        {imageUrl ? (
          <div className="w-full space-y-6">
            <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-lg border">
              <Image src={imageUrl || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
            </div>

            {metadata && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto w-full"
              >
                <h3 className="font-medium text-lg mb-2">{metadata.title || "Untitled"}</h3>

                <div className="space-y-2 text-sm">
                  {metadata.category && (
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary-foreground/90 rounded text-xs font-medium">
                        {metadata.category}
                      </span>
                    </div>
                  )}

                  {metadata.dateTaken && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(metadata.dateTaken, "MMMM d, yyyy")}</span>
                    </div>
                  )}

                  {metadata.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{metadata.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "w-full h-64 flex flex-col items-center justify-center rounded-lg border-2 border-dashed",
              "text-muted-foreground",
            )}
          >
            <p className="text-center">Upload an image to see the preview</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

