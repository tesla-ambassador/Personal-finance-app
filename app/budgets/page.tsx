import React from "react";
import BudgetsApp from "./budgets-app";
import { BudgetStoreProvider } from "@/provider/budgets-provider";

export default function Budgets() {
  return (
    <BudgetStoreProvider>
      <div className="min-h-screen w-full pb-24">
        <BudgetsApp />
      </div>
    </BudgetStoreProvider>
  );
}
