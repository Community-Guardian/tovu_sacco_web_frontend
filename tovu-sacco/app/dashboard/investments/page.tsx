"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvestmentDashboard } from "@/components/investments/investment-dashboard"
import { InvestmentsList } from "@/components/investments/investments-list"
import { UserInvestmentsList } from "@/components/investments/user-investments-list"
import { InvestmentTypesList } from "@/components/investments/investment-types-list"

export default function InvestmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Investments</h2>
        <p className="text-muted-foreground">Manage your investment portfolio and track your returns</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="investments">Available Investments</TabsTrigger>
          <TabsTrigger value="my-investments">My Investments</TabsTrigger>
          {/* <TabsTrigger value="types">Investment Types</TabsTrigger> */}
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

        {/* <TabsContent value="types">
          <InvestmentTypesList />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

