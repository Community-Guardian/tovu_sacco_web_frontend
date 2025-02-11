import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoanApplications } from "./components/loan-applications"
import { LoanPaymentProgress } from "./components/loan-payment-progress"
import { AvailableLoanTypes } from "./components/available-loan-types"
import { ApplyLoanForm } from "./components/apply-loan-form"
import { RepayLoanForm } from "./components/repay-loan-form"

export default function LoansPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-green-800">Loans</h2>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList className="bg-green-100">
          <TabsTrigger value="applications" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            My Loans
          </TabsTrigger>
          <TabsTrigger value="available" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            Available Loans
          </TabsTrigger>
          <TabsTrigger value="apply" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            Apply for Loan
          </TabsTrigger>
          <TabsTrigger value="repay" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            Repay Loan
          </TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          <LoanApplications />
          <LoanPaymentProgress />
        </TabsContent>
        <TabsContent value="available">
          <AvailableLoanTypes />
        </TabsContent>
        <TabsContent value="apply">
          <ApplyLoanForm />
        </TabsContent>
        <TabsContent value="repay">
          <RepayLoanForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

