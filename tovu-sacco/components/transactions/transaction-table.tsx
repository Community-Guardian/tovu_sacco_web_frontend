"use client"

import { useState,useMemo,useEffect } from "react"
import { useTransactions } from "@/context/TransactionsContext"
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { ChevronDown, Eye, MoreHorizontal, Trash, ArrowUpDown, Check, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { TransactionDetailModal } from "./transaction-detail-modal"
import { DeleteTransactionModal } from "./delete-transaction-modal"
import type { BaseTransaction,DepositTransaction , TransferTransaction , LoanTransaction , InvestmentTransaction , SavingTransaction } from "@/types/transactions"

export function TransactionTable({
  search,
  type,
  date,
}: {
  search: string;
  type: string;
  date?: Date;
}) {
  const { toast } = useToast();
  const {
    deposits,
    withdrawals,
    refunds,
    transfers,
    loans,
    investments,
    savings,
    minimumSharesDeposits,
    audits,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    deleteTransaction,
  } = useTransactions();

  // Combine all transactions into a single array
  const allTransactions = useMemo(() => {
    return [
      ...(deposits || []),
      ...(withdrawals || []),
      ...(refunds || []),
      ...(transfers || []),
      ...(loans || []),
      ...(investments || []),
      ...(savings || []),
      ...(minimumSharesDeposits || []),
    ];
  }, [deposits, withdrawals, refunds, transfers, loans, investments, savings, minimumSharesDeposits]);

  // **Apply Filtering Logic**
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((transaction) => {
      // **Filter by search**
      const matchesSearch =
        !search ||
        transaction.description?.toLowerCase().includes(search.toLowerCase()) ||
        transaction.transaction_type.toLowerCase().includes(search.toLowerCase());

      // **Filter by type**
      const matchesType = type === "all" || transaction.transaction_type === type;

      // **Filter by date**
      const matchesDate = !date || new Date(transaction.date).toDateString() === date.toDateString();

      return matchesSearch && matchesType && matchesDate;
    });
  }, [allTransactions, search, type, date]);

  useEffect(() => {
    setDisplayedTransactions(filteredTransactions);
  }, [filteredTransactions]);


  const [sortColumn, setSortColumn] = useState<keyof BaseTransaction>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedTransaction, setSelectedTransaction] = useState<BaseTransaction | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [displayedTransactions, setDisplayedTransactions] = useState(allTransactions)

  const handleSort = (column: keyof BaseTransaction) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }

    // Use the new sorting utility
    const sortedTransactions = getSortedTransactions(allTransactions, column, sortDirection)
    setDisplayedTransactions(sortedTransactions as (DepositTransaction | TransferTransaction | LoanTransaction | InvestmentTransaction | SavingTransaction)[])  }

    const getSortedTransactions = (
      transactions: BaseTransaction[],
      column: keyof BaseTransaction,
      direction: "asc" | "desc",
    ) => {
      return [...transactions].sort((a, b) => {
        const valueA = a[column]
        const valueB = b[column]
    
        if (valueA !== null && valueA !== undefined && valueB !== null && valueB !== undefined) {
          if (valueA < valueB) {
            return direction === "asc" ? -1 : 1
          }
          if (valueA > valueB) {
            return direction === "asc" ? 1 : -1
          }
        }
        return 0
      })
    }

  const getTransactionTypeColor = (type: BaseTransaction["transaction_type"]) => {
    switch (type) {
      case "deposit":
      case "received":
        return "bg-green-100 text-green-700"
      case "withdraw":
      case "transfer":
        return "bg-blue-100 text-blue-700"
      case "refund":
        return "bg-purple-100 text-purple-700"
      case "loan":
        return "bg-orange-100 text-orange-700"
      case "investment":
        return "bg-indigo-100 text-indigo-700"
      case "saving":
        return "bg-teal-100 text-teal-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleDelete = async (transaction: BaseTransaction) => {
    try {
      await deleteTransaction(transaction.transaction_type, transaction.id)
      toast({
        title: "Transaction deleted",
        description: "The transaction has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-center">
        <p className="text-sm text-destructive">Failed to load transactions. Please try again.</p>
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("date")} className="cursor-pointer">
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-[200px] truncate">{transaction.description || "N/A"}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTransactionTypeColor(
                      transaction.transaction_type,
                    )}`}
                  >
                    {transaction.transaction_type}
                  </div>
                </TableCell>
                <TableCell className="capitalize">{transaction.payment_method}</TableCell>
                <TableCell
                  className={`text-right ${
                    transaction.transaction_type === "deposit" || transaction.transaction_type === "received"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.transaction_type === "deposit" || transaction.transaction_type === "received"
                    ? "+"
                    : "-"}{" "}
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {transaction.status === "completed" ? (
                      <Check className="mr-1 h-3 w-3" />
                    ) : transaction.status === "failed" ? (
                      <X className="mr-1 h-3 w-3" />
                    ) : (
                      <ChevronDown className="mr-1 h-3 w-3" />
                    )}
                    {transaction.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTransaction(transaction)
                          setShowDetailModal(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTransaction(transaction)
                          setShowDeleteModal(true)
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedTransaction && (
        <>
          <TransactionDetailModal
            transaction={selectedTransaction}
            open={showDetailModal}
            onClose={() => {
              setShowDetailModal(false)
              setSelectedTransaction(null)
            }}
          />
          <DeleteTransactionModal
            transaction={selectedTransaction}
            open={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false)
              setSelectedTransaction(null)
            }}
            onConfirm={() => handleDelete(selectedTransaction)}
          />
        </>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}

