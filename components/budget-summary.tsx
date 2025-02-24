"use client";
import { convertToDollar } from "@/hooks/convert-to-dollar";
import { Separator } from "./ui/separator";
import { useBudgetStore } from "@/provider/budgets-provider";
import { sumOfBudgetCategory } from "@/hooks/some-of-specific-items";
import { BudgetPieChart } from "./budget-chart";

export function BudgetSummaryCard() {
  const { transactions, budgets } = useBudgetStore((state) => state);
  return (
    <div className="mx-auto w-full bg-white rounded-lg px-5 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center md:p-8 md:gap-8 sm:max-w-[688px] desktop:max-w-[608px] desktop:flex-col">
      <div className="w-full">
        <BudgetPieChart />
      </div>
      <div className="w-full">
        <h2 className="font-bold text-[1.25rem] text-[#201F24]">
          Spending Summary
        </h2>
        <div className="mt-6">
          {budgets.map((budget, index) => (
            <div key={index} className="w-full">
              <BudgetSummaryList
                theme={budget.theme}
                category={budget.category}
                maximum={budget.maximum}
                amount={sumOfBudgetCategory(transactions, budget.category)}
              />
              {index !== budgets.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface BudgetSummaryListProps {
  theme: string;
  category: string;
  amount: number;
  maximum: number;
}
export function BudgetSummaryList({
  theme,
  category,
  amount,
  maximum,
}: BudgetSummaryListProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4 h-[42px] w-full">
        <div
          className="space-y-2 w-1 h-full rounded-xs"
          style={{ backgroundColor: theme }}
        ></div>
        <span className="text-[#696868] text-[0.875rem]">{category}</span>
      </div>
      <div className="flex items-center justify-end gap-2 w-full">
        <span className="font-bold text-[#201F24] text-[1rem]">
          {convertToDollar(Math.abs(amount))}
        </span>
        <span className="text-[#696868] text-[0.75rem]">
          of {convertToDollar(maximum)}
        </span>
      </div>
    </div>
  );
}
