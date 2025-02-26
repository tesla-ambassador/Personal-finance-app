"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Recipient/Sender",
    cell: ({ row }) => {
      return (
        <div className="flex sm:items-center gap-3">
          <div className="rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10">
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
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="sm:text-center pl-[2.75rem] sm:pl-0">
          <span>{row.getValue("category")}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "date",
    header: () => <div>Transaction Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = new Intl.DateTimeFormat("en-UK", {
        dateStyle: "medium",
      }).format(date);

      return (
        <div>
          <span>{formattedDate}</span>
        </div>
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-end">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div
          className={`font-semibold text-right ${
            amount > 0 ? "text-[#277C78]" : "text-[#201F24]"
          }`}
        >
          {formatted}
        </div>
      );
    },
  },
];
