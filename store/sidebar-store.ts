import { persist } from "zustand/middleware";
import { createStore } from "zustand";

export type SideBarState = {
  isFullWidth: boolean;
};

export type SideBarActions = {
  setIsFullWidth: () => void;
};

export type SideBarStore = SideBarState & SideBarActions;

const defaultState: SideBarState = {
  isFullWidth: true,
};

export const createSideBarStore = (initState: SideBarState = defaultState) => {
  return createStore<SideBarStore>()(
    persist(
      (set) => ({
        ...initState,
        setIsFullWidth: () =>
          set((state) => ({ isFullWidth: !state.isFullWidth })),
      }),
      { name: "isFullWidth-storage" }
    )
  );
};
