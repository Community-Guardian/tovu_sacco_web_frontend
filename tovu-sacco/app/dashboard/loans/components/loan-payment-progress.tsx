"use client";

import { useLoans } from "@/context/LoansContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";

export function LoanPaymentProgress() {
  const { loanApplications:userLoans, loanRepayments, loading } = useLoans();
  const { user } = useAuth();

  if (loading) return <p className="text-primary">Loading loan payments...</p>;
  if (!userLoans.length) return <p>No active loan payments found.</p>;

  return (
    <Card className="bg-muted border-border">
      <CardHeader>
        <CardTitle className="text-primary">Loan Payment Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {userLoans.map((loan) => {
          const repayments = loanRepayments.filter((rep) => rep.loan === loan.id);
          const totalPaid = repayments.reduce((sum, rep) => sum + rep.amount, 0);
          const progress = (totalPaid / Number.parseFloat(loan.amount_approved as string)) * 100;

          return (
            <div key={loan.id} className="space-y-2">
              <div className="flex justify-between text-foreground">
                <span>Loan #{loan.id}</span>
                <span>Due: {dayjs(loan.due_date).format("DD MMM YYYY")}</span>
              </div>
              <Progress value={progress} className="bg-muted [&>div]:bg-primary" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Paid: {formatCurrency(totalPaid)}</span>
                <span>Total: {formatCurrency(Number.parseInt(loan.amount_approved as string ))}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
