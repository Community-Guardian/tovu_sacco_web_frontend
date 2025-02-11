"use client";
import { useState, useEffect } from "react";
import { useLoans } from "@/context/LoansContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoanDetails from "./loanDetails";

export function LoanApplications() {
  const { loanApplications, fetchLoanApplications, loading, error } = useLoans();
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);

  useEffect(() => {
    fetchLoanApplications();
  }, [fetchLoanApplications]);

  if (loading) return <p className="text-green-700">Loading loan applications...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800">My Loan Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedLoan ? (
          <LoanDetails loanId={selectedLoan} onBack={() => setSelectedLoan(null)} />
        ) : (
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
              {loanApplications.length > 0 ? (
                loanApplications.map((loan) => (
                  <TableRow key={loan.id} onClick={() => setSelectedLoan(loan.id)} className="cursor-pointer hover:bg-green-100 transition">
                    <TableCell>{loan.loan_type}</TableCell>
                    <TableCell>KES {Number.parseFloat(loan.amount_approved || loan.amount_requested).toFixed(2)}</TableCell>
                    <TableCell>{loan.interest_rate}%</TableCell>
                    <TableCell className="font-medium text-green-700">{loan.status}</TableCell>
                    <TableCell>{new Date(loan.due_date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">No loan applications found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
