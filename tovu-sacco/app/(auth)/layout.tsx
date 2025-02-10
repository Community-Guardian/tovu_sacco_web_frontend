import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export const metadata = {
  title: "Tovu Sacco",
  description: "Login Or create an Account.",
};

export default function AuthLayout({
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