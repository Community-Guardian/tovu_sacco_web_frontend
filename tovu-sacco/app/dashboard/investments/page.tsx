"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestmentDashboard } from "@/components/investments/investment-dashboard";
import { InvestmentsList } from "@/components/investments/investments-list";
import { UserInvestmentsList } from "@/components/investments/user-investments-list";
import { InvestmentTypesList } from "@/components/investments/investment-types-list";
import { Spinner } from "@/components/ui/spinner"; // Import Spinner component

export default function InvestmentsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 1-second loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-12 w-12 text-primary" />
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Investments</h2>
            <p className="text-muted-foreground">
              Manage your investment portfolio and track your returns
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="investments">Available Investments</TabsTrigger>
              <TabsTrigger value="my-investments">My Investments</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <InvestmentDashboard />
            </TabsContent>

            <TabsContent value="investments">
              <InvestmentsList />
            </TabsContent>

            <TabsContent value="my-investments">
              <UserInvestmentsList />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
