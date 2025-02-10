const BASE_URL = 'https://tovusacco2.pythonanywhere.com';
// const BASE_URL = 'http://192.168.0.105:80';

export { BASE_URL };

// API Endpoints for User, Authentication and Password reset
// Auth Urls
export const REGISTER_URL = `${BASE_URL}/register/`;
export const LOGIN_URL = `${BASE_URL}/login/`;
export const LOGOUT_URL = `${BASE_URL}/logout/`;
export const VERIFY_TOKEN_URL = `${BASE_URL}/token/verify/`;
export const CHANGE_PASSWORD_URL = `${BASE_URL}/password/change`;
export const RESEND_EMAIL_URL = `${BASE_URL}/resend-email/`;
export const RESET_PASSWORD_URL = `${BASE_URL}/password/reset/`;
// User Urls
export const USER_URL = `${BASE_URL}/api/users/`;
// Groups & permissions
export const GROUPS_URL = `${BASE_URL}/api/groups/`;
export const PERMISSIONS_URLS = `${BASE_URL}/api/permissions/`;
export const CHECK_GROUP_WITH_PERMISSIONS_URL = `${BASE_URL}/groups-with-permission/change_customuser/`;

// Token Refresh URL
export const REFRESH_TOKEN_URL = `${BASE_URL}/token/refresh/`;
// Accounts URLs
export const ACCOUNTS_URL = `${BASE_URL}/api/accounts/`;
export const KYC_URL = `${BASE_URL}/api/kyc/`;
export const NEXT_OF_KINS_URL = `${BASE_URL}/api/next-of-kins/`;

// Investments API URLs
export const INVESTMENT_TYPES_URL = `${BASE_URL}/investment-types/`;
export const INVESTMENTS_URL = `${BASE_URL}/investments/`;
export const INVESTMENT_ACCOUNTS_URL = `${BASE_URL}/investment-accounts/`;
export const USER_INVESTMENTS_URL = `${BASE_URL}/user-investments/`;
export const DIVIDENDS_URL = `${BASE_URL}/dividends/`;

// Loan API URLs
export const LOAN_TYPES_URL = `${BASE_URL}/loan-types/`;
export const LOANS_URL = `${BASE_URL}/loans/`;
export const LOAN_REQUIREMENTS_URL = `${BASE_URL}/loan-requirements/`;
export const LOAN_PAYMENTS_URL = `${BASE_URL}/loan-payments/`;
export const USER_LOAN_REQUIREMENTS_URL = `${BASE_URL}/user-requirements/`;

// Transaction URLs
export const TRANSFER_URL = `${BASE_URL}/transactions/transfers/`;
export const WITHDRAWAL_URL = `${BASE_URL}/transactions/withdrawals/`;
export const REFUND_URL = `${BASE_URL}/transactions/refunds/`;
export const DEPOSIT_URL = `${BASE_URL}/transactions/deposits/`;
export const LOAN_TRANSACTION_URL = `${BASE_URL}/transactions/loans/`;
export const INVESTMENT_TRANSACTION_URL = `${BASE_URL}/transactions/investments/`;
export const SAVING_TRANSACTION_URL = `${BASE_URL}/transactions/savings/`;
export const MINIMUM_SHARES_DEPOSIT_URL = `${BASE_URL}/transactions/minimum_shares_deposits/`;
export const AUDIT_TRANSACTION_URL = `${BASE_URL}/transactions/audits/`;
export const TRANSACTION_STATUS_URL = `${BASE_URL}/transaction_status/`;
export const MPESA_CALLBACK_URL = `${BASE_URL}/mpesa_callback/`;



// Savings Goals URLs
export const GOALS_URL = `${BASE_URL}/api/goals/`;
export const DEPOSITS_URL = `${BASE_URL}/api/deposits/`;
export const MILESTONES_URL = `${BASE_URL}/api/milestones/`;
export const REMINDERS_URL = `${BASE_URL}/api/reminders/`;
export const TRANSACTIONS_URL = `${BASE_URL}/api/transactions/`;
export const NOTIFICATIONS_URL = `${BASE_URL}/api/notifications/`;
export const GOAL_PROGRESS_URL = `${BASE_URL}/api/goal-progress/`;
export const MAKE_DEPOSIT_URL = `${BASE_URL}/api/make-deposit/`;
