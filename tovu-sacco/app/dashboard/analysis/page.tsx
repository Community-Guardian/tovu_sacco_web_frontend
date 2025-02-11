"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SavingsDashboard } from "@/components/savings/savings-dashboard"
import { GoalsList } from "@/components/savings/goals-list"
import { TransactionsList } from "@/components/savings/transactions-list"
import { CreateGoalDialog } from "@/components/savings/create-goal-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SavingsPage() {
  const [showCreateGoal, setShowCreateGoal] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Savings</h2>
          <p className="text-muted-foreground">Manage your savings goals and track your progress</p>
        </div>
        <Button onClick={() => setShowCreateGoal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <SavingsDashboard />
        </TabsContent>
        <TabsContent value="goals">
          <GoalsList />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionsList />
        </TabsContent>
      </Tabs>

      <CreateGoalDialog open={showCreateGoal} onOpenChange={setShowCreateGoal} />
    </div>
  )
}

