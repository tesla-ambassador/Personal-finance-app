import { createStore } from "zustand";
import data from "@/data.json";
import { persist } from "zustand/middleware";

export type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type PotsState = {
  pots: Pot[];
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
                ...pot,
                name: updatedPot.name,
                theme: updatedPot.theme,
                target: updatedPot.target,
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
