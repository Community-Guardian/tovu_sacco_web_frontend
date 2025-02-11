"use client"

import { useEffect, useState } from "react"
import { useInvestments } from "@/context/InvestmentsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { InvestDialog } from "./invest-dialog"
import { AlertCircle, Calendar, DollarSign, Percent } from 'lucide-react'
import { formatCurrency } from "@/lib/utils"
import type { Investment } from "@/types/investments"

export function InvestmentsList() {
  const {
    investments,
    investmentTypes,
    loading,
    error,
    fetchInvestments,
    fetchInvestmentTypes,
  } = useInvestments()

  const [search, setSearch] = useState("")
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(
    null
  )
  const [showInvestDialog, setShowInvestDialog] = useState(false)

  useEffect(() => {
    fetchInvestments()
    fetchInvestmentTypes()
  }, []) // Added dependencies

  const filteredInvestments = investments.filter((investment) =>
    investmentTypes
      .find((type) => type.id === investment.investment_type)
      ?.name.toLowerCase()
      .includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
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
            Failed to load available investments
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search investments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredInvestments.map((investment) => {
          const investmentType = investmentTypes.find(
            (type) => type.id === investment.investment_type
          )
          const progressValue =
          Number(investment.amount_invested) === 0
            ? 0
            : (Number(investment.current_value ?? 0) /
                Number(investment.amount_invested ?? 1)) *
              100;

          return (
            <Card key={investment.id}>
              <CardHeader>
                <CardTitle>{investmentType?.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Amount</span>
                  </div>
                  <span>{formatCurrency(Number(investment.amount_invested))}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">ROI</span>
                  </div>
                  <span
                    className={
                      Number(investment.return_on_investment) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {investment.return_on_investment}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Maturity</span>
                  </div>
                  <span>
                    {investment.maturity_date
                      ? new Date(investment.maturity_date).toLocaleDateString()
                      : "No maturity date"}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progressValue.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressValue} />
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedInvestment(investment)
                    setShowInvestDialog(true)
                  }}
                  disabled={!investment.is_active}
                >
                  Invest Now
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedInvestment && (
        <InvestDialog
          investment={selectedInvestment}
          open={showInvestDialog}
          onOpenChange={setShowInvestDialog}
        />
      )}
    </div>
  )
}
