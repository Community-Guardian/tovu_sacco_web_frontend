"use client"

import { motion } from "framer-motion"
import { Briefcase, Zap, Users, Wallet, Home, Car, GraduationCap, HeartHandshake, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ServicesGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Quick Access Features */}
          <motion.div variants={item} className="lg:col-span-3">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-4 rounded-lg bg-primary/10 p-4 transition-colors hover:bg-primary/20">
                    <Zap className="h-6 w-6 text-primary" />
                    <div className="text-sm font-medium">Instant Access</div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-primary/10 p-4 transition-colors hover:bg-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                    <div className="text-sm font-medium">1000 BOB Membership</div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-primary/10 p-4 transition-colors hover:bg-primary/20">
                    <Wallet className="h-6 w-6 text-primary" />
                    <div className="text-sm font-medium">Flexible Loan Amounts</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Service Cards */}
          <motion.div variants={item}>
            <Card className="group h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Start a Business</CardTitle>
                <CardDescription>Get the capital you need to start or expand your business venture</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Business loans up to 5M KES</li>
                  <li>• Flexible repayment terms</li>
                  <li>• Business advisory services</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="group h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Buy Land</CardTitle>
                <CardDescription>Invest in your future with our land purchase financing options</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Up to 80% financing</li>
                  <li>• Extended repayment periods</li>
                  <li>• Title deed processing support</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="group h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Buy a Car</CardTitle>
                <CardDescription>Get on the road with our competitive car financing solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• New and used car financing</li>
                  <li>• Competitive interest rates</li>
                  <li>• Quick approval process</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

         

          <motion.div variants={item}>
            <Card className="group h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Save for Education</CardTitle>
                <CardDescription>Invest in knowledge with our education savings plans</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Special education savings accounts</li>
                  <li>• Higher interest rates</li>
                  <li>• Flexible withdrawal terms</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="group h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Emergency Loans</CardTitle>
                <CardDescription>Quick financial support for unexpected situations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Rapid approval process</li>
                  <li>• Flexible repayment options</li>
                  <li>• Available 24/7</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="group h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Home Renovation</CardTitle>
                <CardDescription>Revamp your living space with our renovation financing options</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Up to 90% financing</li>
                  <li>• Quick approval and disbursement</li>
                  <li>• Support for various renovation projects</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

