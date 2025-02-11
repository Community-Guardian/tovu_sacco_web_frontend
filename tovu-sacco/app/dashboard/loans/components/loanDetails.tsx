"use client";
import { useEffect } from "react";
import { useLoans } from "@/context/LoansContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoanRepayment from "./repayloan";

interface LoanDetailsProps {
  loanId: number;
  onBack: () => void;
}

export default function LoanDetails({ loanId, onBack }: LoanDetailsProps) {
  const { loanApplications, fetchLoanRepayments, loanRepayments, loading, error } = useLoans();
  const loan = loanApplications.find((l) => l.id === loanId);

  useEffect(() => {
    fetchLoanRepayments();
  }, [fetchLoanRepayments]);

  if (!loan) return <p className="text-red-500">Loan not found</p>;
  if (loading) return <p className="text-green-700">Loading loan details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const repayments = loanRepayments.filter((repay) => repay.loan_id === loanId);

  return (
    <Card className="bg-white border-green-300 shadow-lg p-4">
      <CardHeader>
        <CardTitle className="text-green-800">{loan.loan_type} Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-green-700">Amount Approved: <strong>KES {loan.amount_approved}</strong></p>
        <p className="text-green-700">Interest Rate: <strong>{loan.interest_rate}%</strong></p>
        <p className="text-green-700">Status: <strong>{loan.status}</strong></p>
        <p className="text-green-700">Due Date: <strong>{new Date(loan.due_date).toLocaleDateString()}</strong></p>

        <h3 className="text-green-700 mt-4 font-semibold">Loan Repayments</h3>
        {repayments.length > 0 ? (
          repayments.map((repay) => (
            <p key={repay.id} className="text-green-600">Paid: KES {repay.amount} on {new Date(repay.date).toLocaleDateString()}</p>
          ))
        ) : (
          <p className="text-gray-500">No repayments yet.</p>
        )}

        <LoanRepayment loanId={loanId} />

        <Button onClick={onBack} className="mt-4 bg-gray-600 hover:bg-gray-700 text-white">Back</Button>
      </CardContent>
    </Card>
  );
}
