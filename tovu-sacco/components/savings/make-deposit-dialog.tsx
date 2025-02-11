"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useSavings } from "@/context/SavingsContext"
import { Loader2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Goal, Deposit } from "@/types/savings"

const depositSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  notes: z.string().optional(),
})

interface MakeDepositDialogProps {
  goal: Goal
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function MakeDepositDialog({ goal, open, onOpenChange, onSuccess }: MakeDepositDialogProps) {
  const { makeDeposit, loading } = useSavings()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
      notes: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof depositSchema>) => {
    try {
      await makeDeposit({
        goal: goal.id,
        amount: values.amount,
        notes: values.notes,
        date: new Date().toISOString(),
      } as Partial<Deposit>)

      form.reset()
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process deposit. Please try again.",
        variant: "destructive",
      })
    }
  }

  const remainingAmount = Number(goal.target_amount) - Number(goal.current_amount)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Deposit</DialogTitle>
          <DialogDescription>
            Add money to your {goal.name} goal. Remaining amount needed: {formatCurrency(remainingAmount)}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" step="0.01" placeholder="Enter deposit amount" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Add any notes about this deposit" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Make Deposit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

