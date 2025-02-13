import { Inter } from "next/font/google"
import "./globals.css"
import { Metadata } from "next"
import { AuthProvider } from "@/context/AuthContext"
import { AccountsProvider } from "@/context/AccountsContext";
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tovu Sacco",
  description: "Empowering your financial future through community savings and loans.",
  icons: {
    icon: "/assets/download.png",
    apple: "/assets/download.png",
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            <ToastProvider>
              <AuthProvider>
                <AccountsProvider>
                  {children}
                  <Toaster />
                </AccountsProvider>
              </AuthProvider>
            </ToastProvider>
          </main>
        </div>
      </body>
    </html>
  )
}

