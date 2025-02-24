"use client";
import React from "react";
import { type BudgetStore, createBudgetStore } from "@/store/budgets-store";
import { useStore } from "zustand";

export type BudgetStoreAPI = ReturnType<typeof createBudgetStore>;

export const BudgetStoreContext = React.createContext<
  BudgetStoreAPI | undefined
>(undefined);

interface BudgetStoreProviderProps {
  children: React.ReactNode;
}

export const BudgetStoreProvider = ({ children }: BudgetStoreProviderProps) => {
  const storeRef = React.useRef<BudgetStoreAPI>(null);
  if (!storeRef.current) {
    storeRef.current = createBudgetStore();
  }

  return (
    <BudgetStoreContext.Provider value={storeRef.current}>
      {children}
    </BudgetStoreContext.Provider>
  );
};

export const useBudgetStore = <T,>(selector: (store: BudgetStore) => T): T => {
  const budgetStoreContext = React.useContext(BudgetStoreContext);

  if (!budgetStoreContext) {
    throw new Error(
      `useBudgetStore can only be used within the BudgetStoreProvider`
    );
  }

  return useStore(budgetStoreContext, selector);
};
