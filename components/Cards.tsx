import React from "react";
import transactions from "@/data.json";
import { RecurringBills } from "./data-table/columns";
import { aggregateData } from "@/hooks/recurring-bills-summary";
import { convertToDollar, sumOfNumbers } from "@/hooks/convert-to-dollar";

const billSummary = [
  {
    id: 1,
    name: "Paid Bills",
  },
  {
    id: 2,
    name: "Total Upcoming",
  },
  {
    id: 3,
    name: "Due Soon",
  },
];

export async function getData(): Promise<RecurringBills[]> {
  return transactions.transactions.filter(
    (transaction) => transaction.recurring === true
  );
}

export async function RecurringBillsSummary() {
  const data = await getData();
  const amounts = data.map((transaction) => Math.abs(transaction.amount));
  return (
    <div className="space-y-6 sm:flex sm:justify-between sm:space-y-0 sm:gap-6 xl:flex-col xl:gap-6">
      <div className="bg-[#201F24] text-white rounded-lg p-6 flex items-center gap-6 sm:flex-col sm:justify-center sm:gap-14 sm:items-start w-full">
        <div className="w-12 sm:w-fit">
          <img
            src="/images/icon-recurring-bills.svg"
            alt="Recurring Bills"
            className="object-cover object-center"
          />
        </div>
        <div className="mt-6 flex flex-col sm:mt-3">
          <span className="font-semibold">Total Bills</span>
          <span className="text-2xl sm:text-4xl py-4 sm:pt-4 sm:pb-0 font-bold">{convertToDollar(sumOfNumbers(amounts))}</span>
        </div>
      </div>
      <div className="bg-white rounded-lg p-5 space-y-5 w-full">
        <h1 className="font-semibold">Summary</h1>
        <div className="w-full">
          {billSummary.map((summary) => (
            <div
              key={summary.id}
              className={`flex justify-between items-start ${
                summary.name === "Due Soon"
                  ? "text-[#C94736] pt-5"
                  : "text-[#696868] py-5 border-b-2 border-[#F2F2F2]"
              }`}
            >
              <p>{summary.name}</p>
              <p
                className={`${
                  summary.name === "Due Soon"
                    ? "text-[#C94736]"
                    : "text-[#201F24]"
                } font-bold`}
              >
                <span className="mr-1">
                  {aggregateData(summary.name).counter}
                </span>
                {convertToDollar(aggregateData(summary.name).total)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
