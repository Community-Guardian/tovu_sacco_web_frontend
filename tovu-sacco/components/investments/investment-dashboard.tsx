"use client"

import { useEffect } from "react"
import { useInvestments } from "@/context/InvestmentsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ArrowUpCircle, Clock, DollarSign, LineChart, PiggyBank, Target } from 'lucide-react'
import { formatCurrency } from "@/lib/utils"

export function InvestmentDashboard() {
  const {
    investmentAccounts,
    userInvestments,
    // dividends,
    loading,
    error,
    fetchInvestmentAccounts,
    fetchUserInvestments,
    fetchDividends,
  } = useInvestments()

  useEffect(() => {
    fetchInvestmentAccounts()
    fetchUserInvestments()
    // fetchDividends()
  }, [])

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
            Failed to load investment information
          </p>
        </div>
      </div>
    )
  }

  const account = investmentAccounts[0] // Assuming first account
  const totalInvested = Number(account?.total_investments || 0)
  const totalProfitLoss = Number(account?.total_profit_or_loss || 0)
  const investmentLimit = Number(account?.investment_limit || 0)
  // const recentDividends = dividends.slice(0, 5)

  const roiPercentage =
    totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
          <Progress
            value={(totalInvested / investmentLimit) * 100}
            className="mt-2"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {((totalInvested / investmentLimit) * 100).toFixed(1)}% of investment
            limit
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Profit/Loss
          </CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatCurrency(totalProfitLoss)}
          </div>
          <p className="text-xs text-muted-foreground">
            ROI: {roiPercentage.toFixed(2)}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {userInvestments.filter((inv) => inv.current_profit_or_loss > 0).length}
          </div>
          <p className="text-xs text-muted-foreground">
            Out of {userInvestments.length} total investments
          </p>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Dividends</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentDividends.map((dividend) => (
              <div
                key={dividend.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  <ArrowUpCircle className="h-4 w-4 text-green-500" />
                  <span>{formatCurrency(dividend.amount)}</span>
                </div>
                <span className="text-muted-foreground">
                  {new Date(dividend.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Investment Account Status
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Account Number</span>
              <span className="text-sm">{account?.account}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Investment Limit</span>
              <span className="text-sm">
                {formatCurrency(Number(account?.investment_limit))}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm">
                {new Date(account?.last_updated).toLocaleString()}
              </span>
            </div>
            {account?.has_reached_investment_limit && (
              <div className="rounded-md bg-yellow-50 p-3">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Investment Limit Reached
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        You have reached your investment limit. Please contact
                        support for assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
