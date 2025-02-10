"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SlidingHeader from "@/components/ui/SlidingHeader";

export default function SignupPage() {
  const { register, error, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData.email, formData.password1, formData.password2, formData.role);
      router.replace("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <SlidingHeader step="signup" />
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="password1">Password</Label>
          <Input
            id="password1"
            type="password"
            value={formData.password1}
            onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="password2">Confirm Password</Label>
          <Input
            id="password2"
            type="password"
            value={formData.password2}
            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
      <p className="text-center text-sm">
        Already have an account? <a href="/login" className="text-primary">Log in</a>
      </p>
    </div>
  );
}
