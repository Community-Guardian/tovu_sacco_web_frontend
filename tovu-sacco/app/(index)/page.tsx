import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Users, CheckCircle2, Wallet, PiggyBank } from "lucide-react";
import { Percent, Smartphone, GraduationCap, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServicesGrid } from "@/components/services-grid";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-4 lg:pt-8 m-auto"> {/* Further reduced margin-top */}
        <div className="container relative px-4 md:px-8"> {/* Horizontal padding remains */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                EMPOWER YOUR{" "}
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  FINANCIAL FUTURE
                </span>
              </h1>
              <p className="mb-6 text-xl text-muted-foreground">
                Join Tovu Sacco today and experience a new way of managing your finances. Save, borrow, and grow your
                wealth with our community-focused solutions.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-primary text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-background bg-primary/20"
                      >
                        <Image
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdxC0dJuj6AmMr-jQs2YW1gXf0a_sNudyw9Q&s"
                          alt={`Member ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary/20 text-sm font-medium text-primary">
                      +50k
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Joined by over 50,000 members</p>
                </div>
              </div>
              <div className="mt-12 flex gap-8 border-t pt-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-12 w-12 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">KES 5B+</div>
                    <div className="text-sm text-muted-foreground">Assets Under Management</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-12 w-12 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">50,000+</div>
                    <div className="text-sm text-muted-foreground">Active Members</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 to-primary-dark/20 blur-3xl" />
              <div className="relative">
                <Image
                  src="https://i.insider.com/65567c184ca513d8242af58d?width=1200&format=jpeg"
                  width={500}
                  height={600}
                  alt="Goal Based Savings Process"
                  className="relative mx-auto rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* How It Works Section */}
      <section className="relative overflow-hidden bg-muted/50 py-24 m-auto px-4 md:px-8"> {/* Added horizontal padding */}
        <div className="container relative z-10">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Goal Based Savings</h2>
            <p className="text-lg text-muted-foreground">Follow our proven process to achieve your financial goals</p>
          </div>
          <div className="grid gap-8 md:grid-cols-5">
            {[
              {
                step: "1",
                title: "1. Be a Member",
                description: "Join our growing community",
                icon: Users,
              },
              {
                step: "2",
                title: "2. Set Your Goal",
                description: "Define your financial targets",
                icon: CheckCircle2,
              },
              {
                step: "3",
                title: "3. Start Saving",
                description: "Begin your savings journey",
                icon: Wallet,
              },
              {
                step: "4",
                title: "4. Top-Up by Tovu",
                description: "Get boosted by our rewards",
                icon: PiggyBank,
              },
              {
                step: "5",
                title: "5. Celebrate Success",
                description: "Achieve your financial goals",
                icon: Shield,
              }
            ].map((item) => (
              <Card key={item.step} className="relative overflow-hidden border-none bg-background/60 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 m-auto px-4 md:px-8"> {/* Added horizontal padding */}
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Why Choose Tovu Sacco</h2>
            <p className="text-lg text-muted-foreground">
              Experience the advantages of being part of our growing financial community
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Competitive Interest Rates",
                description: "Enjoy some of the best savings and loan rates in the market",
                icon: Percent,
              },
              {
                title: "Digital Banking",
                description: "Access your account 24/7 through our modern digital platforms",
                icon: Smartphone,
              },
              {
                title: "Financial Education",
                description: "Regular workshops and resources to improve your financial literacy",
                icon: GraduationCap,
              },
              {
                title: "Quick Loan Processing",
                description: "Get loan decisions within 24 hours of application",
                icon: Clock,
              },
              {
                title: "Flexible Savings Plans",
                description: "Choose from various savings products to meet your goals",
                icon: PiggyBank,
              },
              {
                title: "Member Dividends",
                description: "Share in our success through annual dividend payments",
                icon: DollarSign,
              },
            ].map((benefit) => (
              <Card key={benefit.title} className="border-none bg-muted/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-muted/50 py-16 w-full px-4 md:px-8"> {/* Added horizontal padding */}
        <div className="container relative z-10 m-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of members who trust Tovu Sacco with their financial future
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Link href="/membership">
                <Button size="lg" className="bg-primary min-w-[200px]">
                  Join Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}