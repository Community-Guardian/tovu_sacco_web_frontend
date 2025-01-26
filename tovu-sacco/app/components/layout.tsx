import Link from "next/link"
import Image from "next/image"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/tovu-sacco-logo.png" alt="Tovu Sacco Logo" width={50} height={50} />
            <span className="ml-2 text-2xl font-bold">Tovu Sacco</span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-secondary-light">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary-light">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-secondary-light">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary-light">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-primary text-white p-4">
        <div className="container mx-auto text-center">© 2023 Tovu Sacco. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default Layout

