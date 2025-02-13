"use client";

import { useState, useEffect, useCallback } from "react";
import { useLoans } from "@/context/LoansContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoanDetails from "./loanDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

// Status color mapping
const statusColors: Record<string, string> = {
  Approved: "text-green-600 bg-green-100",
  Pending: "text-yellow-600 bg-yellow-100",
  Rejected: "text-red-600 bg-red-100",
};

export function LoanApplications() {
  const { loanApplications, fetchLoanApplications, loading, error } = useLoans();
  const { toast } = useToast();
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);

  // Fetch loans only when the component mounts
  const fetchLoans = useCallback(() => {
    fetchLoanApplications();
  }, [fetchLoanApplications]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load loan applications. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <Card className="bg-muted border rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle className="text-primary">My Loan Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedLoan ? (
          <LoanDetails loanId={selectedLoan} onBack={() => setSelectedLoan(null)} />
        ) : (
          <>
            {loading ? (
              // Skeleton loader for smooth UI experience
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full rounded-md bg-muted-foreground/10" />
                ))}
              </div>
            ) : loanApplications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead className="text-primary">Loan Type</TableHead>
                    <TableHead className="text-primary">Amount (KES)</TableHead>
                    <TableHead className="text-primary">Interest Rate</TableHead>
                    <TableHead className="text-primary">Status</TableHead>
                    <TableHead className="text-primary">Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loanApplications.map((loan) => (
                    <TableRow
                      key={loan.id}
                      onClick={() => setSelectedLoan(loan.id)}
                      className="cursor-pointer hover:bg-muted transition-all rounded-md"
                    >
                      <TableCell>{loan.loan_type}</TableCell>
                      <TableCell>{Number.parseFloat(loan.amount_approved as string || loan.amount_requested as string ).toFixed(2)}</TableCell>
                      <TableCell>{loan.interest_rate}%</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-sm font-medium ${statusColors[loan.status] || "text-gray-600 bg-gray-100"}`}>
                          {loan.status}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(loan.due_date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500">No loan applications found.</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
