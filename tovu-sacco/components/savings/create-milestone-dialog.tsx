"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Goal } from "@/types/savings"
import { useSavings } from "@/context/SavingsContext"
import { useToast } from "@/components/ui/use-toast"

const milestoneSchema = z.object({
  milestone_amount: z.string().min(1, "Amount is required"),
  milestone_date: z.date({
    required_error: "Date is required",
  }),
})

interface CreateMilestoneDialogProps {
  goal: Goal
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateMilestoneDialog({ goal, open, onOpenChange }: CreateMilestoneDialogProps) {
  const form = useForm<z.infer<typeof milestoneSchema>>({
    resolver: zodResolver(milestoneSchema),
    defaultValues: {
      milestone_amount: "",
    },
  })
  const { makeMilestone:createMilestone , loading } = useSavings()
  const { toast } = useToast()

  const onSubmit = async (values: z.infer<typeof milestoneSchema>) => {
    try {
      await createMilestone({
        goal: goal.id,
        milestone_amount: values.milestone_amount,
        milestone_date: values.milestone_date.toISOString(),
      })

      toast({
        title: "Milestone Created",
        description: "New milestone has been successfully created.",
      })

      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create milestone. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Milestone</DialogTitle>
          <DialogDescription>Set a milestone target for your savings goal.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="milestone_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="milestone_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Target Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? field.value.toLocaleDateString() : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date(goal.deadline) || date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Milestone
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

