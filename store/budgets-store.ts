import { createStore } from "zustand";
import data from "@/data.json";
import { Transaction } from "@/@types/data-types";

export type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

export type BudgetState = {
  budgets: Budget[];
  transactions: Transaction[];
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
};

export const createBudgetStore = (initState: BudgetState = defaultState) => {
  return createStore<BudgetStore>()((set) => ({
    ...initState,
    createBudget: (newBudget) =>
      set((state) => ({ budgets: [...state.budgets, newBudget] })),
    deleteBudget: (id) =>
      set((state) => ({
        budgets: state.budgets.filter((budget) => budget.category !== id),
      })),
    editBudget: (id, updatedBudget) =>
      set((state) => ({
        budgets: state.budgets.map((budget) =>
          budget.category === id ? { ...updatedBudget } : budget
        ),
      })),
  }));
};
