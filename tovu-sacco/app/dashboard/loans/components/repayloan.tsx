"use client";
import { useState } from "react";
import { useLoans } from "@/context/LoansContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoanRepaymentProps {
  loanId: number;
}

export default function LoanRepayment({ loanId }: LoanRepaymentProps) {
  const { createLoanRepayment } = useLoans();
  const [amount, setAmount] = useState("");

  const handleRepay = () => {
    if (!amount) return alert("Enter a valid amount");
    createLoanRepayment({ loan_id: loanId, amount: parseFloat(amount) });
    setAmount("");
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-green-700 font-semibold">Repay Loan</h3>
      <Input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mt-2"
      />
      <Button onClick={handleRepay} className="mt-2 bg-green-600 hover:bg-green-700 text-white">Repay Now</Button>
    </div>
  );
}
