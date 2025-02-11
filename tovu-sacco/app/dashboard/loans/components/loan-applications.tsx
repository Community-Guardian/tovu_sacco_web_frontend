import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LoanApplication {
  id: number
  loan_type: number
  amount_requested: string
  amount_approved: string
  interest_rate: string
  date_requested: string
  date_approved: string
  due_date: string
  status: string
  is_active: boolean
  account: string
  approvee: string
}

const loanApplications: LoanApplication[] = [
  {
    id: 1,
    loan_type: 1,
    amount_requested: "50000",
    amount_approved: "45000",
    interest_rate: "12.5",
    date_requested: "2023-05-15",
    date_approved: "2023-05-20",
    due_date: "2024-05-20",
    status: "Approved",
    is_active: true,
    account: "1234567890",
    approvee: "John Doe",
  },
  // Add more dummy data as needed
]

export function LoanApplications() {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800">My Loan Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-green-100">
              <TableHead className="text-green-800">Loan Type</TableHead>
              <TableHead className="text-green-800">Amount</TableHead>
              <TableHead className="text-green-800">Interest Rate</TableHead>
              <TableHead className="text-green-800">Status</TableHead>
              <TableHead className="text-green-800">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loanApplications.map((loan) => (
              <TableRow key={loan.id} className="border-b border-green-200">
                <TableCell>{loan.loan_type}</TableCell>
                <TableCell>KES {Number.parseFloat(loan.amount_approved || loan.amount_requested).toFixed(2)}</TableCell>
                <TableCell>{loan.interest_rate}%</TableCell>
                <TableCell className="font-medium text-green-700">{loan.status}</TableCell>
                <TableCell>{new Date(loan.due_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

