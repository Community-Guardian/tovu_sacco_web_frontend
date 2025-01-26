import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PiggyBank, Wallet, Briefcase, LineChart, Smartphone, TrendingUp } from "lucide-react"

const services = [
  {
    title: "Savings Accounts",
    description: "Grow your wealth with our competitive interest rates and flexible savings options.",
    icon: PiggyBank,
  },
  {
    title: "Personal Loans",
    description: "Access affordable loans for personal needs, education, or emergencies.",
    icon: Wallet,
  },
  {
    title: "Business Loans",
    description: "Fuel your business growth with our tailored business loan products.",
    icon: Briefcase,
  },
  {
    title: "Financial Advisory",
    description: "Get expert advice to help you make informed financial decisions.",
    icon: LineChart,
  },
  {
    title: "Mobile Banking",
    description: "Manage your accounts, transfer funds, and pay bills from your smartphone.",
    icon: Smartphone,
  },
  {
    title: "Investment Options",
    description: "Explore various investment opportunities to diversify your portfolio.",
    icon: TrendingUp,
  },
]

export default function Services() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary/5 border-2 border-transparent hover:border-primary/20"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

