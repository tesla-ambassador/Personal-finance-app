import React, { Suspense } from "react";
import { BudgetStoreProvider } from "@/provider/budgets-provider";
import { TransactionsApp } from "./transactions-app";

export default function Transactions() {
  return (
    <Suspense>
      <BudgetStoreProvider>
        <TransactionsApp />
      </BudgetStoreProvider>
    </Suspense>
  );
}
