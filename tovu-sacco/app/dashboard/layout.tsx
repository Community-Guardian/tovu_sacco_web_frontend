"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAccounts } from "@/context/AccountsContext";
import { useToast } from "@/hooks/use-toast";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { SavingsProvider } from "@/context/SavingsContext";
import { LoansProvider } from "@/context/LoansContext";
import { InvestmentsProvider } from "@/context/InvestmentsContext";
import { UserProvider } from "@/context/userContext";
import { User } from "@/types";

// 🔹 Loading Component
function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </motion.div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, getUser } = useAuth();
  const { accounts, fetchAccounts } = useAccounts();
  const [loading, setLoading] = useState(true);
  const [checkingAccount, setCheckingAccount] = useState(true); // New state
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const initializeDashboard = async () => {
      if (!Cookies.get("accessToken")) {
        router.push("/login");
        return;
      }

      try {
        const startTime = Date.now();

        await Promise.all([getUser(), fetchAccounts()]);

        const elapsedTime = Date.now() - startTime;
        const delay = Math.max(2000 - elapsedTime, 0);

        setTimeout(() => {
          setLoading(false);
        }, delay);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/login");
      }
    };

    initializeDashboard();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!accounts || accounts.length === 0) {
        setCheckingAccount(true); // Show loading while redirecting
        toast({
          title: "Account Setup Required",
          description: "You need to complete your account creation before accessing the dashboard.",
          variant: "destructive",
        });

        setTimeout(() => {
          router.push("/membership");
        }, 1500);
      } else {
        setCheckingAccount(false);
      }
    }
  }, [accounts, loading]);

  // Show loading while fetching user/accounts or checking for accounts
  if (loading || checkingAccount) {
    return <LoadingScreen message="Checking account setup..." />;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:block w-64 border-r bg-background p-6">
        {user && <Sidebar user={user as User} />}
      </aside>

      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <UserProvider>
            <TransactionsProvider>
              <SavingsProvider>
                <LoansProvider>
                  <InvestmentsProvider>{children}</InvestmentsProvider>
                </LoansProvider>
              </SavingsProvider>
            </TransactionsProvider>
          </UserProvider>
        </main>
      </div>
    </div>
  );
}
