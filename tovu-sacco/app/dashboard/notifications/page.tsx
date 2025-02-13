"use client";

import { useNotifications } from "@/context/NotificationContexts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useToast } from "@/hooks/use-toast";

export default function NotificationsPage() {
  const {
    userNotifications,
    adminNotifications,
    markAllAsRead,
    markAsRead,
    loading,
  } = useNotifications();
  const { toast } = useToast();

  const notifications = [...userNotifications, ...adminNotifications].sort(
    (a, b) => dayjs(b.date_sent).valueOf() - dayjs(a.date_sent).valueOf()
  );

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast({
        title: "Success",
        description: "All notifications have been marked as read.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read.",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      toast({
        title: "Marked as Read",
        description: "The notification has been marked as read.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <Button variant="outline" onClick={handleMarkAllAsRead} disabled={loading}>
          <Check className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
          <Bell className="h-10 w-10" />
          <p>No new notifications</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                "transition-colors hover:bg-muted/50",
                !notification.is_read && "border-l-4 border-l-primary"
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {notification.notification_type === "success" ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : notification.notification_type === "warning" ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Info className="h-5 w-5 text-blue-500" />
                    )}
                    <CardTitle>{notification.title}</CardTitle>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {dayjs(notification.date_sent).format("MMM D, YYYY h:mm A")}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-muted-foreground">{notification.message}</p>
                {!notification.is_read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkAsRead(notification.id)}
                    disabled={loading}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
