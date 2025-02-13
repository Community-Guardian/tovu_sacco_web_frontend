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
import { Calendar, CheckCircle2, Clock, Target, XCircle } from 'lucide-react'
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

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(goal.deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    )
  )

  const dailyTargetAmount =
    daysLeft > 0
      ? (Number(goal.target_amount) - Number(goal.current_amount)) / daysLeft
      : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{goal.name}</DialogTitle>
          <DialogDescription>{goal.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Progress Card */}
          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Progress</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(Number(goal.current_amount))}
                  </p>
                </div>
                <Target className="h-5 w-5 text-muted-foreground" />
              </div>
              <Progress value={goal.progress_percentage} className="mt-4" />
              <p className="mt-2 text-xs text-muted-foreground">
                {goal.progress_percentage}% of {formatCurrency(Number(goal.target_amount))}
              </p>
            </CardContent>
          </Card>

          {/* Time Left Card */}
          <Card className="shadow-sm border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Time Left</p>
                  <p className={`text-2xl font-bold ${daysLeft === 0 ? "text-red-500" : ""}`}>
                    {daysLeft} days
                  </p>
                </div>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Target daily saving: {formatCurrency(Math.max(0, dailyTargetAmount))}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Milestones & Reminders */}
        <Tabs defaultValue="milestones" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          {/* Milestones Tab */}
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

            <div className="space-y-2 max-h-[250px] overflow-y-auto">
              {goalMilestones.length > 0 ? (
                goalMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${
                      milestone.achieved ? "bg-green-100 border-green-400" : "bg-white"
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {formatCurrency(Number(milestone.milestone_amount))}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due by {new Date(milestone.milestone_date).toLocaleDateString()}
                      </p>
                    </div>
                    {milestone.achieved ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center">No milestones yet.</p>
              )}
            </div>
          </TabsContent>

          {/* Reminders Tab */}
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

            <div className="space-y-2 max-h-[250px] overflow-y-auto">
              {goalReminders.length > 0 ? (
                goalReminders.map((reminder) => (
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
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center">No reminders yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals for Creating Milestones & Reminders */}
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
