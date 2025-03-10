import { createStore } from "zustand";
import data from "@/data.json";
import { Transaction, Balance } from "@/@types/data-types";
import { persist } from "zustand/middleware";

export type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

export type BudgetState = {
  budgets: Budget[];
  transactions: Transaction[];
  balance: Balance;
};

export type BudgetActions = {
  createBudget: (newBudget: Budget) => void;
  deleteBudget: (id: string) => void;
  editBudget: (id: string, updatedBudget: Budget) => void;
};

export type BudgetStore = BudgetState & BudgetActions;

const defaultState: BudgetState = {
  budgets: data.budgets,
  transactions: data.transactions,
  balance: data.balance,
};

export const createBudgetStore = (initState: BudgetState = defaultState) => {
  return createStore<BudgetStore>()(
    persist(
      (set) => ({
        ...initState,
        createBudget: (newBudget) =>
          set((state) => ({ budgets: [...state.budgets, newBudget] })),
        deleteBudget: (id) =>
          set((state) => ({
            budgets: state.budgets.filter((budget) => budget.theme !== id),
          })),
        editBudget: (id, updatedBudget) =>
          set((state) => ({
            budgets: state.budgets.map((budget) =>
              budget.theme === id ? { ...updatedBudget } : budget,
            ),
          })),
      }),
      { name: "budget-storage" },
    ),
  );
};
