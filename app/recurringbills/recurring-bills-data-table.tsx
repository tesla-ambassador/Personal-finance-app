import React from "react";

import { DataTable } from "@/components/data-tables/recurring-bills-data-table";
import { recurringBillsColumns } from "@/components/data-tables/recurring-bills-columns";
import { useBudgetStore } from "@/provider/budgets-provider";

export default function RecurringBillsDataTable() {
  const { transactions } = useBudgetStore((state) => state);

  const recurringBills = transactions.filter(
    (transaction) => transaction.recurring === true
  );

  return (
    <div className="mx-auto">
      <DataTable columns={recurringBillsColumns} data={recurringBills} />
    </div>
  );
}
