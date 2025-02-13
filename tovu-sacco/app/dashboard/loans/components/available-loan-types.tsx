"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoans } from "@/context/LoansContext";
import { useAuth } from "@/context/AuthContext";
import { LoanApplication } from "@/types/loans";
import { useAccounts } from "@/context/AccountsContext";
import { useToast } from "@/components/ui/use-toast";

export function AvailableLoanTypes() {
  const { loanTypes, createLoanApplication, loading, error } = useLoans();
  const { user } = useAuth();
  const { accounts } = useAccounts();
  const { toast } = useToast();

  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);
  const [amountRequested, setAmountRequested] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleApply = (loanTypeId: number) => setSelectedLoan(loanTypeId);

  const handleSubmit = useCallback(async () => {
    const parsedAmount = parseFloat(amountRequested);
    const selectedAccount = accounts.length > 0 ? accounts[0].account_number : null;

    if (!selectedLoan || isNaN(parsedAmount) || parsedAmount <= 0 || !dueDate || !selectedAccount) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields correctly.",
        variant: "destructive",
      });
      return;
    }

    const newLoanApplication: Partial<LoanApplication> = {
      loan_type: selectedLoan,
      amount_requested: parsedAmount,
      date_requested: new Date().toISOString(),
      due_date: dueDate,
      account: selectedAccount,
    };

    try {
      await createLoanApplication(newLoanApplication);
      toast({
        title: "Loan Application Submitted",
        description: `Your request for KES ${parsedAmount.toLocaleString()} has been submitted.`,
      });
      setSelectedLoan(null);
      setAmountRequested("");
      setDueDate("");
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "An error occurred while applying for the loan.",
        variant: "destructive",
      });
    }
  }, [selectedLoan, amountRequested, dueDate, accounts, createLoanApplication, toast]);

  if (loading) return <p className="text-primary">Loading loan types...</p>;
  if (error) return <p className="text-destructive">Error: {error}</p>;
  if (loanTypes.length === 0) return <p>No available loan types.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {loanTypes.map((loanType) => (
        <Card key={loanType.id} className="bg-muted border-border">
          <CardHeader>
            <CardTitle className="text-primary">{loanType.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{loanType.description}</p>
            <div className="space-y-2 text-foreground">
              <p>Interest Rate: <span className="font-semibold">{loanType.interest_rate}%</span></p>
              <p>Amount: <span className="font-semibold">KES {loanType.min_amount} - {loanType.max_amount}</span></p>
              <p>Max Duration: <span className="font-semibold">{loanType.max_duration_months} months</span></p>
              <div>
                <p className="font-semibold">Requirements:</p>
                <ul className="list-disc list-inside text-sm">
                  {loanType.requirements.map((req) => (
                    <li key={req.id}>{req.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button 
              className="w-full mt-4 bg-primary hover:bg-primary/80 text-primary-foreground"
              onClick={() => handleApply(loanType.id)}
            >
              Apply Now
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Loan Application Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4 text-primary">Apply for Loan</h2>
            <label className="block text-sm font-medium text-foreground mb-2">Amount Requested</label>
            <Input
              type="number"
              value={amountRequested}
              onChange={(e) => setAmountRequested(e.target.value)}
              className="mb-4 bg-muted border-border text-foreground"
              placeholder="Enter amount"
            />
            <label className="block text-sm font-medium text-foreground mb-2">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mb-4 bg-muted border-border text-foreground"
            />
            <div className="flex justify-between">
              <Button className="bg-muted hover:bg-muted/80 text-foreground" onClick={() => setSelectedLoan(null)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/80 text-primary-foreground" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
