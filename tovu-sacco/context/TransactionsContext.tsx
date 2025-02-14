"use client"
import { createContext, useContext, ReactNode, useEffect } from 'react';
import useApi from '@/hooks/useApi';
import { api , handleApiError } from '@/utils/api';
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import {
  BaseTransaction,
  TransferTransaction,
  WithdrawalTransaction,
  RefundTransaction,
  DepositTransaction,
  LoanTransaction,
  InvestmentTransaction,
  SavingTransaction,
  MinimumSharesDepositTransaction,
  AuditTransaction,
} from '@/types/transactions';

import {
  TRANSFER_URL,
  WITHDRAWAL_URL,
  REFUND_URL,
  DEPOSIT_URL,
  LOAN_TRANSACTION_URL,
  INVESTMENT_TRANSACTION_URL,
  SAVING_TRANSACTION_URL,
  MINIMUM_SHARES_DEPOSIT_URL,
  AUDIT_TRANSACTION_URL,
  TRANSACTION_STATUS_URL,
} from '@/handler/apiConfig';
interface ApiErrorResponse {
  detail?: string;
  [key: string]: unknown;
}
type TransactionType = "deposit" | "withdraw" | "loan" | "investment" | "savings" | "minimumShares";

interface TransactionsContextProps {
  transfers: TransferTransaction[];
  withdrawals: WithdrawalTransaction[];
  refunds: RefundTransaction[];
  deposits: DepositTransaction[];
  loans: LoanTransaction[];
  investments: InvestmentTransaction[];
  savings: SavingTransaction[];
  minimumSharesDeposits: MinimumSharesDepositTransaction[];
  audits: AuditTransaction[];
  loading: boolean;
  error: string | null;
  fetchTransfers: () => void;
  fetchWithdrawals: () => void;
  fetchRefunds: () => void;
  fetchDeposits: () => void;
  fetchLoans: () => void;
  fetchInvestments: () => void;
  fetchSavings: () => void;
  fetchMinimumSharesDeposits: () => void;
  fetchAudits: () => void;
  createTransaction: (url: string, data: Partial<BaseTransaction>) => void;
  updateTransaction: (url: string, id: number, data: Partial<BaseTransaction>) => void;
  deleteTransaction: (url: string, id: number) => void;
  initiateDepositPayment: (data: { payment_method: string; phone_number: string; amount: number; description: string; account_id: string ,transaction_type: string}) => Promise<string|undefined>;
  initiateWithdrawal: (data: { payment_method: string; phone_number: string; amount: number; description: string; account_id: string ,transaction_type: string }) => Promise<void>;
  initiateMinimumSharesDepositPayment: (data: { payment_method: string; phone_number: string; amount: number; description: string; account_id: string }) => Promise<void>;
  depositToSavings: (data: { goal_id: number; amount: number; description: string; account_id: string }) => Promise<string|undefined>;
  withdrawFromSavings: (data: { goal_id: number; amount: number; description: string; account_id: string }) => Promise<void>;
  payLoan: (data: { payment_method: string; phone_number: string; amount: number; description: string; loan_id: string; account_id?: string }) => Promise<string|undefined>;
  depositToInvestment: (data: { investment_id: number; amount: number; description: string; account_id: string }) => Promise<void>;
  withdrawFromInvestment: (data: { investment_id: number; amount: number; description: string; account_id: string }) => Promise<void>;
  fetchTransactionByType: (url: string,transactionType: TransactionType) => Promise< Partial<BaseTransaction>[]|undefined>;

  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const TransactionsContext = createContext<TransactionsContextProps | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: transfers,
    loading,
    error,
    fetchData: fetchTransfers,
    addItem: createTransfer,
    updateItem: updateTransfer,
    deleteItem: deleteTransfer,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setPageSize,
  } = useApi<TransferTransaction>(TRANSFER_URL);

  const {
    data: withdrawals,
    fetchData: fetchWithdrawals,
    addItem: createWithdrawal,
    updateItem: updateWithdrawal,
    deleteItem: deleteWithdrawal,
  } = useApi<WithdrawalTransaction>(WITHDRAWAL_URL);

  const {
    data: refunds,
    fetchData: fetchRefunds,
    addItem: createRefund,
    updateItem: updateRefund,
    deleteItem: deleteRefund,
  } = useApi<RefundTransaction>(REFUND_URL);

  const {
    data: deposits,
    fetchData: fetchDeposits,
    addItem: createDeposit,
    updateItem: updateDeposit,
    deleteItem: deleteDeposit,
  } = useApi<DepositTransaction>(DEPOSIT_URL);

  const {
    data: loans,
    fetchData: fetchLoans,
    addItem: createLoanTransaction,
    updateItem: updateLoanTransaction,
    deleteItem: deleteLoanTransaction,
  } = useApi<LoanTransaction>(LOAN_TRANSACTION_URL);

  const {
    data: investments,
    fetchData: fetchInvestments,
    addItem: createInvestmentTransaction,
    updateItem: updateInvestmentTransaction,
    deleteItem: deleteInvestmentTransaction,
  } = useApi<InvestmentTransaction>(INVESTMENT_TRANSACTION_URL);

  const {
    data: savings,
    fetchData: fetchSavings,
    addItem: createSavingTransaction,
    updateItem: updateSavingTransaction,
    deleteItem: deleteSavingTransaction,
  } = useApi<SavingTransaction>(SAVING_TRANSACTION_URL);

  const {
    data: minimumSharesDeposits,
    fetchData: fetchMinimumSharesDeposits,
    addItem: createMinimumSharesDeposit,
    updateItem: updateMinimumSharesDeposit,
    deleteItem: deleteMinimumSharesDeposit,
  } = useApi<MinimumSharesDepositTransaction>(MINIMUM_SHARES_DEPOSIT_URL);

  const {
    data: audits,
    fetchData: fetchAudits,
    addItem: createAuditTransaction,
    updateItem: updateAuditTransaction,
    deleteItem: deleteAuditTransaction,
  } = useApi<AuditTransaction>(AUDIT_TRANSACTION_URL);

  // Generic transaction handling
  const createTransaction = (transaction_type: string, data: Partial<BaseTransaction>) => {
    switch (transaction_type) {
      case 'transfer':
        return createTransfer(data as Partial<TransferTransaction>);
      case 'withdraw':
        return createWithdrawal(data as Partial<WithdrawalTransaction>);
      case 'refund':
        return createRefund(data as Partial<RefundTransaction>);
      case 'deposit':
        return createDeposit(data as Partial<DepositTransaction>);
      case 'loan':
        return createLoanTransaction(data as Partial<LoanTransaction>);
      case 'investment':
        return createInvestmentTransaction(data as Partial<InvestmentTransaction>);
      case 'saving':
        return createSavingTransaction(data as Partial<SavingTransaction>);
      // case MINIMUM_SHARES_DEPOSIT_URL:
      //   return createMinimumSharesDeposit(data as Partial<MinimumSharesDepositTransaction>);
      // case AUDIT_TRANSACTION_URL:
      //   return createAuditTransaction(data as Partial<AuditTransaction>);
      default:
        console.error("Invalid transaction type");
    }
  };

  const updateTransaction = (transaction_type: string, id: number, data: Partial<BaseTransaction>) => {
    switch (transaction_type) {
      case 'transfer':
        return updateTransfer(id, data as Partial<TransferTransaction>);
      case 'withdraw':
        return updateWithdrawal(id, data as Partial<WithdrawalTransaction>);
      case 'refund':
        return updateRefund(id, data as Partial<RefundTransaction>);
      case 'deposit':
        return updateDeposit(id, data as Partial<DepositTransaction>);
      case 'loan':
        return updateLoanTransaction(id, data as Partial<LoanTransaction>);
      case 'investment':
        return updateInvestmentTransaction(id, data as Partial<InvestmentTransaction>);
      case 'saving':
        return updateSavingTransaction(id, data as Partial<SavingTransaction>);
      // case MINIMUM_SHARES_DEPOSIT_URL:
      //   return updateMinimumSharesDeposit(id, data as Partial<MinimumSharesDepositTransaction>);
      // case AUDIT_TRANSACTION_URL:
      //   return updateAuditTransaction(id, data as Partial<AuditTransaction>);
      default:
        console.error("Invalid transaction type");
    }
  };

  const deleteTransaction = (transaction_type: string, id: number) => {
    switch (transaction_type) {
      case'transfer':
        return deleteTransfer(id);
      case 'withdrawal' :
        return deleteWithdrawal(id);
      case 'refund':
        return deleteRefund(id);
      case 'deposit':
        return deleteDeposit(id);
      case 'loan':
        return deleteLoanTransaction(id);
      case 'investment':
        return deleteInvestmentTransaction(id);
      case 'saving':
        return deleteSavingTransaction(id);
      // case MINIMUM_SHARES_DEPOSIT_URL:
      //   return deleteMinimumSharesDeposit(id);
      // case AUDIT_TRANSACTION_URL:
      //   return deleteAuditTransaction(id);
      default:
        console.error("Invalid transaction type");
        throw new Error("Invalid transaction type");
    }
  };
  const fetchTransactionByType = async (transactionId: string, transactionType: TransactionType) => {
    let url = "";
    
    switch (transactionType) {
      case "deposit":
        url = `${DEPOSIT_URL}/?transaction_id=${transactionId}`;
        break;
      case "withdraw":
        url = `${WITHDRAWAL_URL}/?transaction_id=${transactionId}`;
        break;
      case "loan":
        url = `${LOAN_TRANSACTION_URL}/?transaction_id=${transactionId}`;
        break;
      case "investment":
        url = `${INVESTMENT_TRANSACTION_URL}/?transaction_id=${transactionId}`;
        break;
      case "savings":
        url = `${SAVING_TRANSACTION_URL}/?transaction_id=${transactionId}`;
        break;
      case "minimumShares":
        url = `${MINIMUM_SHARES_DEPOSIT_URL}/?transaction_id=${transactionId}`;
        break;
      default:
        throw new Error(`Unknown transaction type: ${transactionType}`);
    }
  
    try {
      const response = await api.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      return null;
    }
  };
  
  const initiateDepositPayment = async (data: {
    payment_method: string;
    phone_number: string;
    amount: number;
    description: string;
    account_id: string;
    transaction_type: string;
  }): Promise<string | undefined> => {
    try {
      const response = await api.post(`${DEPOSIT_URL}initiate_payment/`, data);
      return response.data.transaction_id;
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
      throw error;
    }
  };
  
  const initiateWithdrawal = async (data: {
    payment_method: string;
    phone_number: string;
    amount: number;
    description: string;
    account_id: string;
    transaction_type: string;
  }): Promise<void> => {
    try {
      await api.post(`${WITHDRAWAL_URL}initiate/`, data);
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
      throw error;
    }
  };
  
  const initiateMinimumSharesDepositPayment = async (data: {
    payment_method: string;
    phone_number: string;
    amount: number;
    description: string;
    account_id: string;
  }): Promise<void> => {
    try {
      await api.post(`${MINIMUM_SHARES_DEPOSIT_URL}initiate_payment/`, data);
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
      throw error;
    }
  };
  
  const depositToSavings = async (data: {
    goal_id: number;
    amount: number;
    description: string;
    account_id: string;
  }): Promise<string | undefined> => {
    try {
      const response = await api.post<string>(`${SAVING_TRANSACTION_URL}deposit/`, data);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
      throw error;
    }
  };
  
  const withdrawFromSavings = async (data: {
    goal_id: number;
    amount: number;
    description: string;
    account_id: string;
  }): Promise<void> => {
    try {
      await api.post(`${SAVING_TRANSACTION_URL}withdraw/`, data);
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
      throw error;
    }
  };
  
  const payLoan = async (data: {
    payment_method: string;
    phone_number: string;
    amount: number;
    description: string;
    loan_id: string;
    account_id?: string;
  }): Promise<string | undefined> => {
    try {
      const response = await api.post<string>(`${LOAN_TRANSACTION_URL}repay/`, data);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
      throw error;
    }
  };
  
  const depositToInvestment = async (data: {
    investment_id: number;
    amount: number;
    description: string;
    account_id: string;
  }): Promise<void> => {
    try {
      await api.post(`${INVESTMENT_TRANSACTION_URL}deposit/`, data);
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
      throw error;
    }
  };
  
  const withdrawFromInvestment = async (data: {
    investment_id: number;
    amount: number;
    description: string;
    account_id: string;
  }): Promise<void> => {
    try {
      await api.post(`${INVESTMENT_TRANSACTION_URL}withdraw/`, data);
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
      throw error;
    }
  };
  
  return (
    <TransactionsContext.Provider
      value={{
        transfers,
        withdrawals,
        refunds,
        deposits,
        loans,
        investments,
        savings,
        minimumSharesDeposits,
        audits,
        loading,
        error,
        fetchTransfers,
        fetchWithdrawals,
        fetchRefunds,
        fetchDeposits,
        fetchLoans,
        fetchInvestments,
        fetchSavings,
        fetchMinimumSharesDeposits,
        fetchAudits,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        initiateDepositPayment,
        initiateWithdrawal,
        initiateMinimumSharesDepositPayment,
        depositToSavings,
        withdrawFromSavings,
        payLoan,
        depositToInvestment,
        withdrawFromInvestment,
        fetchTransactionByType,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        setPageSize,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

// Custom hook to use TransactionsContext
export const useTransactions = (): TransactionsContextProps => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};
