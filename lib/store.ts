import { create } from "zustand";
import { type Compounding } from "./finance";

interface SavedCalc {
  id: string;
  name: string;
  principal: number;
  annualRate: number;
  tenureMonths: number;
  compounding: Compounding;
}

interface CalcState {
  history: SavedCalc[];
  saveCalc: (calc: Omit<SavedCalc, "id">) => void;
  removeCalc: (id: string) => void;
  clearHistory: () => void;
}

export const useCalcStore = create<CalcState>((set) => ({
  history: [],
  saveCalc: (calc) =>
    set((state) => ({
      history: [...state.history, { ...calc, id: crypto.randomUUID() }],
    })),
  removeCalc: (id) =>
    set((state) => ({ history: state.history.filter((c) => c.id !== id) })),
  clearHistory: () => set({ history: [] }),
}));
