"use client";

import { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/dashboard/sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export function DashboardHeader() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6 pt-4">
      {/* Mobile Sidebar Toggle Button */}
      <Button variant="ghost" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex flex-1 items-center gap-2">
        <h2 className="text-lg font-semibold m-auto">Welcome back, {user?.first_name || "User"}</h2>
      </div>

      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex bg-black/50 top-14"
        >
          <div className="w-64 bg-white dark:bg-gray-900 h-full p-6 shadow-lg">
            <Button variant="ghost" className="absolute top-4 right-4" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
            {user && <Sidebar user={user} />}
          </div>
        </motion.div>
      )}
    </header>
  );
}
