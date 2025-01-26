"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, LineChart, History, PiggyBank, UserCircle, Bell, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analysis",
    href: "/dashboard/analysis",
    icon: LineChart,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: History,
  },
  {
    title: "Investments",
    href: "/dashboard/investments",
    icon: PiggyBank,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-4">
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
      <Button variant="ghost" className="justify-start gap-2 text-destructive">
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </div>
  )
}

