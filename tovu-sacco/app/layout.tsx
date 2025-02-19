import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { AccountsProvider } from "@/context/AccountsContext";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { NotificationsProvider } from "@/context/NotificationContexts";
import { notFound } from "next/navigation"; // Import Next.js' built-in 404 handler

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tovu Sacco",
  description: "Empowering your financial future through community savings and loans.",
  icons: {
    icon: "/assets/download.jpeg",
    apple: "/assets/download.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            <NotificationsProvider>
              <ToastProvider>
                <AuthProvider>
                  <AccountsProvider>
                    {children || notFound()} {/* Ensures invalid routes trigger 404 */}
                    <Toaster />
                  </AccountsProvider>
                </AuthProvider>
              </ToastProvider>
            </NotificationsProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
