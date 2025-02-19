"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAccounts } from "@/context/AccountsContext"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { KYC } from "@/types/accounts"

const kycFormSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  marital_status: z.enum(["single", "married", "divorced", "widowed"]),
  gender: z.enum(["male", "female", "other"]),
  identity_type: z.enum(["national_id_card", "drivers_licence", "international_passport"]),
  id_number: z.string().min(5, "ID number must be at least 5 characters"),
  date_of_birth: z.date({
    required_error: "Date of birth is required",
  }),
  kra_pin: z.string().min(8, "KRA PIN must be at least 8 characters"),
  employment_status: z.enum(["employed", "self_employed", "unemployed", "student"]),
  country: z.string().min(2, "Country must be at least 2 characters"),
  county: z.string().min(2, "County must be at least 2 characters"),
  town: z.string().min(2, "Town must be at least 2 characters"),
  contact_number: z.string().min(10, "Contact number must be at least 10 characters"),
})

export function KYCForm() {
  const { toast } = useToast()
  const { kycRecords, createKYC, updateKYC, loading } = useAccounts()
  const [identityImage, setIdentityImage] = useState<File | null>(null)
  const [signature, setSignature] = useState<File | null>(null)
  console.log(kycRecords);
  
  const form = useForm<z.infer<typeof kycFormSchema>>({
    resolver: zodResolver(kycFormSchema),
    defaultValues: kycRecords[0]
      ?{
        ...kycRecords[0],
        marital_status: kycRecords[0].marital_status as "single" | "married" | "divorced" | "widowed",
        date_of_birth: kycRecords[0].date_of_birth ? new Date(kycRecords[0].date_of_birth) : new Date(),
        gender: kycRecords[0].gender as "male" | "female" | "other",
        identity_type: kycRecords[0].identity_type as "national_id_card" | "drivers_licence" | "international_passport",
        employment_status: kycRecords[0].employment_status as "employed" | "self_employed" | "unemployed" | "student",
      }
      : {
          full_name: "",
          marital_status: "single",
          gender: "male",
          identity_type: "national_id_card",
          id_number: "",
          date_of_birth: new Date(),
          kra_pin: "",
          employment_status: "employed",
          country: "",
          county: "",
          town: "",
          contact_number: "",
        },
  })
  
  const onSubmit = async (values: z.infer<typeof kycFormSchema>) => {
    try {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString())
        } else {
          formData.append(key, value)
        }
      })

      if (identityImage) {
        formData.append("identity_image", identityImage)
      }
      if (signature) {
        formData.append("signature", signature)
      }

      if (kycRecords[0]?.membership_number) {
        await updateKYC(kycRecords[0].membership_number, formData as unknown as Partial<KYC>)
        toast({
          title: "KYC Updated",
          description: "Your KYC details have been successfully updated.",
        })
      } else {
        await createKYC(formData as unknown as Partial<KYC>)
        toast({
          title: "KYC Submitted",
          description: "Your KYC details have been successfully submitted.",
        })
      }
    } catch (error: any) {
      // Handle server-side validation errors
      if (error.response?.data) {
        const serverErrors = error.response.data
        Object.keys(serverErrors).forEach((key) => {
          form.setError(key as any, {
            type: "server",
            message: serverErrors[key][0],
          })
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to save KYC details. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                          {field.value instanceof Date ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marital_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identity_type"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Identity Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn(error && "border-destructive")}>
                          <SelectValue placeholder="Select identity type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="national_id_card">National ID</SelectItem>
                        <SelectItem value="drivers_licence">Drives Licence</SelectItem>
                        <SelectItem value="international_passport">International Passport</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
  control={form.control}
  name="id_number"
  render={({ field }) => (
    <FormItem>
      <FormLabel>ID Number</FormLabel>
      <FormControl>
        <Input {...field} readOnly className="cursor-not-allowed bg-gray-200" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              <div className="space-y-2">
                <FormLabel>Identity Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setIdentityImage(e.target.files ? e.target.files[0] : null)}
                />
                <FormDescription>Upload a clear image of your identity document</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Signature</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSignature(e.target.files ? e.target.files[0] : null)}
                />
                <FormDescription>Upload an image of your signature</FormDescription>
              </div>

              <FormField
                control={form.control}
                name="kra_pin"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>KRA PIN</FormLabel>
                    <FormControl>
                      <Input {...field} className={cn(error && "border-destructive")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employment_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self_employed">Self Employed</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>County</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="town"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Town</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_number"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" className={cn(error && "border-destructive")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {kycRecords[0]?.membership_number ? "Update KYC" : "Submit KYC"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

