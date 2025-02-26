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
  updateTotal: (newTotal: number, id: string, amountChanged: number) => void;
};

export type PotsStore = PotsState & PotsActions;

const defaultState: PotsState = {
  pots: data.pots,
  balance: data.balance,
};

export const createPotsStore = (initState: PotsState = defaultState) => {
  return createStore<PotsStore>()(
    persist(
      (set) => ({
        ...initState,
        addPot: (newPot) => set((state) => ({ pots: [...state.pots, newPot] })),
        editPot: (id, updatedPot) =>
          set((state) => ({
            pots: state.pots.map((pot) =>
              pot.theme === id
                ? {
                    ...updatedPot,
                  }
                : pot,
            ),
          })),
        deletePot: (id: string) =>
          set((state) => {
            // Find the pot to be deleted (use the proper identifier)
            const potToDelete = state.pots.find((pot) => pot.theme === id);

            // If pot doesn't exist, just return current state
            if (!potToDelete) {
              return state;
            }

            return {
              // Remove the pot from the array
              pots: state.pots.filter((pot) => pot.theme !== id),

              // Update the balance by adding the total from the deleted pot
              balance: {
                ...state.balance,
                current: state.balance.current + potToDelete.total,
              },
            };
          }),
        updateTotal: (newTotal, id, amountChanged) =>
          set((state) => ({
            pots: state.pots.map((pot) =>
              pot.theme === id ? { ...pot, total: newTotal } : pot,
            ),
            balance: {
              ...state.balance,
              current: amountChanged,
            },
          })),
      }),
      { name: "pots-storage" },
    ),
  );
};
