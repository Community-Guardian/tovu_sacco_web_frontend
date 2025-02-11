"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import type {
  BaseTransaction,
  TransferTransaction,
  WithdrawalTransaction,
  RefundTransaction,
  DepositTransaction,
  LoanTransaction,
  InvestmentTransaction,
  SavingTransaction,
  MinimumSharesDepositTransaction,
  AuditTransaction,
} from "@/types/transactions"
import { formatCurrency } from "@/lib/utils"

interface TransactionDetailModalProps {
  transaction: BaseTransaction
  open: boolean
  onClose: () => void
}

function isTransferTransaction(transaction: BaseTransaction): transaction is TransferTransaction {
  return transaction.transaction_type === "transfer"
}

function isWithdrawalTransaction(transaction: BaseTransaction): transaction is WithdrawalTransaction {
  return transaction.transaction_type === "withdraw"
}

function isMpesaTransaction(
  transaction: BaseTransaction,
): transaction is
  | WithdrawalTransaction
  | RefundTransaction
  | DepositTransaction
  | LoanTransaction
  | InvestmentTransaction
  | SavingTransaction
  | MinimumSharesDepositTransaction {
  return Boolean((transaction as any).mpesa_transaction_id)
}

function isAuditTransaction(transaction: BaseTransaction): transaction is AuditTransaction {
  return "content_type" in transaction
}

export function TransactionDetailModal({ transaction, open, onClose }: TransactionDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>View detailed information about this transaction.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="grid gap-4 py-4">
            {/* Base Transaction Details */}
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-sm font-medium">ID</span>
              <span className="col-span-3 text-sm">{transaction.transaction_id}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-sm font-medium">Amount</span>
              <span className="col-span-3 text-sm">{formatCurrency(transaction.amount)}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-sm font-medium">Type</span>
              <span className="col-span-3 capitalize text-sm">{transaction.transaction_type}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-sm font-medium">Status</span>
              <span className="col-span-3 capitalize text-sm">{transaction.status}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-sm font-medium">Date</span>
              <span className="col-span-3 text-sm">{new Date(transaction.date).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 text-sm font-medium">Payment</span>
              <span className="col-span-3 capitalize text-sm">{transaction.payment_method}</span>
            </div>

            {/* Transfer-specific details */}
            {isTransferTransaction(transaction) && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="col-span-1 text-sm font-medium">From</span>
                  <span className="col-span-3 text-sm">{transaction.sender_account}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="col-span-1 text-sm font-medium">To</span>
                  <span className="col-span-3 text-sm">{transaction.receiver_account}</span>
                </div>
                {transaction.sender_goal && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="col-span-1 text-sm font-medium">From Goal</span>
                    <span className="col-span-3 text-sm">{transaction.sender_goal}</span>
                  </div>
                )}
                {transaction.receiver_goal && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="col-span-1 text-sm font-medium">To Goal</span>
                    <span className="col-span-3 text-sm">{transaction.receiver_goal}</span>
                  </div>
                )}
              </>
            )}

            {/* M-Pesa transaction details */}
            {isMpesaTransaction(transaction) && transaction.mpesa_transaction_id && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="col-span-1 text-sm font-medium">M-Pesa ID</span>
                  <span className="col-span-3 text-sm">{transaction.mpesa_transaction_id}</span>
                </div>
                {transaction.mpesa_phone_number && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="col-span-1 text-sm font-medium">Phone</span>
                    <span className="col-span-3 text-sm">{transaction.mpesa_phone_number}</span>
                  </div>
                )}
                {transaction.mpesa_result_desc && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="col-span-1 text-sm font-medium">Result</span>
                    <span className="col-span-3 text-sm">{transaction.mpesa_result_desc}</span>
                  </div>
                )}
              </>
            )}

            {/* Audit transaction details */}
            {isAuditTransaction(transaction) && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="col-span-1 text-sm font-medium">Content</span>
                  <span className="col-span-3 text-sm">{transaction.content_type}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="col-span-1 text-sm font-medium">Field</span>
                  <span className="col-span-3 text-sm">{transaction.field_name}</span>
                </div>
                {transaction.old_value && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="col-span-1 text-sm font-medium">Old</span>
                    <span className="col-span-3 text-sm">{transaction.old_value}</span>
                  </div>
                )}
                {transaction.new_value && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="col-span-1 text-sm font-medium">New</span>
                    <span className="col-span-3 text-sm">{transaction.new_value}</span>
                  </div>
                )}
                {transaction.updated_by && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="col-span-1 text-sm font-medium">By</span>
                    <span className="col-span-3 text-sm">{transaction.updated_by.email}</span>
                  </div>
                )}
              </>
            )}

            {transaction.description && (
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Description</span>
                <span className="col-span-3 text-sm">{transaction.description}</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

