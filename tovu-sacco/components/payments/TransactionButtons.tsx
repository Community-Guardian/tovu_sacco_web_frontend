import React from "react";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/context/TransactionsProvider"; // Using global context

type TransactionType = "deposit" | "withdraw" | "loan" | "investment" | "savings" | "minimumShares";

interface TransactionButtonProps {
  type: TransactionType;
  label: string;
  extraData?: any;
}

const TransactionButton: React.FC<TransactionButtonProps> = ({ type, label, extraData }) => {
  const { openTransactionModal } = useTransactions();

  return (
    <Button onClick={() => openTransactionModal(type, extraData)}>
      {label}
    </Button>
  );
};

// Individual Buttons
export const DepositButton: React.FC<{ accountId: string }> = ({ accountId }) => (
  <TransactionButton type="deposit" label="Deposit" extraData={{ accountId }} />
);

export const WithdrawButton: React.FC<{ accountId: string }> = ({ accountId }) => (
  <TransactionButton type="withdraw" label="Withdraw" extraData={{ accountId }} />
);

export const LoanPaymentButton: React.FC<{ accountId: string }> = ({ accountId }) => (
  <TransactionButton type="loan" label="Pay Loan" extraData={{ accountId }} />
);

export const InvestButton: React.FC<{ investmentId: string,accountId: string  }> = ({ investmentId }) => (
  <TransactionButton type="investment" label="Invest" extraData={{ investmentId,accountId }} />
);

export const SaveToGoalButton: React.FC<{ goal: string; accountId: string }> = ({ goal, accountId }) => (
  <TransactionButton type="savings" label="Save to Goal" extraData={{ goal, accountId }} />
);

export const MinimumSharesButton: React.FC<{ accountId: string }> = ({ accountId }) => (
  <TransactionButton type="minimumShares" label="Deposit Minimum Shares" extraData={{ accountId }} />
);

