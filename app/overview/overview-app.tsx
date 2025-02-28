"use client";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-headers";
import {
  SimpleSummaryCard,
  PotsOverviewSummaryCard,
  TransactionListOverview,
  BudgetSummaryOverview,
  RecurringBillsOverview,
} from "./overview-simple-summary-cards";
import { useBudgetStore } from "@/provider/budgets-provider";
import { usePotsStore } from "@/provider/pots-provider";
import { useSideBarStore } from "@/provider/sidebar-provider";
export function OverViewApp() {
  const { pots, balance } = usePotsStore((state) => state);
  const { transactions, budgets } = useBudgetStore((state) => state);
  const { isFullWidth } = useSideBarStore((state) => state);

  const totalPots = useMemo(() => {
    return pots.reduce((acc, curr) => acc + curr.total, 0);
  }, [pots]);

  const totalSummary = useMemo(() => {
    return [
      { id: 1, name: "Current Balance", amount: balance.current },
      { id: 2, name: "Income", amount: balance.income },
      { id: 3, name: "Expenses", amount: balance.expenses },
    ];
  }, []);
  return (
    <div className="min-h-screen w-full pb-24">
      <PageHeader containsForm={false} pageName="Overview" />
      <div className="space-y-8">
        <div className="w-full space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-6 sm:justify-between">
          {totalSummary.map((summary) => (
            <SimpleSummaryCard
              key={summary.id}
              title={summary.name}
              value={summary.amount}
              className={
                summary.id === 1 ? "bg-[#201F24] text-white" : undefined
              }
            />
          ))}
        </div>
        <div className="space-y-6 desktop:flex w-full desktop:gap-6 desktop:space-y-0">
          <div className="space-y-6 w-full xl:space-y-0 xl:flex xl:gap-6 xl:items-center desktop:block desktop:space-y-6 desktop:gap-0">
            <PotsOverviewSummaryCard dataArray={pots} totalPots={totalPots} />
            <TransactionListOverview dataArray={transactions} />
          </div>
          <div className="space-y-6 w-full xl:space-y-0 xl:flex xl:gap-6 desktop:block desktop:space-y-6 desktop:gap-0">
            <BudgetSummaryOverview dataArray={budgets} />
            <RecurringBillsOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
