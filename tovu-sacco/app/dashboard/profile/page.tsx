"use client"

import { useState } from "react"
import { useAccounts } from "@/context/AccountsContext"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/profile/personal-info-form"
import { SecuritySettings } from "@/components/profile/security-settings"
import { KYCForm } from "@/components/profile/kyc-form"
import { NextOfKinForm } from "@/components/profile/next-of-kin-form"

export default function ProfilePage() {
  const { toast } = useToast()
  const { accounts, kycRecords, loading } = useAccounts()
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and set your preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="kyc">KYC Details</TabsTrigger>
          <TabsTrigger value="next-of-kin">Next of Kin</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="kyc">
          <KYCForm />
        </TabsContent>

        <TabsContent value="next-of-kin">
          <NextOfKinForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

