"use client"

import { SocialLinks } from "@/components/social-links"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Photographer portrait"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">My Photography Journey</h2>
          <p className="text-muted-foreground">
            I've been passionate about photography for over a decade, capturing moments that tell stories and evoke
            emotions. My journey began with a simple point-and-shoot camera, but quickly evolved as I discovered my love
            for visual storytelling.
          </p>
          <p className="text-muted-foreground">
            I specialize in various photography styles, from intimate portraits to breathtaking landscapes. Each image I
            create is a reflection of my perspective and artistic vision.
          </p>
          <p className="text-muted-foreground">
            When I'm not behind the camera, I enjoy traveling to new destinations, exploring nature, and finding
            inspiration in everyday moments.
          </p>

          <div className="pt-4">
            <h3 className="text-xl font-medium mb-3">Connect With Me</h3>
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Approach</h2>
        <p className="text-muted-foreground text-center mb-8">
          I believe that photography is about capturing authentic moments and emotions. My approach is to create images
          that are both visually stunning and emotionally resonant.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="font-medium mb-2">Vision</h3>
            <p className="text-sm text-muted-foreground">
              Finding unique perspectives and compositions that tell compelling stories.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="font-medium mb-2">Technique</h3>
            <p className="text-sm text-muted-foreground">
              Mastering light, color, and timing to create impactful images.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="font-medium mb-2">Connection</h3>
            <p className="text-sm text-muted-foreground">
              Building rapport with subjects to capture authentic expressions and moments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

