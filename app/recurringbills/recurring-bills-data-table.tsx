import React from "react";

import { DataTable } from "@/components/data-table/data-tables";
import {
  RecurringBills,
  recurringBillsColumns,
} from "@/components/data-table/columns";

import transactions from "@/data.json";

async function getData(): Promise<RecurringBills[]> {
  return transactions.transactions.filter(
    (transaction) => transaction.recurring === true
  );
}

export default async function RecurringBillsDataTable() {
  const recurringBills = await getData();

  return (
    <div className="mx-auto">
      <DataTable columns={recurringBillsColumns} data={recurringBills} />
    </div>
  );
}
