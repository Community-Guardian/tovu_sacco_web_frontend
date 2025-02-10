import { User } from ".";

export interface NextOfKin {
  id: string;
  name: string;
  relationship: string;
  contact_number: string;
}
export interface KYC {
  
  membership_number: string;
  user: string;
  full_name: string;
  marital_status: string;
  gender: string;
  identity_type: string;
  id_number: string;
  identity_image: string;
  date_of_birth: string; // Use ISO 8601 format
  signature: string | null;
  kra_pin: string;
  employment_status: string;
  created_at: string;
  updated_at: string;
  country: string;
  county: string;
  town: string;
  contact_number: string;
  kyc_submitted: boolean;
  kyc_confirmed: boolean;
  next_of_kin: Partial<NextOfKin[]>;  // Reference the separate NextOfKin object
}

  export interface Account {
    user: Partial<User>;
    kyc: Partial<KYC>;
    account_balance: number;
    account_minimum_shares_balance: number;
    account_number: string;
    account_id: string;
    created: string;
    is_active: boolean;
    is_suspended: boolean;
    last_modified: string;
    recommended_by: string | null;
  }
  