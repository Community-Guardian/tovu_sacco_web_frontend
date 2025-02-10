"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LineChart, History, PiggyBank, UserCircle, Bell, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Ensure you have an Avatar component
import { Card } from "@/components/ui/card"; // Import your card component
import { User } from "@/types";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Analysis", href: "/dashboard/analysis", icon: LineChart },
  { title: "Transactions", href: "/dashboard/transactions", icon: History },
  { title: "Investments", href: "/dashboard/investments", icon: PiggyBank },
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
      {/* User Card */}
      <Card className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.first_name} {user.last_name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>
      </Card>

      {/* Sidebar Items */}
      <div className="flex-1 space-y-1">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant="ghost" className={cn("w-full justify-start gap-2", pathname === item.href && "bg-muted")}>
              <item.icon className="h-5 w-5" />
              {item.title}
            </Button>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <Button variant="ghost" className="justify-start gap-2 text-destructive" onClick={() => router.push("/")}>
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </div>
  );
}
