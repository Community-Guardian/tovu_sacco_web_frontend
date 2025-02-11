"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LoanType {
  id: number
  name: string
  interest_rate: string
  min_amount: string
  max_amount: string
  max_duration_months: number
  requirements: any[]
}

const loanTypes: LoanType[] = [
  {
    id: 1,
    name: "Personal Loan",
    interest_rate: "15.5",
    min_amount: "10000",
    max_amount: "500000",
    max_duration_months: 24,
    requirements: [],
  },
  // Add more dummy data as needed
]

export function ApplyLoanForm() {
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission
    console.log("Loan application submitted")
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800">Apply for a Loan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loan-type" className="text-green-700">
              Loan Type
            </Label>
            <Select
              onValueChange={(value) =>
                setSelectedLoanType(loanTypes.find((lt) => lt.id === Number.parseInt(value)) || null)
              }
            >
              <SelectTrigger id="loan-type" className="border-green-300 focus:ring-green-500">
                <SelectValue placeholder="Select loan type" />
              </SelectTrigger>
              <SelectContent>
                {loanTypes.map((loanType) => (
                  <SelectItem key={loanType.id} value={loanType.id.toString()}>
                    {loanType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedLoanType && (
            <>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-green-700">
                  Amount (KES {selectedLoanType.min_amount} - {selectedLoanType.max_amount})
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min={Number.parseInt(selectedLoanType.min_amount)}
                  max={Number.parseInt(selectedLoanType.max_amount)}
                  required
                  className="border-green-300 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-green-700">
                  Duration (months, max {selectedLoanType.max_duration_months})
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  max={selectedLoanType.max_duration_months}
                  required
                  className="border-green-300 focus:ring-green-500"
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

