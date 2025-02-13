"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LineChart, History, PiggyBank, UserCircle, Bell, LogOut, CreditCard } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/types";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Savings", href: "/dashboard/savings", icon: LineChart },
  { title: "Transactions", href: "/dashboard/transactions", icon: History },
  { title: "Investments", href: "/dashboard/investments", icon: PiggyBank },
  { title: "Loans", href: "/dashboard/loans", icon: CreditCard },
  { title: "Profile", href: "/dashboard/profile", icon: UserCircle },
  { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
];

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* 🔹 User Card */}
      <Card className="p-4 flex items-center gap-3 bg-muted rounded-xl border border-border w-full">
        {/* 🔹 Avatar */}
        <Avatar className="h-12 w-12">
          <AvatarFallback className="text-lg font-semibold">
            {user.first_name[0]}{user.last_name[0]}
          </AvatarFallback>
        </Avatar>

        {/* 🔹 User Info (Prevent Overflow) */}
        <div className="flex flex-col min-w-0">
          <p className="font-semibold text-[15px]">{user.first_name} {user.last_name}</p>

          {/* ✅ Prevent Email Overflow */}
          <div className="text-sm text-gray-600 truncate max-w-[200px]">{user.email}</div>

          <p className="text-xs text-primary font-semibold capitalize mt-1">{user.role}</p>
        </div>
      </Card>


      {/* 🔹 Sidebar Links */}
      <nav className="flex-1 mt-6 space-y-1">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start flex items-center gap-3 px-4 py-2 rounded-md transition",
                pathname === item.href
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-muted hover:text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>

      {/* 🔹 Logout Button */}
      <Button
        variant="ghost"
        className="w-full flex items-center gap-3 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-md transition"
        onClick={() => router.push("/")}
      >
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </div>
  );
}
