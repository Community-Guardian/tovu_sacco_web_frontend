"use client";

import { useState, useCallback } from "react";
import { useLoans } from "@/context/LoansContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface LoanRepaymentProps {
  loanId: number;
}

export default function LoanRepayment({ loanId }: LoanRepaymentProps) {
  const { createLoanRepayment } = useLoans();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");

  const handleRepay = useCallback(() => {
    const parsedAmount = parseFloat(amount);

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid repayment amount.",
        variant: "destructive",
      });
      return;
    }

    createLoanRepayment({ loan: loanId, amount: parsedAmount })
      .then(() => {
        toast({
          title: "Payment Successful",
          description: `You have repaid KES ${parsedAmount.toLocaleString()}`,
        });
        setAmount("");
      })
      .catch(() => {
        toast({
          title: "Payment Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      });
  }, [amount, createLoanRepayment, loanId, toast]);

  return (
    <div className="mt-6 border-t border-border pt-6">
      <h3 className="text-lg font-semibold text-primary">Repay Loan</h3>
      <div className="flex items-center gap-4 mt-3">
        <Input
          type="number"
          placeholder="Enter amount (KES)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-muted border-border text-foreground"
        />
        <Button onClick={handleRepay} className="bg-primary hover:bg-primary/80 text-primary-foreground">
          Repay Now
        </Button>
      </div>
    </div>
  );
}
