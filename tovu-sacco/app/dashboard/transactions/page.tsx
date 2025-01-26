"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

const transactions = [
  {
    id: "1",
    date: "2024-01-25",
    description: "Deposit",
    type: "credit",
    amount: 2500.0,
    balance: 45231.89,
  },
  {
    id: "2",
    date: "2024-01-24",
    description: "Loan Payment",
    type: "debit",
    amount: 1200.0,
    balance: 42731.89,
  },
  // Add more transactions as needed
]

export default function TransactionsPage() {
  const [type, setType] = useState("all")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Statement
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search transactions..." className="max-w-sm" />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="credit">Credits</SelectItem>
            <SelectItem value="debit">Debits</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell
                  className={cn("text-right", transaction.type === "credit" ? "text-green-500" : "text-red-500")}
                >
                  {transaction.type === "credit" ? "+" : "-"} KES {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">KES {transaction.balance.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

