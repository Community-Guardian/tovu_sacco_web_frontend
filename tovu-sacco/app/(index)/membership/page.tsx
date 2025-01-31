"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation";

export default function MembershipPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    employmentStatus: "",
    monthlyIncome: "",
    agreeToTerms: false,
  })
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    router.replace('dashboard')
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Join Tovu Sacco</h1>
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-1/3 h-2 rounded ${i <= step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
            <p className="text-center text-muted-foreground">
              Step {step} of 3:{" "}
              {step === 1 ? "Personal Information" : step === 2 ? "Financial Information" : "Review & Submit"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Select
                    value={formData.employmentStatus}
                    onValueChange={(value) => setFormData({ ...formData, employmentStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (KES)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Review Your Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-muted-foreground">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{formData.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium">ID Number</p>
                      <p className="text-muted-foreground">{formData.idNumber}</p>
                    </div>
                    <div>
                      <p className="font-medium">Employment Status</p>
                      <p className="text-muted-foreground">{formData.employmentStatus}</p>
                    </div>
                    <div>
                      <p className="font-medium">Monthly Income</p>
                      <p className="text-muted-foreground">KES {formData.monthlyIncome}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the terms and conditions
                  </label>
                </div>
              </>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={() => setStep(step + 1)} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={!formData.agreeToTerms} className="ml-auto">
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

