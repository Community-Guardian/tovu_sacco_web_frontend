import { User } from ".";
import { Account } from "./accounts";

export interface Notification {
  id: string;
  user: Partial<User>;
  title: string;
  message: string;
  notification_type: 'info' | 'warning' | 'success';
  date_sent: string; // Use ISO 8601 format
  is_read: boolean;
}

export interface UserNotification extends Notification {
  account: Partial<Account>;
  user_action: string | null; // E.g., 'deposit', 'withdrawal'
}

export interface AdminNotification extends Notification {
  admin_action: string | null; // E.g., 'user_registration', 'loan_approval'
}