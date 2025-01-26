import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Tovu Sacco",
  description: "Empowering your financial future through community savings and loans.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 relative flex min-h-screen flex-col">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}