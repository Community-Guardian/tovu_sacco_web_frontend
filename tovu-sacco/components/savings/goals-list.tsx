"use client"

import { useState } from "react"
import { useSavings } from "@/context/SavingsContext"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { EditGoalDialog } from "./edit-goal-dialog"
import { GoalDetailsDialog } from "./goal-details-dialog"
import { MakeDepositDialog } from "./make-deposit-dialog"
import { AlertCircle, Calendar, MoreVertical, Pencil, PiggyBank, Plus, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Goal } from "@/types/savings"

export function GoalsList() {
  const { goals, loading, error, deleteGoal } = useSavings()
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showDepositDialog, setShowDepositDialog] = useState(false)

  const filteredGoals = goals.filter((goal) => {
    const matchesSearch = goal.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && goal.is_active) ||
      (filter === "completed" && Number(goal.current_amount) >= Number(goal.target_amount))
    return matchesSearch && matchesFilter
  })

  const handleDeleteGoal = async (goal: Goal) => {
    try {
      await deleteGoal(goal.id)
      toast({
        title: "Goal Deleted",
        description: "The savings goal has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the goal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDepositSuccess = () => {
    toast({
      title: "Deposit Successful",
      description: "Your deposit has been successfully processed.",
    })
    setShowDepositDialog(false)
  }

  const handleEditSuccess = () => {
    toast({
      title: "Goal Updated",
      description: "Your savings goal has been successfully updated.",
    })
    setShowEditDialog(false)
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">Failed to load goals</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search goals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter goals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Goals</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => (
          <Card key={goal.id} className="relative overflow-hidden" style={{ borderColor: goal.color }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: goal.color }} />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{goal.name}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedGoal(goal)
                        setShowDetailsDialog(true)
                      }}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedGoal(goal)
                        setShowDepositDialog(true)
                      }}
                    >
                      Make Deposit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedGoal(goal)
                        setShowEditDialog(true)
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteGoal(goal)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="h-4 w-4" />
                    <span>{formatCurrency(Number(goal.current_amount))}</span>
                  </div>
                  <span className="text-muted-foreground">of {formatCurrency(Number(goal.target_amount))}</span>
                </div>
                <Progress value={goal.progress_percentage} />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <span
                    className={
                      goal.saving_frequency === "DAILY"
                        ? "text-blue-500"
                        : goal.saving_frequency === "WEEKLY"
                          ? "text-green-500"
                          : goal.saving_frequency === "MONTHLY"
                            ? "text-purple-500"
                            : "text-orange-500"
                    }
                  >
                    {goal.saving_frequency.toLowerCase()}
                  </span>
                </div>
              </div>

              <Button
                className="mt-4 w-full"
                onClick={() => {
                  setSelectedGoal(goal)
                  setShowDepositDialog(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Deposit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedGoal && (
        <>
          <EditGoalDialog
            goal={selectedGoal}
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            onSuccess={handleEditSuccess}
          />
          <GoalDetailsDialog goal={selectedGoal} open={showDetailsDialog} onOpenChange={setShowDetailsDialog} />
          <MakeDepositDialog
            goal={selectedGoal}
            open={showDepositDialog}
            onOpenChange={setShowDepositDialog}
            onSuccess={handleDepositSuccess}
          />
        </>
      )}
    </div>
  )
}

