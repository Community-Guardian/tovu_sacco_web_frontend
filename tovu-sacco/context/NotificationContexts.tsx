"use client";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import useApi from "@/hooks/useApi";
import { UserNotification, AdminNotification } from "@/types/notifications";
import {
  USER_NOTIFICATIONS_URL,
  ADMIN_NOTIFICATIONS_URL,
  MARK_NOTIFICATIONS_READ_URL,
  MARK_NOTIFICATIONS_UNREAD_URL,
} from "@/handler/apiConfig";

interface NotificationsContextProps {
  userNotifications: UserNotification[];
  adminNotifications: AdminNotification[];
  loading: boolean;
  error: string | null;
  fetchUserNotifications: (search?: string, page?: number) => void;
  fetchAdminNotifications: (search?: string, page?: number) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  userTotalPages: number;
  adminTotalPages: number;
  userCurrentPage: number;
  adminCurrentPage: number;
  setUserPage: (page: number) => void;
  setAdminPage: (page: number) => void;
  userSearch: string;
  setUserSearch: (search: string) => void;
  adminSearch: string;
  setAdminSearch: (search: string) => void;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: userNotifications,
    loading: userLoading,
    error: userError,
    fetchData: fetchUserData,
    totalPages: userTotalPages,
    currentPage: userCurrentPage,
  } = useApi<UserNotification>(USER_NOTIFICATIONS_URL);

  const {
    data: adminNotifications,
    loading: adminLoading,
    error: adminError,
    fetchData: fetchAdminData,
    totalPages: adminTotalPages,
    currentPage: adminCurrentPage,
  } = useApi<AdminNotification>(ADMIN_NOTIFICATIONS_URL);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState<string>("");
  const [adminSearch, setAdminSearch] = useState<string>("");

  const fetchUserNotifications = (search?: string, page?: number) => {
    fetchUserData({ search, page });
  };

  const fetchAdminNotifications = (search?: string, page?: number) => {
    fetchAdminData({ search, page });
  };

  const markAllAsRead = async () => {
    setLoading(true);
    try {
      await fetch(MARK_NOTIFICATIONS_READ_URL, { method: "POST" });
      fetchUserNotifications();
      fetchAdminNotifications();
    } catch (err) {
      setError("Failed to mark all notifications as read.");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`${MARK_NOTIFICATIONS_READ_URL}/${id}`, { method: "POST" });
      fetchUserNotifications();
      fetchAdminNotifications();
    } catch (err) {
      setError("Failed to mark notification as read.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserNotifications();
    fetchAdminNotifications();
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        userNotifications,
        adminNotifications,
        loading: userLoading || adminLoading || loading,
        error: userError || adminError || error,
        fetchUserNotifications,
        fetchAdminNotifications,
        markAllAsRead,
        markAsRead,
        userTotalPages,
        adminTotalPages,
        userCurrentPage,
        adminCurrentPage,
        setUserPage: (page: number) => fetchUserNotifications(userSearch, page),
        setAdminPage: (page: number) => fetchAdminNotifications(adminSearch, page),
        userSearch,
        setUserSearch,
        adminSearch,
        setAdminSearch,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

// Custom hook to use the NotificationsContext
export const useNotifications = (): NotificationsContextProps => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};