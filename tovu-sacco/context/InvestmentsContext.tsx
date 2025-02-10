"use client"
import { createContext, useContext, ReactNode, useEffect } from 'react';
import useApi from '@/hooks/useApi';
import {
  InvestmentType,
  Investment,
  InvestmentAccount,
  UserInvestment,
} from '@/types/investments';
import {
  INVESTMENT_TYPES_URL,
  INVESTMENTS_URL,
  INVESTMENT_ACCOUNTS_URL,
  USER_INVESTMENTS_URL,
  DIVIDENDS_URL,
} from '@/handler/apiConfig';

interface InvestmentsContextProps {
  investmentTypes: InvestmentType[];
  investments: Investment[];
  investmentAccounts: InvestmentAccount[];
  userInvestments: UserInvestment[];
  dividends: any[];
  loading: boolean;
  error: string | null;
  fetchInvestmentTypes: () => void;
  fetchInvestments: () => void;
  fetchInvestmentAccounts: () => void;
  fetchUserInvestments: () => void;
  fetchDividends: () => void;
  createInvestmentType: (data: Partial<InvestmentType>) => void;
  updateInvestmentType: (id: number, data: Partial<InvestmentType>) => void;
  deleteInvestmentType: (id: number) => void;
  createInvestment: (data: Partial<Investment>) => void;
  updateInvestment: (id: number, data: Partial<Investment>) => void;
  deleteInvestment: (id: number) => void;
  createUserInvestment: (data: Partial<UserInvestment>) => void;
  updateUserInvestment: (id: number, data: Partial<UserInvestment>) => void;
  deleteUserInvestment: (id: number) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const InvestmentsContext = createContext<InvestmentsContextProps | undefined>(undefined);

export const InvestmentsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: investmentTypes,
    loading,
    error,
    fetchData: fetchInvestmentTypes,
    addItem: createInvestmentType,
    updateItem: updateInvestmentType,
    deleteItem: deleteInvestmentType,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setPageSize,
  } = useApi<InvestmentType>(INVESTMENT_TYPES_URL);

  const {
    data: investments,
    fetchData: fetchInvestments,
    addItem: createInvestment,
    updateItem: updateInvestment,
    deleteItem: deleteInvestment,
  } = useApi<Investment>(INVESTMENTS_URL);

  const {
    data: investmentAccounts,
    fetchData: fetchInvestmentAccounts,
  } = useApi<InvestmentAccount>(INVESTMENT_ACCOUNTS_URL);

  const {
    data: userInvestments,
    fetchData: fetchUserInvestments,
    addItem: createUserInvestment,
    updateItem: updateUserInvestment,
    deleteItem: deleteUserInvestment,
  } = useApi<UserInvestment>(USER_INVESTMENTS_URL);

  const {
    data: dividends,
    fetchData: fetchDividends,
  } = useApi<any>(DIVIDENDS_URL);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) { // Check if accessToken exists

    fetchInvestmentTypes();
    fetchInvestments();
    fetchInvestmentAccounts();
    fetchUserInvestments();
    fetchDividends();
    }
  }, [currentPage]);

  return (
    <InvestmentsContext.Provider
      value={{
        investmentTypes,
        investments,
        investmentAccounts,
        userInvestments,
        dividends,
        loading,
        error,
        fetchInvestmentTypes,
        fetchInvestments,
        fetchInvestmentAccounts,
        fetchUserInvestments,
        fetchDividends,
        createInvestmentType,
        updateInvestmentType,
        deleteInvestmentType,
        createInvestment,
        updateInvestment,
        deleteInvestment,
        createUserInvestment,
        updateUserInvestment,
        deleteUserInvestment,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        setPageSize,
      }}
    >
      {children}
    </InvestmentsContext.Provider>
  );
};

// Custom hook to use the InvestmentsContext
export const useInvestments = (): InvestmentsContextProps => {
  const context = useContext(InvestmentsContext);
  if (!context) {
    throw new Error('useInvestments must be used within an InvestmentsProvider');
  }
  return context;
};
