import React from "react";
import { BudgetStoreProvider } from "@/provider/budgets-provider";
import { TransactionsApp } from "./transactions-app";

export default function Transactions() {
  return (
    <BudgetStoreProvider>
      <TransactionsApp />
    </BudgetStoreProvider>
  );
}
