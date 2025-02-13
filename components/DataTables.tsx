"use client";
import React, { useCallback, useState } from "react";
import transactions from "@/data.json";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCaption,
  TableCell,
  TableHead,
} from "./ui/table";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  getDateOfMonth,
  getDuePayment,
} from "@/hooks/recurring-dates-formatter";
import { BillDueIcon, BillPaidIcon } from "./icons/success-error-icons";
import { SearchIcon } from "./icons/search-icon";

const sortValues = [
  {
    id: 1,
    value: "Latest",
  },
  {
    id: 2,
    value: "Oldest",
  },
  {
    id: 3,
    value: "A to Z",
  },
  {
    id: 4,
    value: "Z to A",
  },
  {
    id: 5,
    value: "Highest",
  },
  {
    id: 6,
    value: "Lowest",
  },
];

export function RecurringBillsDataTables() {
  const [selectValue, setSelectValue] = useState<string>(sortValues[0].value);

  const handleSort = (value: string) => {
    setSelectValue(value);
  };

  return (
    <div className="bg-white rounded-xl mt-6 p-8 w-full max-w-[700px]">
      <div className="w-full flex justify-between items-center">
        <div className="relative flex items-center w-full max-w-[320px]">
          <Input
            placeholder="Search Bills"
            className="border-[#98908B] w-full px-5 py-3"
          />
          <div className="absolute right-5">
            <SearchIcon className="size-5 stroke-[0.5] opacity-50 stroke-[#98908B]" />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-[#696868]">Sort By</span>
          <div className="w-[110px]">
            <Select defaultValue={selectValue} onValueChange={handleSort}>
              <SelectTrigger className="w-full border-[#98908B]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="sr-only">Sorting style</SelectLabel>
                  {sortValues.map((sortValue) => (
                    <SelectItem key={sortValue.id} value={sortValue.value}>
                      {sortValue.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption className="sr-only">
            This is a table showing all recurring bills
          </TableCaption>
          <TableHeader className="mt-6">
            <TableRow>
              <TableHead>Bill Title</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="mt-6">
            {transactions.transactions.map(
              (transaction, index) =>
                transaction.recurring && (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-3">
                      <div className="rounded-full overflow-hidden w-10 h-10">
                        <img
                          src={transaction.avatar.replace("assets/", "")}
                          alt="Profile"
                          className="object-cover object-center"
                        />
                      </div>
                      <span>{transaction.name}</span>
                    </TableCell>
                    <TableCell
                      className={`${
                        getDuePayment(
                          new Date("2024-08-19T14:23:11Z"),
                          new Date(transaction.date)
                        ) === false && "text-[#277C78]"
                      } ${
                        getDuePayment(
                          new Date("2024-08-19T14:23:11Z"),
                          new Date(transaction.date)
                        ) === true && "text-[#C94736]"
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <span>
                          Monthly-{getDateOfMonth(new Date(transaction.date))}
                        </span>
                        <div>
                          {getDuePayment(
                            new Date("2024-08-19T14:23:11Z"),
                            new Date(transaction.date)
                          ) === false && <BillPaidIcon />}
                          {getDuePayment(
                            new Date("2024-08-19T14:23:11Z"),
                            new Date(transaction.date)
                          ) === true && <BillDueIcon />}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
