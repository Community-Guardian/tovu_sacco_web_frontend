"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SlidingHeader from "@/components/ui/SlidingHeader";

export default function LoginPage() {
  const { login, error, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      router.replace("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <SlidingHeader step="login" />
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="text-center text-sm">
        Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
      </p>
    </div>
  );
}
