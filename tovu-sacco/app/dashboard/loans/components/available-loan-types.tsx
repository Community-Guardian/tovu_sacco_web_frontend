"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLoans } from "@/context/LoansContext";
import { useAuth } from "@/context/AuthContext"; // Assuming you have an Auth Context
import { LoanApplication } from "@/types/loans";

export function AvailableLoanTypes() {
  const { loanTypes, fetchLoanTypes, createLoanApplication, loading, error } = useLoans();
  const { user } = useAuth(); // Assuming user context contains logged-in user details
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);
  const [amountRequested, setAmountRequested] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleApply = (loanTypeId: number) => {
    setSelectedLoan(loanTypeId);
  };

  const handleSubmit = async () => {
    if (!selectedLoan || !amountRequested || !dueDate) return;

    const newLoanApplication: Partial<LoanApplication> = {
      loan_type: selectedLoan,
      amount_requested: amountRequested,
      date_requested: new Date().toISOString(),
      due_date: dueDate,
      account: user?.account || "", // Ensure account is fetched from logged-in user
    };

    await createLoanApplication(newLoanApplication);
    setSelectedLoan(null); // Close form after submission
  };

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
              <p>Interest Rate: <span className="font-semibold">{loanType.interest_rate}%</span></p>
              <p>Amount: <span className="font-semibold">KES {loanType.min_amount} - {loanType.max_amount}</span></p>
              <p>Max Duration: <span className="font-semibold">{loanType.max_duration_months} months</span></p>
              <div>
                <p className="font-semibold">Requirements:</p>
                <ul className="list-disc list-inside text-sm">
                  {loanType.requirements.map((req) => (
                    <li key={req.id}>{req.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button 
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleApply(loanType.id)}
            >
              Apply Now
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Loan Application Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Apply for Loan</h2>
            <label className="block mb-2">Amount Requested</label>
            <input
              type="number"
              value={amountRequested}
              onChange={(e) => setAmountRequested(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter amount"
            />
            <label className="block mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-between">
              <Button className="bg-gray-500 hover:bg-gray-600 text-white" onClick={() => setSelectedLoan(null)}>Cancel</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
