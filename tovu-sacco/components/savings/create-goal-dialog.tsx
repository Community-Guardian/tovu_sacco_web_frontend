"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useSavings } from "@/context/SavingsContext"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { IonIcon } from "@ionic/react"
import type { CreateGoalRequest } from "@/types/savings"
import { useAccounts } from "@/context/AccountsContext"
import { cn } from "@/lib/utils"

// Predefined icons for selection
const ICONS = ["home", "car", "heart", "airplane", "cart", "school", "cash"]

const createGoalSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  target_amount: z.string().min(1, "Target amount is required"),
  deadline: z.date({ required_error: "Deadline is required" }),
  saving_frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "ONCE"]),
  color: z.string().regex(/^#/, "Must be a valid hex color"),
  icon: z.string().optional(),
  is_active: z.boolean(),
  account_id: z.string(),
})

interface CreateGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGoalDialog({ open, onOpenChange }: CreateGoalDialogProps) {
  const { createGoal, loading } = useSavings()
  const { accounts } = useAccounts()
  const [coverIcon, setCoverIcon] = useState<File | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof createGoalSchema>>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: "",
      description: "",
      target_amount: "",
      color: "#3498db",
      saving_frequency: "MONTHLY",
      icon: "home",
      is_active: true,
      account_id: accounts[0]?.account_number || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof createGoalSchema>) => {
    try {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString().split("T")[0])
        } else if (key === 'target_amount') {
          formData.append(key, Number(value).toString()) // Convert to number
        } else {
          formData.append(key, value.toString())
        }
      })

      if (coverIcon) {
        formData.append("cover_icon", coverIcon)
      }
      formData.append("account", values.account_id)

      await createGoal(formData as unknown as Partial<CreateGoalRequest>)
      form.reset()
      onOpenChange(false)

      toast({ title: "Success", description: "Goal created successfully!", variant: "default" })
    } catch (error) {
      console.error("Failed to create goal:", error)
      toast({ title: "Error", description: "Failed to create goal. Try again.", variant: "destructive" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Create New Goal</DialogTitle>
        </DialogHeader>
        <div className="max-h-[75vh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Goal Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter goal name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Optional description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Target Amount */}
              <FormField
                control={form.control}
                name="target_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="1" step="0.01" placeholder="Enter amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deadline */}
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? field.value.toLocaleDateString() : "Pick a date"}
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

              {/* Color Selection */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input {...field} type="color" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Icon Selection */}
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {ICONS.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            <IonIcon name={icon} className="mr-2 h-5 w-5" /> {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Is Active */}
              <FormField control={form.control} name="is_active" render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  <FormLabel>Active Goal</FormLabel>
                </FormItem>
              )} />

              {/* Submit */}
              <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Goal
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
