"use client"

import { useState } from "react"
import { useSavings } from "@/context/SavingsContext"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { formatCurrency } from "@/lib/utils"

export function TransactionsList() {
  const { transactions, goals, loading, error } = useSavings()
  const [search, setSearch] = useState("")
  const [goalFilter, setGoalFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesGoal =
      goalFilter === "all" || transaction.goal.toString() === goalFilter
    const matchesType =
      typeFilter === "all" || transaction.transaction_type.toLowerCase() === typeFilter
    const matchesSearch = transaction.reference_number
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesGoal && matchesType && matchesSearch
  })

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
      <div className="rounded-lg border border-destructive p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">
            Failed to load transactions
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by reference..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={goalFilter}
          onValueChange={setGoalFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Goals</SelectItem>
            {goals.map((goal) => (
              <SelectItem key={goal.id} value={goal.id.toString()}>
                {goal.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="deposit">Deposits</SelectItem>
            <SelectItem value="withdrawal">Withdrawals</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.reference_number}</TableCell>
                <TableCell>
                  {goals.find((g) => g.id === transaction.goal)?.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {transaction.transaction_type === "Deposit" ? (
                      <ArrowUpCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>{transaction.transaction_type}</span>
                  </div>
                </TableCell>
                <TableCell
                  className={`text-right ${
                    transaction.transaction_type === "Deposit"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.transaction_type === "Deposit" ? "+" : "-"}{" "}
                  {formatCurrency(Number(transaction.amount))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
