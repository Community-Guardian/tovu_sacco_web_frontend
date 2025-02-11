import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BaseTransaction } from "@/types/transactions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(amount)
}

export function getSortedTransactions(
  transactions: BaseTransaction[],
  sortColumn: keyof BaseTransaction,
  sortDirection: "asc" | "desc"
): BaseTransaction[] {
  return [...transactions].sort((a, b) => {
    if (sortColumn === "date") {
      const dateA = new Date(a[sortColumn]).getTime()
      const dateB = new Date(b[sortColumn]).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    }
    
    if (sortColumn === "amount") {
      return sortDirection === "asc" 
        ? a[sortColumn] - b[sortColumn]
        : b[sortColumn] - a[sortColumn]
    }
    
    const valueA = String(a[sortColumn]).toLowerCase()
    const valueB = String(b[sortColumn]).toLowerCase()
    return sortDirection === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA)
  })
}
