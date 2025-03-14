"use client";
import { createContext, useContext, ReactNode } from "react";
import useApi from "@/hooks/useApi";
import {
  Goal,
  Deposit,
  SavingMilestone,
  SavingReminder,
  TransactionHistory,
  GoalNotification,
} from "@/types/savings";
import {
  GOALS_URL,
  DEPOSITS_URL,
  MILESTONES_URL,
  REMINDERS_URL,
  TRANSACTIONS_URL,
  NOTIFICATIONS_URL,
} from "@/handler/apiConfig";

interface SavingsContextProps {
  goals: Goal[];
  deposits: Deposit[];
  milestones: SavingMilestone[];
  reminders: SavingReminder[];
  transactions: TransactionHistory[];
  notifications: GoalNotification[];
  loading: boolean;
  error: string | null;
  fetchGoals: () => void;
  fetchDeposits: () => void;
  fetchMilestones: () => void;
  fetchReminders: () => void;
  fetchTransactions: () => void;
  fetchNotifications: () => void;
  createGoal: (data: Partial<Goal>) => void;
  updateGoal: (id: number, data: Partial<Goal>) => void;
  deleteGoal: (id: number) => void;
  makeDeposit: (data: Partial<Deposit>) => void;
  updateDeposit: (id: number, data: Partial<Deposit>) => void;
  deleteDeposit: (id: number) => void;
  makeMilestone: (data: Partial<SavingMilestone>) => void;
  updateMilestone: (id: number, data: Partial<SavingMilestone>) => void;
  deleteMilestone: (id: number) => void;
  createReminder: (data: Partial<SavingReminder>) => void; // ✅ Create
  updateReminder: (id: number, data: Partial<SavingReminder>) => void; // ✅ Update
  deleteReminder: (id: number) => void; // ✅ Delete
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const SavingsContext = createContext<SavingsContextProps | undefined>(undefined);

export const SavingsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: goals,
    loading,
    error,
    fetchData: fetchGoals,
    addItem: createGoal,
    updateItem: updateGoal,
    deleteItem: deleteGoal,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setPageSize,
  } = useApi<Goal>(GOALS_URL);

  const {
    data: deposits,
    fetchData: fetchDeposits,
    addItem: makeDeposit,
    updateItem: updateDeposit,
    deleteItem: deleteDeposit,
  } = useApi<Deposit>(DEPOSITS_URL);

  const {
    data: milestones,
    fetchData: fetchMilestones,
    addItem: makeMilestone,
    updateItem: updateMilestone,
    deleteItem: deleteMilestone,
  } = useApi<SavingMilestone>(MILESTONES_URL);

  const {
    data: reminders,
    fetchData: fetchReminders,
    addItem: createReminder, // ✅ Create Reminder
    updateItem: updateReminder, // ✅ Update Reminder
    deleteItem: deleteReminder, // ✅ Delete Reminder
  } = useApi<SavingReminder>(REMINDERS_URL);

  const { data: transactions, fetchData: fetchTransactions } = useApi<TransactionHistory>(TRANSACTIONS_URL);
  const { data: notifications, fetchData: fetchNotifications } = useApi<GoalNotification>(NOTIFICATIONS_URL);

  return (
    <SavingsContext.Provider
      value={{
        goals,
        deposits,
        milestones,
        reminders,
        transactions,
        notifications,
        loading,
        error,
        fetchGoals,
        fetchDeposits,
        fetchMilestones,
        fetchReminders,
        fetchTransactions,
        fetchNotifications,
        createGoal,
        updateGoal,
        deleteGoal,
        makeDeposit,
        updateDeposit,
        deleteDeposit,
        makeMilestone,
        updateMilestone,
        deleteMilestone,
        createReminder, // ✅ Provide function
        updateReminder, // ✅ Provide function
        deleteReminder, // ✅ Provide function
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        setPageSize,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
};

// Custom hook to use the SavingsContext
export const useSavings = (): SavingsContextProps => {
  const context = useContext(SavingsContext);
  if (!context) {
    throw new Error("useSavings must be used within a SavingsProvider");
  }
  return context;
};
