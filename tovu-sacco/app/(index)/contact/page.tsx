"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8"> {/* Added horizontal padding */}
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
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
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-muted-foreground">
                  123 Sacco Street
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+254 123 456 789</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">info@tovusacco.com</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
              <p className="text-muted-foreground">Sunday: Closed</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8 h-[400px] rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819917806043!2d36.81679511475403!3d-1.2833337990635172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f28f2c7%3A0x7f6d6a1c32e207e5!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1625764215076!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}