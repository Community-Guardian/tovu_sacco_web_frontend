import { User } from ".";
// Base Transaction interface
export interface BaseTransaction {
  id: number;
  transaction_id: string;
  amount: number;
  description: string | null;
  status: 'failed' | 'completed' | 'pending' | 'processing';
  transaction_type: 'transfer' | 'received' | 'withdraw' | 'refund' | 'deposit' | 'loan' | 'investment' | 'saving';
  payment_method: 'mpesa' | 'paypal' | 'bank_transfer' | 'in-house';
  date: string; // ISO 8601 format
  update: string | null; // ISO 8601 format
  is_processed: boolean;
  expiry_date: string | null; // ISO 8601 format
  user: User;
}

// Transfer Transaction interface
export interface TransferTransaction extends BaseTransaction {
  sender_account: string; // Account ID
  receiver_account: string; // Account ID
  sender_goal: string | null; // Goal ID
  receiver_goal: string | null; // Goal ID
}

// Withdraw Transaction interface
export interface WithdrawalTransaction extends BaseTransaction {
  account: string; // Account ID
  mpesa_checkout_request_id: string | null;
  mpesa_phone_number: string | null;
  mpesa_merchant_request_id: string | null;
  mpesa_result_code: string | null;
  mpesa_result_desc: string | null;
  mpesa_transaction_id: string | null;
}

// Refund Transaction interface
export interface RefundTransaction extends BaseTransaction {
  account: string; // Account ID
  mpesa_checkout_request_id: string | null;
  mpesa_phone_number: string | null;
  mpesa_merchant_request_id: string | null;
  mpesa_result_code: string | null;
  mpesa_result_desc: string | null;
  mpesa_transaction_id: string | null;
}

// Deposit Transaction interface
export interface DepositTransaction extends BaseTransaction {
  account: string; // Account ID
  mpesa_checkout_request_id: string | null;
  mpesa_phone_number: string | null;
  mpesa_merchant_request_id: string | null;
  mpesa_result_code: string | null;
  mpesa_result_desc: string | null;
  mpesa_transaction_id: string | null;
}

// Loan Transaction interface
export interface LoanTransaction extends BaseTransaction {
  loan: number; // Loan ID
  mpesa_checkout_request_id: string | null;
  mpesa_phone_number: string | null;
  mpesa_merchant_request_id: string | null;
  mpesa_result_code: string | null;
  mpesa_result_desc: string | null;
  mpesa_transaction_id: string | null;
}

// Investment Transaction interface
export interface InvestmentTransaction extends BaseTransaction {
  investment: number; // Investment ID
  mpesa_checkout_request_id: string | null;
  mpesa_phone_number: string | null;
  mpesa_merchant_request_id: string | null;
  mpesa_result_code: string | null;
  mpesa_result_desc: string | null;
  mpesa_transaction_id: string | null;
}

// Saving Transaction interface
export interface SavingTransaction extends BaseTransaction {
  goal: number; // Goal ID
  mpesa_checkout_request_id: string | null;
  mpesa_phone_number: string | null;
  mpesa_merchant_request_id: string | null;
  mpesa_result_code: string | null;
  mpesa_result_desc: string | null;
  mpesa_transaction_id: string | null;
}

// Minimum Shares Deposit Transaction interface
export interface MinimumSharesDepositTransaction extends BaseTransaction {
  account: string; // Account ID
  mpesa_checkout_request_id: string | null;
  mpesa_phone_number: string | null;
  mpesa_merchant_request_id: string | null;
  mpesa_result_code: string | null;
  mpesa_result_desc: string | null;
  mpesa_transaction_id: string | null;
}

// Audit Transaction interface
export interface AuditTransaction extends BaseTransaction {
  content_type: string;
  object_id: string;
  field_name: string;
  old_value: string | null;
  new_value: string | null;
  updated_by: User | null;
  updated_at: string; // ISO 8601 format
}