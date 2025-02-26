import React from "react";
import { BudgetStoreProvider } from "@/provider/budgets-provider";
import RecurringBillsApp from "./recurring-bills-app";

export default function RecurringBills() {
  return (
    <BudgetStoreProvider>
      <RecurringBillsApp />
    </BudgetStoreProvider>
  );
}
