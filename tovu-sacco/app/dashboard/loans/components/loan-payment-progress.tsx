import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const loanPayments = [
  {
    id: 1,
    loanId: 1,
    totalAmount: 45000,
    paidAmount: 15000,
    dueDate: "2024-05-20",
  },
  // Add more dummy data as needed
]

export function LoanPaymentProgress() {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800">Loan Payment Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {loanPayments.map((payment) => (
          <div key={payment.id} className="space-y-2">
            <div className="flex justify-between text-green-800">
              <span>Loan #{payment.loanId}</span>
              <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
            </div>
            <Progress
              value={(payment.paidAmount / payment.totalAmount) * 100}
              className="bg-green-200 [&>div]:bg-green-500"
            />
            <div className="flex justify-between text-sm text-green-600">
              <span>Paid: KES {payment.paidAmount.toFixed(2)}</span>
              <span>Total: KES {payment.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

