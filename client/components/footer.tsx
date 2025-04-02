import Link from "next/link"
import { SocialLinks } from "./social-links"

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Photography Portfolio. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <SocialLinks />
            <nav className="flex gap-x-4 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

