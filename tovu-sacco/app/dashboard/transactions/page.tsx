"use client"

import { useState } from "react"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { useToast } from "@/hooks/use-toast"

export default function TransactionsPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [type, setType] = useState("all")
  const [date, setDate] = useState<Date>()

  const handleDownload = async () => {
    try {
      // Implement download logic here
      toast({
        title: "Download Started",
        description: "Your transaction statement is being downloaded.",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download transaction statement. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">View and manage all your financial transactions</p>
      </div>

      <TransactionFilters
        onSearch={setSearch}
        onTypeChange={setType}
        onDateChange={setDate}
        onDownload={handleDownload}
      />

      <TransactionTable search={search} type={type} date={date} />
</div>
  )
}

