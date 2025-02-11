"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useInvestments } from "@/context/InvestmentsContext"
import { Loader2 } from 'lucide-react'
import { formatCurrency } from "@/lib/utils"
import type { Investment, InvestmentType, InvestmentAccount } from "@/types/investments"
import { useAccounts } from "@/context/AccountsContext"
const investSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
})

interface InvestDialogProps {
  investment: Investment
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InvestDialog({ investment, open, onOpenChange }: InvestDialogProps) {
  const { investmentTypes, investmentAccounts, createUserInvestment, loading } = useInvestments()
  const { toast } = useToast()
  const { accounts } = useAccounts(); 
  const investmentType = investmentTypes.find((type: InvestmentType) => type.id === investment.investment_type)

  // Find the user's investment account for this investment type
  const account = investmentAccounts.find((acc: InvestmentAccount) => acc.account === accounts[0].account_number.toString());
  const minAmount = Number(investmentType?.minAmount ?? 0);
  const maxAmount = account
    ? Number(account.investment_limit) - Number(account.total_investments)
    : Infinity;

  const form = useForm<z.infer<typeof investSchema>>({
    resolver: zodResolver(investSchema),
    defaultValues: { amount: "" },
  });

  const onSubmit = async (values: z.infer<typeof investSchema>) => {
    try {
      const amount = parseFloat(values.amount);
      if (isNaN(amount)) {
        form.setError("amount", { type: "manual", message: "Invalid amount" });
        return;
      }

      if (amount < minAmount) {
        form.setError("amount", {
          type: "manual",
          message: `Minimum investment amount is ${formatCurrency(minAmount)}`,
        });
        return;
      }

      if (amount > maxAmount) {
        form.setError("amount", {
          type: "manual",
          message: `Maximum investment amount is ${formatCurrency(maxAmount)}`,
        });
        return;
      }

      await createUserInvestment({
        investment: investment.id,
        invested_amount: values.amount,
        date_added: new Date().toISOString(),
      });

      toast({
        title: "Investment Created",
        description: "Your investment has been successfully created.",
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create investment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invest in {investmentType?.name}</DialogTitle>
          <DialogDescription>
            Enter the amount you want to invest. Minimum: {" "}
            {formatCurrency(minAmount)}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" step="0.01" />
                  </FormControl>
                  <FormDescription>
                    Interest Rate: {investment?.return_on_investment || 0}%
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2 rounded-md bg-muted p-4">
              <div className="flex justify-between text-sm">
                <span>Duration</span>
                <span>{investment?.maturity_date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Expected Return</span>
                <span className="text-green-500">
                  {form.watch("amount")
                    ? formatCurrency(
                        Number(form.watch("amount")) *
                          (1 + Number(investmentType?.interestRate) / 100)
                      )
                    : formatCurrency(0)}
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Investment
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
