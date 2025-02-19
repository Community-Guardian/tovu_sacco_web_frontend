"use client"

import { useState, useEffect } from "react"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function TransactionsPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [type, setType] = useState("all")
  const [date, setDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate a 1-second loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [])

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

      {/* Show loader for 1 second before displaying the content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <TransactionFilters
            onSearch={setSearch}
            onTypeChange={setType}
            onDateChange={setDate}
            onDownload={handleDownload}
          />

          <TransactionTable search={search} type={type} date={date} />
        </>
      )}
    </div>
  )
}
