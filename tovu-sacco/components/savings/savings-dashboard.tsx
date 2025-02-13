"use client"

import { useSavings } from "@/context/SavingsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ArrowUpCircle, Bell, CheckCircle2, Clock, Target } from 'lucide-react'
import { formatCurrency } from "@/lib/utils"
import { useState ,useEffect} from "react";

export function SavingsDashboard() {
  const {
    goals = [],
    transactions = [],
    notifications = [],
    loading,
    error,
    fetchGoals,
  } = useSavings()
  useEffect(() => {
    fetchGoals();
  }, []);
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">
            Failed to load savings information
          </p>
        </div>
      </div>
    )
  }

  // Calculate total savings across all goals
  const totalSavings = goals.reduce((acc, goal) => acc + Number(goal.current_amount || 0), 0)

  // Calculate total target amount
  const totalTarget = goals.reduce((acc, goal) => acc + Number(goal.target_amount || 0), 0)

  // Ensure we don't divide by zero
  const progressPercentage = totalTarget > 0 ? (totalSavings / totalTarget) * 100 : 0

  // Get recent transactions
  const recentTransactions = transactions.slice(0, 5)

  // Get unread notifications
  const unreadNotifications = notifications.filter(
    (notification) => !notification.is_read
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalSavings)}</div>
          <Progress value={progressPercentage} className="mt-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            {progressPercentage.toFixed(1)}% of total goal
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {goals.filter((goal) => goal.is_active).length}
          </div>
          <p className="text-xs text-muted-foreground">
            Out of {goals.length} total goals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  <ArrowUpCircle className="h-4 w-4 text-green-500" />
                  <span>
                    {formatCurrency(Number(transaction.amount || 0))}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {transaction.date ? new Date(transaction.date).toLocaleDateString() : "N/A"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unreadNotifications.length}</div>
          <p className="text-xs text-muted-foreground">Unread notifications</p>
          {unreadNotifications.length > 0 && (
            <Button variant="link" className="mt-2 h-auto p-0">
              View all
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
