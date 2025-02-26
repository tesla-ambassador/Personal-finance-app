"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  getOrdinalSuffix,
  getDuePayment,
} from "@/hooks/recurring-dates-formatter";
import { BillDueIcon, BillPaidIcon } from "../icons/success-error-icons";

export type RecurringBills = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

export const recurringBillsColumns: ColumnDef<RecurringBills>[] = [
  {
    accessorKey: "name",
    header: "Bill Title",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden w-10 h-10">
            <img
              src={row.original.avatar.replace("assets/", "")}
              alt="Profile"
              className="object-cover object-center"
            />
          </div>
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div>Due Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = new Intl.DateTimeFormat("en-Us", {
        day: "numeric",
      }).format(date);

      return (
        <div
          className={`${
            getDuePayment(new Date("2024-08-19T14:23:11Z"), new Date(date)) ===
              false && "text-[#277C78]"
          } ${
            getDuePayment(new Date("2024-08-19T14:23:11Z"), new Date(date)) ===
              true && "text-[#C94736]"
          }`}
        >
          <div className="flex gap-3 items-center">
            <span>
              Monthly-
              {formattedDate + getOrdinalSuffix(parseInt(formattedDate))}
            </span>
            <div>
              {getDuePayment(
                new Date("2024-08-19T14:23:11Z"),
                new Date(date)
              ) === false && <BillPaidIcon />}
              {getDuePayment(
                new Date("2024-08-19T14:23:11Z"),
                new Date(date)
              ) === true && <BillDueIcon />}
            </div>
          </div>
        </div>
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-end">Amount</div>,
    cell: ({ row }) => {
      const amount = Math.abs(parseFloat(row.getValue("amount")));
      const formatted = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div
          className={`font-semibold text-right ${
            getDuePayment(
              new Date("2024-08-19T14:23:11Z"),
              new Date(row.original.date)
            ) === false && "text-[#201F24]"
          } ${
            getDuePayment(
              new Date("2024-08-19T14:23:11Z"),
              new Date(row.original.date)
            ) === true && "text-[#C94736]"
          }`}
        >
          {formatted}
        </div>
      );
    },
  },
];
