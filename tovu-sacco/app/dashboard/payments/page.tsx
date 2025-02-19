"use client";

import React from "react";
import {
  DepositButton,
  WithdrawButton,
  LoanPaymentButton,
  InvestButton,
  SaveToGoalButton,
  MinimumSharesButton,
} from "@/components/payments/TransactionButtons"; // Import buttons

const Payments = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Payments</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DepositButton accountId="ACC4668893311" />
        <WithdrawButton accountId="12345" />
        <LoanPaymentButton accountId="ACC4668893311" />
        <InvestButton investmentId="5" />
        <SaveToGoalButton goal={3} accountId="ACC4668893311" />
        <MinimumSharesButton accountId="12345" />
      </div>
    </div>
  );
};

export default Payments;
