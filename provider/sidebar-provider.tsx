"use client"
import React, { createContext, useContext, ReactNode, useState } from "react";
import { useStore } from "zustand";
import { type SideBarStore, createSideBarStore } from "@/store/sidebar-store";

// First step is to create a the store api
export type SideBarStoreAPI = ReturnType<typeof createSideBarStore>;

// Second step is to create the store context
export const SideBarStoreContext = createContext<SideBarStoreAPI | undefined>(
  undefined
);

// We provide the provider props
interface SideBarStoreProviderProps {
  children: ReactNode;
}

// I then create the provider
export const SideBarStoreProvider = ({
  children,
}: SideBarStoreProviderProps) => {
  const [store] = useState(() => createSideBarStore());

  return (
    <SideBarStoreContext.Provider value={store}>
      {children}
    </SideBarStoreContext.Provider>
  );
};

// I then create the useStore function that will enable us to provide the store

export const useSideBarStore = <T,>(
  selector: (store: SideBarStore) => T
): T => {
  const sideBarStoreContext = useContext(SideBarStoreContext);

  if (!sideBarStoreContext) {
    throw new Error(
      `useSideBarContext can only be used within SideBarStoreProvider`
    );
  }

  return useStore(sideBarStoreContext, selector);
};
