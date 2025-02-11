"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSavings } from "@/context/SavingsContext"
import { Calendar, CheckCircle2, Clock, Target } from 'lucide-react'
import { formatCurrency } from "@/lib/utils"
import { CreateMilestoneDialog } from "./create-milestone-dialog"
import { CreateReminderDialog } from "./create-reminder-dialog"
import type { Goal } from "@/types/savings"

interface GoalDetailsDialogProps {
  goal: Goal
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GoalDetailsDialog({
  goal,
  open,
  onOpenChange,
}: GoalDetailsDialogProps) {
  const { milestones, reminders } = useSavings()
  const [showMilestoneDialog, setShowMilestoneDialog] = useState(false)
  const [showReminderDialog, setShowReminderDialog] = useState(false)

  const goalMilestones = milestones.filter((m) => m.goal === goal.id)
  const goalReminders = reminders.filter((r) => r.goal === goal.id)

  const daysLeft = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  )

  const dailyTargetAmount =
    (Number(goal.target_amount) - Number(goal.current_amount)) / daysLeft

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{goal.name}</DialogTitle>
          <DialogDescription>{goal.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Progress</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(Number(goal.current_amount))}
                  </p>
                </div>
                <Target className="h-4 w-4 text-muted-foreground" />
              </div>
              <Progress
                value={goal.progress_percentage}
                className="mt-4"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {goal.progress_percentage}% of{" "}
                {formatCurrency(Number(goal.target_amount))}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Time Left</p>
                  <p className="text-2xl font-bold">{daysLeft} days</p>
                </div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Target daily saving:{" "}
                {formatCurrency(Math.max(0, dailyTargetAmount))}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="milestones" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Milestones</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMilestoneDialog(true)}
              >
                Add Milestone
              </Button>
            </div>

            <div className="space-y-2">
              {goalMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {formatCurrency(Number(milestone.milestone_amount))}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due by {new Date(milestone.milestone_date).toLocaleDateString()}
                    </p>
                  </div>
                  {milestone.achieved && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Reminders</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReminderDialog(true)}
              >
                Add Reminder
              </Button>
            </div>

            <div className="space-y-2">
              {goalReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{reminder.reminder_type}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(reminder.reminder_date).toLocaleString()}
                    </p>
                  </div>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <CreateMilestoneDialog
          goal={goal}
          open={showMilestoneDialog}
          onOpenChange={setShowMilestoneDialog}
        />

        <CreateReminderDialog
          goal={goal}
          open={showReminderDialog}
          onOpenChange={setShowReminderDialog}
        />
      </DialogContent>
    </Dialog>
  )
}
