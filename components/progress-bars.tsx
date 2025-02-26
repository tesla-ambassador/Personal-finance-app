import React from "react";
import { convertToDollar } from "@/hooks/convert-to-dollar";

export interface ProgressProps {
  target: number;
  total: number;
  theme?: string;
}

export function PotsProgressBar({ target, total, theme }: ProgressProps) {
  const percentage = (total / target) * 100;
  return (
    <div className="space-y-2">
      <div className="relative rounded-lg h-2 w-full bg-[#F8F4F0] overflow-hidden">
        <div
          style={{
            transform: `translateX(-${100 - percentage}%)`,
            backgroundColor: `${theme}`,
          }}
          className={`absolute w-full h-full flex-1 transition-all duration-150 rounded-lg`}
        />
      </div>
      <div className="w-full flex items-center justify-between text-[0.75rem] text-[#B3B3B3]">
        <span className="font-semibold text-[#696868]">
          {Math.round(percentage * 100) / 100}%
        </span>
        <span>Target of {convertToDollar(target)}</span>
      </div>
    </div>
  );
}

interface WithdrawAddPotsProgressBarProps extends ProgressProps {
  type: "Withdraw" | "Add";
  newValue: number;
}

export function WithdrawAddPotsProgressBar({
  target,
  total,
  type,
  newValue,
}: WithdrawAddPotsProgressBarProps) {
  const validatedNewValue = Math.max(
    0,
    Math.min(newValue, type === "Withdraw" ? total : target - total),
  );
  const percentage = (total / target) * 100;
  const newPercentage =
    type === "Add"
      ? ((total + validatedNewValue) / target) * 100
      : ((total - validatedNewValue) / target) * 100;

  const percentageOffsetWithdraw = 100 - newPercentage;
  const percentageOffsetAdd = 100 - (newPercentage - percentage);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[#696868] text-[0.875rem]">Total Saved</span>
        <span className="font-semibold text-[2rem]">
          {type === "Add"
            ? convertToDollar(total + validatedNewValue)
            : convertToDollar(total - validatedNewValue)}
        </span>
      </div>
      <div className="relative h-2 w-full rounded-lg bg-[#F8F4F0] overflow-hidden">
        <div
          style={{
            transform: `translateX(-${100 - percentage}%)`,
          }}
          className={`absolute z-10 w-full h-full flex-1 transition-all duration-150 rounded-l-lg bg-[#201F24] border-r-white border-r-[1px]`}
        />
        {type === "Withdraw" ? (
          <div
            style={{
              transform: `translateX(-${percentageOffsetWithdraw - percentage}%)`,
            }}
            className="absolute bg-[#C94736] w-full h-full flex-1 transition-all duration-150 rounded-r-lg"
          />
        ) : (
          <div
            style={{
              transform: `translateX(-${percentageOffsetAdd - percentage}%)`,
            }}
            className="bg-[#277C78] w-full h-full flex-1 transition-all duration-150 rounded-r-lg"
          />
        )}
      </div>
      <div className="w-full flex items-center justify-between text-[0.75rem] text-[#B3B3B3]">
        <span
          className={`font-semibold text-${
            type === "Withdraw" ? "[#C94736]" : "[#277C78]"
          }`}
        >
          {Math.round(newPercentage * 100) / 100}%
        </span>
        <span>Target of {convertToDollar(target)}</span>
      </div>
    </div>
  );
}

interface BudgetsProgressBarProps {
  theme: string;
  amount: number;
  spent: number;
}

export function BudgetsProgressBar({
  theme,
  amount,
  spent,
}: BudgetsProgressBarProps) {
  const percentage = (spent / amount) * 100;
  return (
    <div className="space-y-4">
      <span className="text-[#696868] text-[0.875rem]">
        Maximum of {convertToDollar(amount)}
      </span>
      <div className="relative rounded-md h-8 w-full bg-[#F8F4F0] overflow-hidden p-1">
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: `${theme}`,
          }}
          className={`h-full flex-1 transition-all duration-150 rounded-md`}
        />
      </div>
      <div className="flex w-full gap-4 items-center justify-between">
        <ProgressBudgetSummary theme={theme} name="Spent" amount={spent} />
        <ProgressBudgetSummary
          theme="[#F8F4F0"
          name="Remaining"
          amount={amount - spent}
        />
      </div>
    </div>
  );
}

interface ProgressBudgetSummaryProps {
  theme: string;
  name: string;
  amount: number;
}
export function ProgressBudgetSummary({
  theme,
  name,
  amount,
}: ProgressBudgetSummaryProps) {
  return (
    <div className="flex items-center gap-4 h-[42px] w-full">
      <div
        className="space-y-2 w-1 h-full rounded-xs"
        style={{ backgroundColor: theme }}
      ></div>
      <div className="space-y-2 flex flex-col">
        <span className="text-[#696868] text-[0.75rem]">{name}</span>
        <span className="font-bold text-[0.875rem] text-[#201F24]">
          {convertToDollar(amount)}
        </span>
      </div>
    </div>
  );
}
