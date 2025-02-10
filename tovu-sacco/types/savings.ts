// types.tsx

// Type for Goal
export interface Goal {
    id: number;
    account: number;  // Account ID
    name: string;
    description: string | null;
    target_amount: number;  // Store as string to preserve decimal precision
    current_amount: number;  // Store as string to preserve decimal precision
    deadline: string;  // Date as string in the format 'YYYY-MM-DD'
    cover_icon: string | null;  // URL to the cover image
    color: string;  // Hex color for frontend personalization
    saving_frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
    progress_percentage: number;  // Store as string to preserve decimal precision
    is_active: boolean;
    created_at: string;  // DateTime as string in the format 'YYYY-MM-DDTHH:mm:ss'
    updated_at: string;  // DateTime as string in the format 'YYYY-MM-DDTHH:mm:ss'
  }
  
  // Type for Deposit
  export interface Deposit {
    id: number;
    goal: number;  // Goal ID
    amount: string;  // Store as string to preserve decimal precision
    date: string;  // DateTime as string in the format 'YYYY-MM-DDTHH:mm:ss'
    transaction_id: string | null;  // External transaction ID
  }
  
  // Type for SavingMilestone
  export interface SavingMilestone {
    id: number;
    goal: number;  // Goal ID
    milestone_amount: string;  // Store as string to preserve decimal precision
    milestone_date: string;  // Date as string in the format 'YYYY-MM-DD'
    achieved: boolean;
  }
  
  // Type for SavingReminder
  export interface SavingReminder {
    id: number;
    goal: number;  // Goal ID
    reminder_type: string;
    reminder_date: string;  // DateTime as string in the format 'YYYY-MM-DDTHH:mm:ss'
    is_sent: boolean;
  }
  
  // Type for TransactionHistory
  export interface TransactionHistory {
    id: number;
    account: number;  // Account ID
    goal: number;  // Goal ID
    amount: string;  // Store as string to preserve decimal precision
    transaction_type: 'Deposit' | 'Withdrawal';  // Type of transaction
    date: string;  // DateTime as string in the format 'YYYY-MM-DDTHH:mm:ss'
    reference_number: string;
  }
  
  // Type for GoalNotification
  export interface GoalNotification {
    id: number;
    account: number;  // Account ID
    goal: number;  // Goal ID
    notification_type: string;  // Type of notification (e.g., 'Progress', 'Milestone Reached')
    message: string;
    date_sent: string;  // DateTime as string in the format 'YYYY-MM-DDTHH:mm:ss'
    is_read: boolean;
  }
  
  // Helper types for managing lists of objects
  export type GoalListResponse = {
    goals: Goal[];
  };
  
  export type DepositListResponse = {
    deposits: Deposit[];
  };
  
  export type SavingMilestoneListResponse = {
    milestones: SavingMilestone[];
  };
  
  export type SavingReminderListResponse = {
    reminders: SavingReminder[];
  };
  
  export type TransactionHistoryListResponse = {
    transactions: TransactionHistory[];
  };
  
  export type GoalNotificationListResponse = {
    notifications: GoalNotification[];
  };
  
  // For the API request body, these types would represent the structure of the data being posted to the server.
  
  export interface CreateDepositRequest {
    amount: string;  // Store as string to preserve decimal precision
  }
  
  export interface CreateGoalRequest {
    account: number | undefined;  // Account ID
    name: string;
    description: string | null;
    target_amount: string;  // Store as string to preserve decimal precision
    deadline: string;  // Date as string in the format 'YYYY-MM-DD'
    cover_icon: string | null;  // URL to the cover image
    color: string;  // Hex color for frontend personalization
    saving_frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
  }
  
  // For updates or changes, these types could be used as the body for the PUT/PATCH requests.
  
  export interface UpdateGoalRequest {
    name?: string;
    description?: string;
    target_amount?: string;  // Store as string to preserve decimal precision
    current_amount?: string;  // Store as string to preserve decimal precision
    deadline?: string;  // Date as string in the format 'YYYY-MM-DD'
    cover_icon?: string | null;
    color?: string;  // Hex color for frontend personalization
    saving_frequency?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
    is_active?: boolean;
  }
  
  