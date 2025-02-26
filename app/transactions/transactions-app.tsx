"use client";
import React from "react";
import { TransactionDataTable } from "@/components/data-tables/transactions-data-table";
import { transactionsColumns } from "@/components/data-tables/transactions-columns";
import { useBudgetStore } from "@/provider/budgets-provider";
import { PageHeader } from "@/components/page-headers";

export function TransactionsApp() {
  const { transactions } = useBudgetStore((state) => state);
  return (
    <div className="min-h-screen w-full pb-24 lg:pb-12">
      <PageHeader containsForm={false} pageName="Transactions" />
      <div className="bg-white p-5 sm:p-8 rounded-lg mx-auto xl:w-full">
        <TransactionDataTable
          data={transactions}
          columns={transactionsColumns}
        />
      </div>
    </div>
  );
}
