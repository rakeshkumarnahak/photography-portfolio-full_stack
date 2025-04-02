"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Capturing Moments, <br />
            <span className="text-muted-foreground">Creating Memories</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Hi, I'm [Your Name], a professional photographer specializing in portrait, wildlife, and landscape
            photography. I'm passionate about capturing the beauty in everyday moments and creating timeless images.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Book a Session</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-square rounded-full overflow-hidden border-8 border-background shadow-xl mx-auto max-w-md"
        >
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Photographer portrait"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}

