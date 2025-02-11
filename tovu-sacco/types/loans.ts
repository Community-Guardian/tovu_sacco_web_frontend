export interface LoanRequirement {
    id: number;
    name: string;
    description: string | null;
    is_mandatory: boolean;
    document_required: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface LoanType {
    id: number;
    requirements: LoanRequirement[];
    name: string;
    description: string | null;
    interest_rate: string;
    min_amount: string;
    max_amount: string;
    max_duration_months: number;
  }
  export interface LoanApplication {
    id: number;
    loan_type: number;
    amount_requested: string;
    amount_approved: string | null;
    interest_rate: string;
    date_requested: string; // ISO 8601 format
    date_approved: string | null; // ISO 8601 format or null
    due_date: string; // ISO 8601 format
    status: string;
    is_active: boolean;
    account: string;
    approvee: string | null;
  }
  export interface LoanRepayment {
    id: number;
    amount: number;
    payment_date: string; // ISO 8601 format
    loan: number; // Assuming loan is an ID referring to a loan
  }
  export interface UserLoanRequirement {
    id: number;
    is_fulfilled: boolean;
    document: string | null; // Assuming the document can be null or a string (e.g., URL or file path)
    submitted_at: string; // ISO 8601 format
    account: string; // Account identifier
    requirement: number; // ID referring to the loan requirement
  }
    