"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTransactions } from "@/context/TransactionsContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation Schema
const paymentSchema = z.object({
  payment_method: z.enum(["mpesa", "paypal", "bank_transfer", "in-house"]),
  phone_number: z.string().min(10, "Invalid phone number").optional(),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  description: z.string().optional(),
  account_id: z.string().min(1, "Account ID is required"),
  extra_id: z.string().optional(),
});

// Transaction Types
type TransactionType = "deposit" | "withdraw" | "loan" | "investment" | "savings" | "minimumShares";

// Payment Modal Props
interface PaymentModalProps {
  transactionType: TransactionType;
  accountId: string;
  extraId?: string;
  isOpen: boolean;
  onClose: () => void;
}
const PaymentModal: React.FC<PaymentModalProps> = ({ transactionType, accountId, extraId, isOpen, onClose }) => {
  const { toast } = useToast();
  const {
    initiateDepositPayment,
    initiateWithdrawal,
    payLoan,
    depositToSavings,
    depositToInvestment,
    initiateMinimumSharesDepositPayment,
    fetchTransactionByType,
  } = useTransactions();

  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payment_method: "mpesa",
      phone_number: "",
      amount: 1,
      account_id: accountId || "",
      extra_id: extraId || "",
    },
  });

  const selectedMethod = watch("payment_method");

  const handleTransaction = async (data: any) => {
    setLoading(true);
    let response;

    try {
      switch (transactionType) {
        case "deposit":
          response = await initiateDepositPayment(data);
          break;
        case "withdraw":
          response = await initiateWithdrawal(data);
          break;
        case "loan":
          response = await payLoan(data);
          break;
        case "investment":
          response = await depositToInvestment({ ...data, investmentId: extraId });
          break;
        case "savings":
          response = await depositToSavings({ ...data, goal: extraId });
          break;
        case "minimumShares":
          response = await initiateMinimumSharesDepositPayment(data);
          break;
        default:
          toast({ title: "Error", description: "Invalid transaction type.", variant: "destructive" });
          setLoading(false);
          return;
      }

      if (response) {
        setTransactionId(response);
        toast({ title: "Transaction Initiated", description: "Waiting for confirmation..." });
        setCheckingStatus(true);
      } else {
        toast({ title: "Error", description: "Transaction initiation failed.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Transaction failed. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Polling Transaction Status
  useEffect(() => {
    if (!checkingStatus || !transactionId) return;

    let status = "pending";
    const timeout = Date.now() + 30000;
    let retries = 0;

    const interval = setInterval(async () => {
      if (Date.now() > timeout) {
        toast({ title: "Timeout", description: "Transaction confirmation took too long.", variant: "destructive" });
        setCheckingStatus(false);
        clearInterval(interval);
        return;
      }

      retries++;
      try {
        const transaction = await fetchTransactionByType(transactionId, transactionType);
        status = transaction?.[0]?.status || "pending";

        if (status === "completed") {
          toast({ title: "Success", description: "Transaction completed successfully!" });
          setCheckingStatus(false);
          clearInterval(interval);
          onClose();
        } else if (status === "failed") {
          toast({ title: "Failed", description: "Transaction failed. Please try again.", variant: "destructive" });
          setCheckingStatus(false);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [checkingStatus, transactionId, transactionType, fetchTransactionByType, toast, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {transactionType === "deposit" && "Deposit Funds"}
            {transactionType === "withdraw" && "Withdraw Funds"}
            {transactionType === "loan" && "Pay Loan"}
            {transactionType === "investment" && "Invest Funds"}
            {transactionType === "savings" && "Deposit to Savings"}
            {transactionType === "minimumShares" && "Deposit Minimum Shares"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleTransaction)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Payment Method</label>
            <select {...register("payment_method")} className="w-full mt-1 border rounded-md p-2">
              <option value="mpesa">M-Pesa</option>
              <option value="in-house">In-House</option>
            </select>
          </div>

          {selectedMethod === "mpesa" && (
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input type="text" placeholder="Enter Phone Number" {...register("phone_number")} />
              {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number.message}</p>}
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Amount (KSh)</label>
            <Input type="number" placeholder="Enter Amount" {...register("amount", { valueAsNumber: true })} />
            {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
          </div>

          <Button type="submit" disabled={loading || checkingStatus} className="w-full">
            {loading ? "Processing..." : "Proceed"}
          </Button>

          {checkingStatus && <p className="text-blue-600 mt-4">Checking transaction status...</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
