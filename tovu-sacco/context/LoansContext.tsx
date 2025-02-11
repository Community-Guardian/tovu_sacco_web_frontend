"use client"
import { createContext, useContext, ReactNode, useEffect } from 'react';
import useApi from '@/hooks/useApi';
import {
  LoanType,
  LoanApplication,
  LoanRepayment,
  LoanRequirement,
  UserLoanRequirement,
} from '@/types/loans';
import {
  LOAN_TYPES_URL,
  LOANS_URL,
  LOAN_REQUIREMENTS_URL,
  LOAN_PAYMENTS_URL,
  USER_LOAN_REQUIREMENTS_URL,
} from '@/handler/apiConfig';

interface LoansContextProps {
  loanTypes: LoanType[];
  loanApplications: LoanApplication[];
  loanRepayments: LoanRepayment[];
  loanRequirements: LoanRequirement[];
  userLoanRequirements: UserLoanRequirement[];
  loading: boolean;
  error: string | null;
  fetchLoanTypes: () => void;
  fetchLoanApplications: () => void;
  fetchLoanRepayments: () => void;
  fetchLoanRequirements: () => void;
  fetchUserLoanRequirements: () => void;
  createLoanType: (data: Partial<LoanType>) => void;
  updateLoanType: (id: number, data: Partial<LoanType>) => void;
  deleteLoanType: (id: number) => void;
  createLoanApplication: (data: Partial<LoanApplication>) => void;
  updateLoanApplication: (id: number, data: Partial<LoanApplication>) => void;
  deleteLoanApplication: (id: number) => void;
  createLoanRepayment: (data: Partial<LoanRepayment>) => void;
  updateLoanRepayment: (id: number, data: Partial<LoanRepayment>) => void;
  deleteLoanRepayment: (id: number) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const LoansContext = createContext<LoansContextProps | undefined>(undefined);

export const LoansProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: loanTypes,
    loading,
    error,
    fetchData: fetchLoanTypes,
    addItem: createLoanType,
    updateItem: updateLoanType,
    deleteItem: deleteLoanType,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setPageSize,
  } = useApi<LoanType>(LOAN_TYPES_URL);

  const {
    data: loanApplications,
    fetchData: fetchLoanApplications,
    addItem: createLoanApplication,
    updateItem: updateLoanApplication,
    deleteItem: deleteLoanApplication,
  } = useApi<LoanApplication>(LOANS_URL);

  const {
    data: loanRepayments,
    fetchData: fetchLoanRepayments,
    addItem: createLoanRepayment,
    updateItem: updateLoanRepayment,
    deleteItem: deleteLoanRepayment,
  } = useApi<LoanRepayment>(LOAN_PAYMENTS_URL);

  const {
    data: loanRequirements,
    fetchData: fetchLoanRequirements,
  } = useApi<LoanRequirement>(LOAN_REQUIREMENTS_URL);

  const {
    data: userLoanRequirements,
    fetchData: fetchUserLoanRequirements,
  } = useApi<UserLoanRequirement>(USER_LOAN_REQUIREMENTS_URL);

  // useEffect(() => {
  //   if (localStorage.getItem('accessToken')) { // Check if accessToken exists

  //   fetchLoanTypes();
  //   fetchLoanApplications();
  //   fetchLoanRepayments();
  //   fetchLoanRequirements();
  //   fetchUserLoanRequirements();
  //   }
  // }, [currentPage]);

  return (
    <LoansContext.Provider
      value={{
        loanTypes,
        loanApplications,
        loanRepayments,
        loanRequirements,
        userLoanRequirements,
        loading,
        error,
        fetchLoanTypes,
        fetchLoanApplications,
        fetchLoanRepayments,
        fetchLoanRequirements,
        fetchUserLoanRequirements,
        createLoanType,
        updateLoanType,
        deleteLoanType,
        createLoanApplication,
        updateLoanApplication,
        deleteLoanApplication,
        createLoanRepayment,
        updateLoanRepayment,
        deleteLoanRepayment,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        setPageSize,
      }}
    >
      {children}
    </LoansContext.Provider>
  );
};

// Custom hook to use the LoansContext
export const useLoans = (): LoansContextProps => {
  const context = useContext(LoansContext);
  if (!context) {
    throw new Error('useLoans must be used within a LoansProvider');
  }
  return context;
};
