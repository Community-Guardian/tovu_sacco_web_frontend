"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export function SecuritySettings() {
  const { changePassword, loading } = useAuth()
  const { toast } = useToast()
  const [twoFactor, setTwoFactor] = useState(false)

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      await changePassword(values.newPassword, values.confirmPassword)
      form.reset()
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTwoFactorChange = async (checked: boolean) => {
    try {
      setTwoFactor(checked)
      // Implement 2FA toggle logic here
      toast({
        title: `Two-Factor Authentication ${checked ? "Enabled" : "Disabled"}`,
        description: `Two-factor authentication has been ${checked ? "enabled" : "disabled"} successfully.`,
      })
    } catch (error) {
      setTwoFactor(!checked) // Revert on error
      toast({
        title: "Error",
        description: "Failed to update two-factor authentication settings.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Change Password</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <div className="flex items-center space-x-4">
            <Switch checked={twoFactor} onCheckedChange={handleTwoFactorChange} disabled={loading} />
            <div className="space-y-1">
              <p className="text-sm font-medium">Enable two-factor authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account by requiring both your password and a verification code.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Active Sessions</h3>
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Current Session</p>
                <p className="text-sm text-muted-foreground">Last active: {new Date().toLocaleDateString()}</p>
              </div>
              <Button variant="outline" size="sm">
                End Session
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

