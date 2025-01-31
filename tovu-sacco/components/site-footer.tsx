import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background w-full h-min">
      <div className="container mx-auto max-w-7xl p-1 md:p-2 lg:p-3 xl:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="mb-3 text-lg font-semibold">About Tovu Sacco</h3>
            <p className="text-sm text-muted-foreground">
              Empowering our members through financial inclusion, education, and support since 2010.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-muted-foreground hover:text-primary">
                  Join Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Contact</h3>
            <ul className="space-y-1 text-sm">
              <li className="text-muted-foreground">123 Sacco Street</li>
              <li className="text-muted-foreground">Nairobi, Kenya</li>
              <li className="text-muted-foreground">Phone: +254 123 456 789</li>
              <li className="text-muted-foreground">Email: info@tovusacco.com</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-3">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t p-1 pt-0">
          <div className="container flex flex-col items-center justify-between gap-2 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; 2024 Tovu Sacco. All rights reserved.
            </p>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-primary">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-primary">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}