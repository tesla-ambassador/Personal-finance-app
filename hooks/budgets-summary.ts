import { Transaction } from "@/@types/data-types";
import { Budget } from "@/store/budgets-store";

export function sumOfBudgets(budgets: Budget[]): number {
  let totalBudgets = 0;
  budgets.forEach((budget) => (totalBudgets += budget.maximum));
  return totalBudgets;
}

export function sumOfTransactions(
  budgets: Budget[],
  transactions: Transaction[]
) {
  let totalTransactions = 0;
  transactions.forEach((transaction) => {
    if (budgets.some((budget) => budget.category === transaction.category)) {
      totalTransactions += transaction.amount;
    }
  });
  return Math.abs(totalTransactions);
}
