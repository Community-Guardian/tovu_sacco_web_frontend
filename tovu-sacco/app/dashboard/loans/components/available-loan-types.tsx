import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LoanType {
  id: number
  name: string
  description: string
  interest_rate: string
  min_amount: string
  max_amount: string
  max_duration_months: number
  requirements: { id: number; name: string }[]
}

const loanTypes: LoanType[] = [
  {
    id: 1,
    name: "Personal Loan",
    description: "For personal expenses and emergencies",
    interest_rate: "15.5",
    min_amount: "10000",
    max_amount: "500000",
    max_duration_months: 24,
    requirements: [
      { id: 1, name: "Valid ID" },
      { id: 2, name: "Proof of Income" },
    ],
  },
  // Add more dummy data as needed
]

export function AvailableLoanTypes() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {loanTypes.map((loanType) => (
        <Card key={loanType.id} className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">{loanType.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600 mb-4">{loanType.description}</p>
            <div className="space-y-2 text-green-700">
              <p>
                Interest Rate: <span className="font-semibold">{loanType.interest_rate}%</span>
              </p>
              <p>
                Amount:{" "}
                <span className="font-semibold">
                  KES {loanType.min_amount} - {loanType.max_amount}
                </span>
              </p>
              <p>
                Max Duration: <span className="font-semibold">{loanType.max_duration_months} months</span>
              </p>
              <div>
                <p className="font-semibold">Requirements:</p>
                <ul className="list-disc list-inside text-sm">
                  {loanType.requirements.map((req) => (
                    <li key={req.id}>{req.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">Apply Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

