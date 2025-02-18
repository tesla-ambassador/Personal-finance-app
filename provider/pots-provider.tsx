"use client";
import React, { createContext, useContext, ReactNode, useRef } from "react";
import { useStore } from "zustand";
import { type PotsStore, createPotsStore } from "@/store/pots-store";

export type PotsStoreAPI = ReturnType<typeof createPotsStore>;

export const PotsStoreContext = createContext<PotsStoreAPI | undefined>(
  undefined
);

interface PotsStoreProviderProps {
  children: ReactNode;
}

export const PotsStoreProvider = ({ children }: PotsStoreProviderProps) => {
  const storeRef = useRef<PotsStoreAPI>(null);
  if (!storeRef.current) {
    storeRef.current = createPotsStore();
  }

  return (
    <PotsStoreContext.Provider value={storeRef.current}>
      {children}
    </PotsStoreContext.Provider>
  );
};

export const usePotsStore = <T,>(selector: (store: PotsStore) => T): T => {
  const potsStoreContext = useContext(PotsStoreContext);

  if (!potsStoreContext) {
    throw new Error(
      `usePotsStoreContext can only be used within the PotsStoreProvider`
    );
  }

  return useStore(potsStoreContext, selector);
};
