"use client";

import { useState, useEffect } from "react";
import { useSavings } from "@/context/SavingsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { EditGoalDialog } from "./edit-goal-dialog";
import { GoalDetailsDialog } from "./goal-details-dialog";
import { MakeDepositDialog } from "./make-deposit-dialog";
import { SaveToGoalButton } from "@/components/payments/TransactionButtons"; // ✅ Import SaveToGoalButton
import {
  Calendar,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Goal } from "@/types/savings";

export function GoalsList() {
  const { goals, loading, error, deleteGoal, fetchGoals } = useSavings();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed" | string>("all");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDepositDialog, setShowDepositDialog] = useState(false);

  useEffect(() => {
    fetchGoals();
   
  }, [showDepositDialog, showDetailsDialog]);

  const filteredGoals = goals.filter((goal) => {
    const matchesSearch = goal.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && goal.is_active) ||
      (filter === "completed" && Number(goal.current_amount) >= Number(goal.target_amount));
    return matchesSearch && matchesFilter;
  });

  const handleDeleteGoal = async (goal: Goal) => {
    try {
      await deleteGoal(goal.id);
      toast({
        title: "Goal Deleted",
        description: "The savings goal has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          placeholder="Search goals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
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

      {/* Goals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => {
          const remainingAmount = Math.max(
            Number(goal.target_amount) - Number(goal.current_amount),
            0
          );

          return (
            <Card
              key={goal.id}
              className="relative overflow-hidden rounded-lg shadow-lg border transition-all hover:shadow-xl"
              style={{ borderColor: goal.color }}
            >
              {/* Gradient Header */}
              <div
                className="h-14 w-full"
                style={{
                  background: `linear-gradient(to right, ${goal.color}, rgba(255, 255, 255, 0))`,
                }}
              />

              <CardContent className="relative z-10 p-6 space-y-4">
                {/* Title & Actions */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{goal.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedGoal(goal);
                          setShowDetailsDialog(true);
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedGoal(goal);
                          setShowDepositDialog(true);
                        }}
                      >
                        Make Deposit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedGoal(goal);
                          setShowEditDialog(true);
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

                {/* Amounts & Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Saved: {formatCurrency(goal.current_amount)}</span>
                    <span>Target: {formatCurrency(goal.target_amount)}</span>
                  </div>
                  <Progress value={goal.progress_percentage} />

                  {/* Remaining Amount */}
                  {remainingAmount > 0 && (
                    <p className="text-xs text-gray-600">
                      Remaining: {formatCurrency(remainingAmount)}
                    </p>
                  )}
                </div>

                {/* Deadline & Frequency */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <span className="capitalize text-primary">
                    {goal.saving_frequency.toLowerCase()}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex flex-col space-y-2 mt-4">
                  {/* <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedGoal(goal);
                      setShowDepositDialog(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Deposit
                  </Button> */}

                  {/* ✅ Save to Goal Button */}
                  <SaveToGoalButton goalId={goal.id.toString()} accountId={goal.account.toString()} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modals (Mounted Outside the Loop) */}
      {selectedGoal && (
        <>
          <GoalDetailsDialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog} goal={selectedGoal} />
          <MakeDepositDialog open={showDepositDialog} onOpenChange={setShowDepositDialog} goal={selectedGoal} />
          <EditGoalDialog open={showEditDialog} onOpenChange={setShowEditDialog} goal={selectedGoal} />
        </>
      )}
    </div>
  );
}
