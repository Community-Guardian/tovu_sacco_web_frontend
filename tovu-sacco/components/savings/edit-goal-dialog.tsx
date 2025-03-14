"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSavings } from "@/context/SavingsContext"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Goal, UpdateGoalRequest } from "@/types/savings"
import { useToast } from "@/hooks/use-toast"

const editGoalSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  target_amount: z.string().min(1, "Target amount is required"),
  deadline: z.date({
    required_error: "Deadline is required",
  }),
  saving_frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "ONCE"]),
  color: z.string().regex(/^#/, "Must be a valid hex color"),
  is_active: z.boolean(),
})

interface EditGoalDialogProps {
  goal: Goal
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function EditGoalDialog({ goal, open, onOpenChange, onSuccess }: EditGoalDialogProps) {
  const { updateGoal, loading } = useSavings()
  const { toast } = useToast()
  const [coverIcon, setCoverIcon] = useState<File | null>(null)

  const form = useForm<z.infer<typeof editGoalSchema>>({
    resolver: zodResolver(editGoalSchema),
    defaultValues: {
      name: goal.name,
      description: goal.description || "",
      target_amount: goal.target_amount.toString(),
      deadline: new Date(goal.deadline),
      color: goal.color,
      saving_frequency: goal.saving_frequency,
      is_active: goal.is_active,
    },
  })

  useEffect(() => {
    form.reset({
      name: goal.name,
      description: goal.description || "",
      target_amount: goal.target_amount.toString(),
      deadline: new Date(goal.deadline),
      color: goal.color,
      saving_frequency: goal.saving_frequency,
      is_active: goal.is_active,
    })
  }, [goal, form])

  const onSubmit = async (values: z.infer<typeof editGoalSchema>) => {
    try {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString().split("T")[0])
        } else if (key === 'target_amount') {
          formData.append(key, Number(value).toString())
        } else {
          formData.append(key, value.toString())
        }
      })

      if (coverIcon) {
        formData.append("cover_icon", coverIcon)
      }

      await updateGoal(goal.id, formData as unknown as Partial<UpdateGoalRequest>)
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update goal. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogDescription>Update your savings goal details and preferences.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target_amount"
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
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
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
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saving_frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saving Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="WEEKLY">Weekly</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                      <SelectItem value="ONCE">One-time</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input {...field} type="color" />
                  </FormControl>
                  <FormDescription>Choose a color to represent your goal</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Cover Icon (Optional)</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverIcon(e.target.files ? e.target.files[0] : null)}
              />
              <FormDescription>Upload a new icon to represent your goal</FormDescription>
            </div>

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Goal</FormLabel>
                    <FormDescription>Disable this goal if you want to pause tracking</FormDescription>
                  </div>
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} className="accent-primary" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Goal
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

