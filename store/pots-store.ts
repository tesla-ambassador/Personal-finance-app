import { createStore } from "zustand";
import data from "@/data.json";
import { Balance } from "@/@types/data-types";
import { persist } from "zustand/middleware";

export type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type PotsState = {
  pots: Pot[];
  balance: Balance;
};

export type PotsActions = {
  addPot: (newPot: Pot) => void;
  editPot: (id: string, updatedPot: Pot) => void;
  deletePot: (id: string) => void;
  updateTotal: (newTotal: number, id: string) => void;
};

export type PotsStore = PotsState & PotsActions;

const defaultState: PotsState = {
  pots: data.pots,
  balance: data.balance,
};

export const createPotsStore = (initState: PotsState = defaultState) => {
  return createStore<PotsStore>()((set) => ({
    ...initState,
    addPot: (newPot) => set((state) => ({ pots: [...state.pots, newPot] })),
    editPot: (id, updatedPot) =>
      set((state) => ({
        pots: state.pots.map((pot) =>
          pot.theme === id
            ? {
                ...updatedPot,
              }
            : pot
        ),
      })),
    deletePot: (id) =>
      set((state) => ({
        pots: state.pots.filter((pot) => pot.theme !== id),
      })),
    updateTotal: (newTotal, id) =>
      set((state) => ({
        pots: state.pots.map((pot) =>
          pot.theme === id ? { ...pot, total: newTotal } : pot
        ),
      })),
  }));
};
