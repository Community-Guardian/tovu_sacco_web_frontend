"use client"

import { useEffect } from "react"
import { useInvestments } from "@/context/InvestmentsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Clock, DollarSign, Percent } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function InvestmentTypesList() {
  const { investmentTypes, loading, error, fetchInvestmentTypes } = useInvestments()
  console.log(investmentTypes);
  
  useEffect(() => {
    fetchInvestmentTypes()
  }, [])

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
          <p className="text-sm text-destructive">Failed to load investment types</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {investmentTypes.map((type) => (
        <Card key={type.id}>
          <CardHeader>
            <CardTitle>{type.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{type.description}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Investment Range</span>
                </div>
                <span className="text-sm">
                  {formatCurrency(Number(type.minAmount))} - {formatCurrency(Number(type.maxAmount))}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Interest Rate</span>
                </div>
                <span className="text-sm">{type.interestRate}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <span className="text-sm">{type.duration}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

