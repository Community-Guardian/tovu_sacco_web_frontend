import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: "1",
    title: "Loan Approved",
    message: "Your loan application has been approved. Funds will be disbursed within 24 hours.",
    date: "2024-01-25 14:30",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "New Investment Opportunity",
    message: "Check out our new high-yield fixed deposit offering 10.5% returns.",
    date: "2024-01-24 09:15",
    type: "info",
    read: true,
  },
  // Add more notifications as needed
]

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <Button variant="outline">
          <Check className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={cn("transition-colors hover:bg-muted/50", !notification.read && "border-l-4 border-l-primary")}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {notification.type === "success" ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Info className="h-5 w-5 text-blue-500" />
                  )}
                  <CardTitle>{notification.title}</CardTitle>
                </div>
                <span className="text-sm text-muted-foreground">{notification.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{notification.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

