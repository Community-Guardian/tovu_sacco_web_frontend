"use client"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAccounts } from "@/context/AccountsContext"
import { Loader2, Plus, Trash2 } from "lucide-react"

const nextOfKinSchema = z.object({
  nextOfKins: z.array(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      relationship: z.string().min(2, "Relationship must be at least 2 characters"),
      contact_number: z.string().min(10, "Contact number must be at least 10 characters"),
    }),
  ),
})

export function NextOfKinForm() {
  const { toast } = useToast()
  const { nextOfKins, createNextOfKin, updateNextOfKin, deleteNextOfKin, loading } = useAccounts()

  const form = useForm<z.infer<typeof nextOfKinSchema>>({
    resolver: zodResolver(nextOfKinSchema),
    defaultValues: {
      nextOfKins: nextOfKins.length ? nextOfKins : [{ name: "", relationship: "", contact_number: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "nextOfKins",
  })

  const onSubmit = async (values: z.infer<typeof nextOfKinSchema>) => {
    try {
      // Handle updates and creations for each next of kin
      const promises = values.nextOfKins.map((kin, index) => {
        if (nextOfKins[index]?.id) {
          return updateNextOfKin(nextOfKins[index].id, kin)
        } else {
          return createNextOfKin(kin)
        }
      })

      await Promise.all(promises)

      toast({
        title: "Next of Kin Updated",
        description: "Your next of kin details have been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save next of kin details. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (index: number) => {
    try {
      if (nextOfKins[index]?.id) {
        await deleteNextOfKin(nextOfKins[index].id)
        toast({
          title: "Next of Kin Deleted",
          description: "Next of kin has been successfully deleted.",
        })
      }
      remove(index)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete next of kin. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next of Kin Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-4 rounded-lg border p-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name={`nextOfKins.${index}.name`}
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
                  name={`nextOfKins.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`nextOfKins.${index}.contact_number`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="mt-8"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ name: "", relationship: "", contact_number: "" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Next of Kin
            </Button>

            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

