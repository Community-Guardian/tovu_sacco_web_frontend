import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

const investments = [
  {
    id: "1",
    name: "Fixed Deposit",
    amount: 15000.0,
    return: 8.5,
    maturityDate: "2024-06-25",
    status: "active",
  },
  {
    id: "2",
    name: "Savings Plus",
    amount: 7500.0,
    return: 6.2,
    maturityDate: "2024-03-15",
    status: "active",
  },
  // Add more investments as needed
]

export default function InvestmentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Investments</h2>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          New Investment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {investments.map((investment) => (
          <Card key={investment.id}>
            <CardHeader>
              <CardTitle>{investment.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Invested Amount</p>
                  <p className="text-2xl font-bold">KES {investment.amount.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Return Rate</p>
                    <p className="text-lg font-semibold text-green-500">{investment.return}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Maturity Date</p>
                    <p className="text-lg font-semibold">{investment.maturityDate}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "High Yield Fixed Deposit",
                return: "10.5%",
                period: "12 months",
                minAmount: "KES 50,000",
              },
              {
                name: "Savings Plus Premium",
                return: "8.2%",
                period: "6 months",
                minAmount: "KES 25,000",
              },
              {
                name: "Quick Save",
                return: "6.5%",
                period: "3 months",
                minAmount: "KES 10,000",
              },
            ].map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">{opportunity.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {opportunity.period} • Min: {opportunity.minAmount}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-500">{opportunity.return}</p>
                  <Button size="sm">Invest Now</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

