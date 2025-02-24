import { Transaction } from "@/@types/data-types";

export function sumOfBudgetCategory(
  arr: Transaction[],
  category: string
): number {
  const budgetsOnly: number[] = [];
  arr.forEach((item) => {
    item.category === category ? budgetsOnly.push(item.amount) : item;
  });
  return budgetsOnly.reduce((sum, current) => sum + current, 0);
}
