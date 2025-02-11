"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const activeLoans = [
  { id: 1, name: "Personal Loan", remainingAmount: 30000 },
  { id: 2, name: "Business Loan", remainingAmount: 100000 },
]

export function RepayLoanForm() {
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission
    console.log("Loan repayment submitted")
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800">Repay Loan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loan-select" className="text-green-700">
              Select Loan
            </Label>
            <Select onValueChange={(value) => setSelectedLoan(Number.parseInt(value))}>
              <SelectTrigger id="loan-select" className="border-green-300 focus:ring-green-500">
                <SelectValue placeholder="Select a loan to repay" />
              </SelectTrigger>
              <SelectContent>
                {activeLoans.map((loan) => (
                  <SelectItem key={loan.id} value={loan.id.toString()}>
                    {loan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedLoan && (
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-green-700">
                Repayment Amount
              </Label>
              <Input
                id="amount"
                type="number"
                min={1}
                max={activeLoans.find((l) => l.id === selectedLoan)?.remainingAmount}
                required
                className="border-green-300 focus:ring-green-500"
              />
            </div>
          )}
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Submit Repayment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

