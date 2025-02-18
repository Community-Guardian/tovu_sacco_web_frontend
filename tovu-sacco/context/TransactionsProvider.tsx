import React, { createContext, useContext, useState } from "react";
import PaymentModal from "@/components/payments/PaymentsModal";

type TransactionType = "deposit" | "withdraw" | "loan" | "investment" | "savings" | "minimumShares";

interface TransactionData {
  type: TransactionType;
  extraData?: any;
  isOpen: boolean;
}

interface TransactionsContextType {
  openTransactionModal: (type: TransactionType, extraData?: any) => void;
  closeTransactionModal: () => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transaction, setTransaction] = useState<TransactionData | null>(null);

  const openTransactionModal = (type: TransactionType, extraData?: any) => {
    setTransaction({ type, extraData, isOpen: true });
  };

  const closeTransactionModal = () => {
    setTransaction(null);
  };

  return (
    <TransactionsContext.Provider value={{ openTransactionModal, closeTransactionModal }}>
      {children}

      {transaction?.isOpen && (
        <PaymentModal
          transactionType={transaction.type}
          accountId={transaction.extraData?.accountId || ""}
          extraId={transaction.extraData?.investmentId || transaction.extraData?.goalId || ""}
          isOpen={transaction.isOpen}
          onClose={closeTransactionModal}
        />
      )}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
};
