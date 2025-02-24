"use client";
import React from "react";
import { PageHeader } from "@/components/icons/page-headers";
import { BudgetCard } from "@/components/budgets-cards";
import { useBudgetStore } from "@/provider/budgets-provider";
import { BudgetSummaryCard } from "@/components/budget-summary";

export default function BudgetsApp() {
  const { budgets } = useBudgetStore((state) => state);
  return (
    <>
      <div>
        <PageHeader
          containsForm={true}
          pageName="Budget"
          uploadFormType="budget"
        />
      </div>
      <div className="flex flex-col gap-6 desktop:flex-row desktop:items-start">
        <BudgetSummaryCard />
        <div className="space-y-6 w-full">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.theme}
              category={budget.category}
              maxAmount={budget.maximum}
              theme={budget.theme}
            />
          ))}
        </div>
      </div>
    </>
  );
}
