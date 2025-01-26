import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 12,234.00</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loans</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 8,345.23</div>
            <p className="text-xs text-muted-foreground">-4.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investments</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 24,652.66</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Deposit",
                  amount: "+ KES 2,500.00",
                  date: "2024-01-25",
                  type: "credit",
                },
                {
                  title: "Loan Payment",
                  amount: "- KES 1,200.00",
                  date: "2024-01-24",
                  type: "debit",
                },
                {
                  title: "Investment Return",
                  amount: "+ KES 450.00",
                  date: "2024-01-23",
                  type: "credit",
                },
              ].map((transaction) => (
                <div key={transaction.date} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{transaction.title}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      transaction.type === "credit" ? "text-green-500" : "text-red-500",
                    )}
                  >
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Investment Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Fixed Deposit",
                  amount: "KES 15,000.00",
                  return: "8.5%",
                },
                {
                  title: "Savings Plus",
                  amount: "KES 7,500.00",
                  return: "6.2%",
                },
                {
                  title: "Holiday Fund",
                  amount: "KES 2,152.66",
                  return: "5.0%",
                },
              ].map((investment) => (
                <div key={investment.title} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{investment.title}</p>
                    <p className="text-xs text-green-500">Return: {investment.return}</p>
                  </div>
                  <div className="text-sm font-medium">{investment.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

