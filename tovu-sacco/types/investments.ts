export interface InvestmentType {
    id: number;
    name: string;
    description: string;
    minAmount: string;
    maxAmount: string;
    duration: string;
    interestRate: number;
  }
  export interface Investment {
    id: number;
    investment_type: number; // Refers to the InvestmentType ID
    amount_invested: string;
    current_value: string;
    return_on_investment: string;
    date_invested: string; // Date in ISO format (e.g., "2025-01-27T18:21:35.237614Z")
    maturity_date: string | null; // Can be null if there's no maturity date
    description: string;
    is_active: boolean;
    profit_or_loss: number; // Profit or loss amount
    roi_percentage: number; // Return on Investment percentage
  }
  export interface InvestmentAccount {
    account: string; // Account number or ID
    total_investments: string; // Total amount invested
    total_profit_or_loss: string; // Total profit or loss
    investment_limit: string; // Maximum allowed investment
    has_reached_investment_limit: boolean; // Whether the account has reached the investment limit
    last_updated: string; // Date and time when the data was last updated in ISO format
  }
  export interface UserInvestment {
    id: number; // Unique identifier for the user investment record
    account: string; // Account number or ID associated with the investment
    investment: number; // Investment type ID (you can link this to the InvestmentType data)
    invested_amount: string; // Amount invested
    date_added: string; // Date when the investment was added, in ISO format
    current_profit_or_loss: number; // Current profit or loss from the investment
  }
        