export interface ApiErrorResponse {
  detail?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: Partial<User>
}
export interface User {
  id: string;
  pk: string;
  group_names: string[];
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  email: string;
  role: 'admin' | 'customer';
  groups: number[];
  user_permissions: any[];
}

  // Transaction object interface
export interface Transaction {
    id: number;
    transaction_id: string;
    amount: number;
    description: string | null;
    status: string; // e.g., "pending", "completed"
    transaction_type: string; // e.g., "deposit"
    payment_method: string; // e.g., "mpesa", "in-house"
    date: string;
    update: string | null;
    mpesa_result_code: string | null;
    mpesa_result_desc: string | null;
    mpesa_merchant_request_id: string | null;
    mpesa_checkout_request_id: string | null;
    mpesa_phone_number: string | null;
    mpesa_transaction_id: string | null;
    paypal_transaction_id: string | null;
    bank_transaction_ref: string | null;
    is_processed: boolean;
    account: string | null; // Account ID
    user: string; // User ID
    recipient_account: string;// only for transfer
    sender_account: string;// only for transfer
  }
  export interface MpesaPaymentIntent {
    amount: number; // The amount to be paid
    payment_method: string; // The payment method (e.g., "mpesa")
    account: string; // The account identifier
    phone_number: string; // The phone number to charge
  }
  export interface AccountTransfer {
    amount: number; // The amount to be paid
    payment_method: string; // The payment method (e.g., "mpesa")
    sender_account: string; // The asender_account
    recipient_account: string; // The recipient_account
  }