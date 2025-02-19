"use client";

import { useState, useDeferredValue } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanApplications } from "./components/loan-applications";
import { AvailableLoanTypes } from "./components/available-loan-types";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/ui/spinner"; // Import the Spinner component

export default function LoansPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"applications" | "available">("applications");
  const deferredTab = useDeferredValue(activeTab);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: "applications" | "available") => {
    if (activeTab === tab) return;
    setLoading(true);
    setActiveTab(tab);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Tab Switched",
        description: tab === "applications" ? "Viewing your loan applications" : "Browsing available loans",
      });
    }, 1000); // Show loading for 1 second
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Loans</h2>

      <Tabs defaultValue="applications" className="space-y-4 w-full">
        <TabsList className="bg-muted rounded-lg flex justify-center md:justify-start overflow-auto">
          <TabsTrigger
            value="applications"
            className={`transition-all px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "applications"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-muted-foreground/10"
            }`}
            onClick={() => handleTabChange("applications")}
          >
            My Loans
          </TabsTrigger>
          <TabsTrigger
            value="available"
            className={`transition-all px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "available"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-muted-foreground/10"
            }`}
            onClick={() => handleTabChange("available")}
          >
            Available Loans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          {loading && deferredTab === "applications" ? (
            <div className="flex justify-center items-center py-10">
              <Spinner className="h-8 w-8 text-primary" />
            </div>
          ) : (
            <LoanApplications />
          )}
        </TabsContent>

        <TabsContent value="available">
          {loading && deferredTab === "available" ? (
            <div className="flex justify-center items-center py-10">
              <Spinner className="h-8 w-8 text-primary" />
            </div>
          ) : (
            <AvailableLoanTypes />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
