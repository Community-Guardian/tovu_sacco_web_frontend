import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoanApplications } from "./components/loan-applications"
import { AvailableLoanTypes } from "./components/available-loan-types"

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
        
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          <LoanApplications />
        </TabsContent>
        <TabsContent value="available">
          <AvailableLoanTypes />
        </TabsContent>
      
      </Tabs>
    </div>
  )
}

