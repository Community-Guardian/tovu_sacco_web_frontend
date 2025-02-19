"use client";

import { useEffect, useCallback } from "react";
import { useLoans } from "@/context/LoansContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { LoanPaymentButton } from "@/components/payments/TransactionButtons"; 

// Dynamic status styling
const statusStyles: Record<string, string> = {
  Approved: "text-primary bg-primary/10 border-primary",
  Pending: "text-yellow-600 bg-yellow-100 border-yellow-300",
  Rejected: "text-destructive bg-destructive/10 border-destructive",
};

interface LoanDetailsProps {
  loanId: number;
  onBack: () => void;
}

export default function LoanDetails({ loanId, onBack }: LoanDetailsProps) {
  const { loanApplications, fetchLoanRepayments, loanRepayments, loading, error } = useLoans();
  const { toast } = useToast();
  const loan = loanApplications.find((l) => l.id === loanId);

  // Fetch loan repayments when the component mounts
  const fetchRepayments = useCallback(() => {
    fetchLoanRepayments();
  }, [fetchLoanRepayments]);

  useEffect(() => {
    fetchRepayments();
  }, [fetchRepayments]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load loan details. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (!loan) return <p className="text-destructive text-center">Loan not found.</p>;

  return (
    <Card className="bg-card border border-border shadow-lg rounded-lg p-6">
      <CardHeader>
        <CardTitle className="text-primary text-xl font-semibold">{loan.loan_type} Details</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          // Skeleton loader while fetching data
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-6 w-full rounded-md bg-muted" />
            ))}
          </div>
        ) : (
          <>
            {/* Loan Details */}
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <span className="font-semibold">Amount Approved:</span> {formatCurrency(loan.amount_approved as number)}
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">Interest Rate:</span> {loan.interest_rate}%
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">Due Date:</span> {new Date(loan.due_date).toLocaleDateString()}
              </p>
              <p className={`px-2 py-1 inline-block rounded-md border font-medium ${statusStyles[loan.status] || "text-gray-600 bg-muted border-border"}`}>
                {loan.status}
              </p>
            </div>

            {/* Loan Repayments */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary">Loan Repayments</h3>
              <div className="border rounded-md p-4 bg-muted mt-2">
                {loanRepayments.length > 0 ? (
                  loanRepayments
                    .filter((repay) => repay.id === loanId)
                    .map((repay) => (
                      <p key={repay.id} className="text-muted-foreground text-sm">
                        Paid: <strong>{formatCurrency(repay.amount)}</strong> on{" "}
                        {new Date(repay.payment_date).toLocaleDateString()}
                      </p>
                    ))
                ) : (
                  <p className="text-muted-foreground text-sm">No repayments yet.</p>
                )}
              </div>
            </div>

            {/* Loan Payment Button */}
            <div className="mt-6">
              <LoanPaymentButton />
            </div>

            {/* Back Button */}
            <Button onClick={onBack} className="mt-6 bg-secondary hover:bg-secondary/80 text-secondary-foreground">
              Back
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
