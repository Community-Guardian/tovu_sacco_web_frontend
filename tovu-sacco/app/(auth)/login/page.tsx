"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import Cookies from 'js-cookie';

// 🔹 Zod Schemas
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password1: z.string().min(6, "Password must be at least 6 characters"),
    password2: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["customer", "admin"], { message: "Please select a valid role" }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

export default function AuthPage() {
  const { login, register, loading, error } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isSignup, setIsSignup] = useState(false);

  // 🔹 Set up forms based on mode
  const form = useForm({
    resolver: zodResolver(isSignup ? SignupSchema : LoginSchema),
    defaultValues: isSignup
      ? { email: "", password1: "", password2: "", role: "" }
      : { email: "", password: "" },
  });
  function redirect(userType: string) {
    if(Cookies.get('accessToken')) { // Redirect based on user type
      if (userType === "customer") {
        router.push("/dashboard")
      } else if (userType === "admin") {
        router.push("/")
      } else {
        router.push("/login")
      }
    }
  }
  // 🔹 Handle form submission
  const onSubmit = async (data: any) => {
    try {
      if (isSignup) {
        const response = await register(data.email, data.password1, data.password2, data.role);
        toast({ title: "Signup Successful", description: "Redirecting to dashboard..." });
        redirect(response.role);
      } else {
        const response = await login(data.email, data.password);
        toast({ title: "Login Successful", description: "Redirecting to dashboard..." });
        redirect(response.role);
      }
      router.replace("/dashboard");
    } catch (err:any) {
      if (err.non_field_errors) {
        toast({ title: "Error", description: err.non_field_errors[0], variant: "destructive" });
      }
      else if (err.email) {
        toast({ title: "Error", description: err.email, variant: "destructive" });
      }
      else if (err.password) {
        toast({ title: "Error", description: err.password, variant: "destructive" });
      }
      else if (err.role) {
        toast({ title: "Error", description: err.role, variant: "destructive" });
      }
      else {
        toast({ title: "Error", description: "An error occurred. Please try again.", variant: "destructive" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md shadow-lg relative">
        {/* Close Button */}
        <button onClick={() => router.push("/")} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <CardHeader>
          <CardTitle className="text-center">{isSignup ? "Create an Account" : "Log in to Your Account"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name={isSignup ? "password1" : "password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Enter password" />
                    </FormControl>
                    <FormMessage>{form.formState.errors[isSignup ? "password1" : "password"]?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Confirm Password Field (Signup only) */}
              {isSignup && (
                <FormField
                  control={form.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Confirm password" />
                      </FormControl>
                      <FormMessage>{form.formState.errors.password2?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              )}

              {/* Role Selection (Signup only) */}
              {isSignup && (
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Controller
                        name="role"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="customer">Customer</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FormMessage>{form.formState.errors.role?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              )}

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Sign Up" : "Log In"}
              </Button>
            </form>
          </Form>

          {/* Toggle Login/Signup */}
          <p className="text-center text-sm mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-primary hover:underline">
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          {/* forgot Password */}
          <p className="text-center text-sm mt-4">
            <button onClick={() => router.push("/forgot-password")} className="text-primary hover:underline"> Forgot Password?</button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
