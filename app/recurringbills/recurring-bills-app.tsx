"use client";
import React from "react";
import { RecurringBillsSummary } from "@/components/Cards";
import RecurringBillsDataTable from "./recurring-bills-data-table";

export default function RecurringBillsApp() {
  return (
    <div className="min-h-screen w-full pb-24">
      <div className="py-8">
        <h1 className="text-[2rem] font-bold">Recurring Bills</h1>
      </div>
      <div className="w-full xl:flex xl:gap-6">
        <div className="mx-auto xl:w-full xl:max-w-[21.063rem]">
          <RecurringBillsSummary />
        </div>
        <div className="bg-white p-5 sm:p-8 mt-6 rounded-lg mx-auto xl:mt-0 xl:w-full">
          <RecurringBillsDataTable />
        </div>
      </div>
    </div>
  );
}
