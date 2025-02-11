"use client"

import { useEffect, useState } from "react"
import { useInvestments } from "@/context/InvestmentsContext"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, ArrowDownCircle, ArrowUpCircle, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/utils"

export function UserInvestmentsList() {
  const {
    userInvestments,
    investments,
    loading,
    error,
    fetchUserInvestments,
    fetchInvestments,
    deleteUserInvestment,
  } = useInvestments()
  const { toast } = useToast()
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchUserInvestments()
    fetchInvestments()
  }, []) // Added fetchInvestments to dependencies

  const handleDelete = async (id: number) => {
    try {
      await deleteUserInvestment(id)
      toast({
        title: "Investment Deleted",
        description: "Your investment has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete investment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredInvestments = userInvestments.filter((userInvestment) => {
    const investment = investments.find(
      (inv) => inv.id === userInvestment.investment
    )
    return (
      investment?.description.toLowerCase().includes(search.toLowerCase()) ||
      userInvestment.account.toLowerCase().includes(search.toLowerCase())
    )
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
            Failed to load your investments
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search investments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Investment</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Profit/Loss</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvestments.map((userInvestment) => {
              const investment = investments.find(
                (inv) => inv.id === userInvestment.investment
              )

              return (
                <TableRow key={userInvestment.id}>
                  <TableCell>{userInvestment.account}</TableCell>
                  <TableCell>{investment?.description}</TableCell>
                  <TableCell>
                    {formatCurrency(Number(userInvestment.invested_amount))}
                  </TableCell>
                  <TableCell>
                    {new Date(userInvestment.date_added).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {userInvestment.current_profit_or_loss >= 0 ? (
                        <ArrowUpCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={
                          userInvestment.current_profit_or_loss >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {formatCurrency(userInvestment.current_profit_or_loss)}
                      </span>
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
                          className="text-destructive"
                          onClick={() => handleDelete(userInvestment.id)}
                        >
                          Delete Investment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
