"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { useLoans } from "@/context/LoansContext";

export function AvailableLoanTypes() {
  const { loanTypes, fetchLoanTypes, loading, error } = useLoans();

  useEffect(() => {
    fetchLoanTypes();
  }, []);

  if (loading) return <p>Loading loan types...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (loanTypes.length === 0) return <p>No available loan types.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {loanTypes.map((loanType) => (
        <Card key={loanType.id} className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">{loanType.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600 mb-4">{loanType.description}</p>
            <div className="space-y-2 text-green-700">
              <p>
                Interest Rate: <span className="font-semibold">{loanType.interest_rate}%</span>
              </p>
              <p>
                Amount: <span className="font-semibold">KES {loanType.min_amount} - {loanType.max_amount}</span>
              </p>
              <p>
                Max Duration: <span className="font-semibold">{loanType.max_duration_months} months</span>
              </p>
              <div>
                <p className="font-semibold">Requirements:</p>
                <ul className="list-disc list-inside text-sm">
                  {loanType.requirements.map((req) => (
                    <li key={req.id}>{req.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">Apply Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
