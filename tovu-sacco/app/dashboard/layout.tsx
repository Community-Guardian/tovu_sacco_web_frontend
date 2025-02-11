"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { SavingsProvider } from "@/context/SavingsContext";
import {LoansProvider} from "@/context/LoansContext"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, getUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-background p-6 lg:block">
        {user && <Sidebar user={user as User} />}
      </aside>
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
        <TransactionsProvider>
          <SavingsProvider>
          <LoansProvider>
            {children}
            </LoansProvider>
          </SavingsProvider>
        </TransactionsProvider>          
        </main>
      </div>
    </div>
  );
}
