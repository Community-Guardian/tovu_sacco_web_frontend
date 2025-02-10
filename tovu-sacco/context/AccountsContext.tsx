"use client"
import { createContext, useContext, ReactNode, useEffect } from 'react';
import useApi from '@/hooks/useApi';
import { Account, KYC, NextOfKin } from '@/types/accounts';
import { ACCOUNTS_URL, KYC_URL, NEXT_OF_KINS_URL } from '@/handler/apiConfig';

interface AccountsContextProps {
  accounts: Account[];
  kycRecords: KYC[];
  nextOfKins: NextOfKin[];
  loading: boolean;
  error: string | null;
  fetchAccounts: () => void;
  fetchKYC: () => void;
  fetchNextOfKins: () => void;
  createAccount: (newAccount: Partial<Account>) => void;
  updateAccount: (id: string, updatedData: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  createKYC: (newKYC: Partial<KYC>) => void;
  updateKYC: (id: string, updatedData: Partial<KYC>) => void;
  deleteKYC: (id: string) => void;
  createNextOfKin: (newNextOfKin: Partial<NextOfKin>) => void;
  updateNextOfKin: (id: string, updatedData: Partial<NextOfKin>) => void;
  deleteNextOfKin: (id: string) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const AccountsContext = createContext<AccountsContextProps | undefined>(undefined);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: accounts,
    loading,
    error,
    fetchData: fetchAccounts,
    addItem: createAccount,
    updateItem: updateAccount,
    deleteItem: deleteAccount,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setPageSize,
  } = useApi<Account>(ACCOUNTS_URL);

  const {
    data: kycRecords,
    fetchData: fetchKYC,
    addItem: createKYC,
    updateItem: updateKYC,
    deleteItem: deleteKYC,
  } = useApi<KYC>(KYC_URL);

  const {
    data: nextOfKins,
    fetchData: fetchNextOfKins,
    addItem: createNextOfKin,
    updateItem: updateNextOfKin,
    deleteItem: deleteNextOfKin,
  } = useApi<NextOfKin>(NEXT_OF_KINS_URL);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) { // Check if accessToken exists
    fetchAccounts();
    fetchKYC();
    fetchNextOfKins();
    }
  }, [currentPage]);

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        kycRecords,
        nextOfKins,
        loading,
        error,
        fetchAccounts,
        fetchKYC,
        fetchNextOfKins,
        createAccount,
        updateAccount,
        deleteAccount,
        createKYC,
        updateKYC,
        deleteKYC,
        createNextOfKin,
        updateNextOfKin,
        deleteNextOfKin,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        setPageSize,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

// Custom hook to use the AccountsContext
export const useAccounts = (): AccountsContextProps => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountsProvider');
  }
  return context;
};
