"use client";
import { useAccounts } from "@/context/AccountsContext";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoanApplication } from "@/types/loans";
import { Investment } from "@/types/investments";
import { Goal } from "@/types/savings";
import { useLoans } from "@/context/LoansContext";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { useInvestments } from "@/context/InvestmentsContext";
import { useSavings } from "@/context/SavingsContext";
import { useTransactions } from "@/context/TransactionsContext";

export default function DashboardPage() {
  const {
    accounts,
    kycRecords,
    nextOfKins,
    fetchAccounts,
    fetchKYC,
    fetchNextOfKins,
  } = useAccounts();
  const { loanApplications } = useLoans();
  const { investments } = useInvestments();
  const { goals } = useSavings();
  const { transactions } = useSavings();

  const account = accounts?.[0]; // Assuming one account per user
  const kyc = kycRecords?.[0];
  const activeLoans = loanApplications.filter((loan: LoanApplication) => loan.status === "Approved") || [];
  const pendingLoans = loanApplications.filter((loan: LoanApplication) => loan.status === "Pending") || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Separator className="my-4" />

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{formatCurrency(account?.account_balance)}</p>
            <p className="text-sm text-gray-500">Minimum Shares: {formatCurrency(account?.account_minimum_shares_balance)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-xl font-bold ${account?.is_active ? "text-green-600" : "text-red-600"}`}>
              {account?.is_active ? "Active" : "Suspended"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>KYC Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-xl font-bold ${kyc?.kyc_confirmed ? "text-green-600" : "text-yellow-500"}`}>
              {kyc?.kyc_confirmed ? "Verified" : "Pending Verification"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Loan Overview */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Loan Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              {activeLoans.length > 0 ? (
                activeLoans.map((loan) => (
                  <p key={loan.id}>
                    {loan.loan_type} - {formatCurrency(loan.amount_approved as string)}
                  </p>
                ))
              ) : (
                <p>No active loans</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingLoans.length > 0 ? (
                pendingLoans.map((loan) => (
                  <p key={loan.id}>
                    {loan.loan_type} - {formatCurrency(loan.amount_requested)}
                  </p>
                ))
              ) : (
                <p>No pending loans</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Investments Overview */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Investment Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {investments.length > 0 ? (
            investments.map((investment) => (
              <Card key={investment.id}>
                <CardHeader>
                  <CardTitle>{investment.investment_type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Amount: {formatCurrency(investment.amount_invested)}</p>
                  <p>ROI: {investment.roi_percentage}%</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No investments</p>
          )}
        </div>
      </div>

      {/* Savings & Goals */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Savings & Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle>{goal.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Target: {formatCurrency(goal.target_amount)}</p>
                  <p>Saved: {formatCurrency(goal.current_amount)}</p>
                  <p>Progress: {goal.progress_percentage}%</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No savings goals</p>
          )}
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Card className="mt-2">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((txn) => (
                <div key={txn.id} className="flex justify-between py-2 border-b last:border-none">
                  <span>{txn.transaction_type}</span>
                  <span className="font-bold">{formatCurrency(txn.amount)}</span>
                  <span className="text-sm text-gray-500">{formatDate(txn.date)}</span>
                </div>
              ))
            ) : (
              <p>No transactions</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
