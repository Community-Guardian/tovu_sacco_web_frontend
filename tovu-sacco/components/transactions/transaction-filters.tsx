"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TransactionFiltersProps {
  onSearch: (value: string) => void
  onTypeChange: (value: string) => void
  onDateChange: (value: Date | undefined) => void
  onDownload: () => void
}

export function TransactionFilters({ onSearch, onTypeChange, onDateChange, onDownload }: TransactionFiltersProps) {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <Input placeholder="Search transactions..." onChange={(e) => onSearch(e.target.value)} className="max-w-sm" />
        <Select onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="transfer">Transfers</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="withdraw">Withdrawals</SelectItem>
            <SelectItem value="refund">Refunds</SelectItem>
            <SelectItem value="deposit">Deposits</SelectItem>
            <SelectItem value="loan">Loans</SelectItem>
            <SelectItem value="investment">Investments</SelectItem>
            <SelectItem value="saving">Savings</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date)
                onDateChange(date)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={onDownload} className="w-full sm:w-auto">
        <Download className="mr-2 h-4 w-4" />
        Download Statement
      </Button>
    </div>
  )
}

