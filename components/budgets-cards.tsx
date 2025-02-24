"use client";
import React from "react";
import { EllipsisDropdown } from "./ellipsis-dropdown";
import { BudgetsProgressBar } from "./progress-bars";
import { CaretRightIcon } from "./icons/chevron-icons";
import { Button } from "./ui/button";
import { useBudgetStore } from "@/provider/budgets-provider";
import { convertToDollar } from "@/hooks/convert-to-dollar";
import { Transaction } from "@/@types/data-types";
import { Separator } from "./ui/separator";
import { sumOfBudgetCategory } from "@/hooks/some-of-specific-items";

interface Budget {
  category: string;
  theme: string;
  maxAmount: number;
}

export function BudgetCard({ category, theme, maxAmount }: Budget) {
  const { transactions } = useBudgetStore((state) => state);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [itemCount, setItemCount] = React.useState<number>(3);

  const categoryArray: Transaction[] = transactions.filter(
    (transaction) => transaction.category === category
  );

  function toggleSeeMore() {
    setIsExpanded(!isExpanded);
    setItemCount(!isExpanded ? categoryArray.length : 3);
    console.log(categoryArray.slice(0, itemCount).length);
  }

  return (
    <div className="mx-auto bg-white px-5 py-6 space-y-5 rounded-lg sm:p-8 w-full sm:max-w-[688px] desktop:max-w-[608px]">
      {/* Card Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            style={{ background: `${theme}` }}
            className="w-4 h-4 rounded-full"
          />
          <h3 className="font-bold text-[#201F24] text-[1.25rem]">
            {category}
          </h3>
        </div>
        <EllipsisDropdown
          name={category}
          type="budget"
          amount={maxAmount.toString()}
          theme={theme}
        />
      </div>
      {/* Card Body */}
      <div>
        <BudgetsProgressBar theme={theme} amount={maxAmount} spent={Math.abs(sumOfBudgetCategory(transactions, category))} />
      </div>
      {/* Card Footer */}
      <div className="bg-[#F8F4F0] p-4 rounded-lg sm:p-5">
        <div className="pb-5 w-full flex items-center justify-between">
          <h4 className="font-bold text-[1rem] text-[#201F24]">
            Latest Spending
          </h4>
          {categoryArray.length > 3 && (
            <Button
              onClick={toggleSeeMore}
              variant={"link"}
              className="hover:no-underline gap-x-2 p-0"
            >
              <span className="text-[#696868] text-[0.875rem]">
                {isExpanded ? "Show Less" : "Show More"}
              </span>
              <CaretRightIcon
                className={`fill-[#696868] ${
                  isExpanded ? "rotate-90" : "rotate-0"
                } transiton-all duration-200 ease-in-out`}
              />
            </Button>
          )}
        </div>
        <div>
          {categoryArray
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, itemCount)
            .map((transaction, index) => (
              <div key={index} className="w-full">
                <div
                  key={index}
                  className="transition-all duration-200 ease-in-out w-full flex justify-between items-center py-3"
                >
                  <div className="flex gap-3 items-center">
                    <div className="hidden proMax:block overflow-hidden rounded-full h-8 w-8">
                      <img
                        className="object-cover object-center"
                        src={transaction.avatar.replace("assets/", "")}
                        alt="Avatar"
                      />
                    </div>
                    <span className="font-bold">{transaction.name}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold">
                      {convertToDollar(transaction.amount)}
                    </span>
                    <span>
                      {Intl.DateTimeFormat("en-UK", {
                        dateStyle: "medium",
                      }).format(new Date(transaction.date))}
                    </span>
                  </div>
                </div>
                {isExpanded
                  ? index !== categoryArray.length - 1 && (
                      <Separator className="bg-[#696868] opacity-[15%]" />
                    )
                  : index !== 2 && (
                      <Separator className="bg-[#696868] opacity-[15%]" />
                    )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
