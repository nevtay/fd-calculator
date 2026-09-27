import { CalculationEntry } from "@/lib/types";
import { create } from "zustand";

export const MAX_SAVED_ENTRIES = 3;

const useEntriesStore = create((set) => ({
  entries: [],
  currentEntry: {},
  addEntry: (entry: CalculationEntry) => {
    set((state: any) => {
      const newEntry = { ...entry, id: crypto.randomUUID() };
      const updatedEntries = [...state.entries, newEntry];
      if (updatedEntries.length > MAX_SAVED_ENTRIES) {
        updatedEntries.shift();
      }
      return { entries: updatedEntries };
    });
  },
  setCurrentEntry: (selectedEntry: CalculationEntry) => {
    set(() => ({
      currentEntry: selectedEntry,
    }));
  },
  removeEntry: (id: string) => {
    set((state: any) => {
      const updatedEntries = [...state.entries].filter(
        (entry: CalculationEntry) => entry.id !== id,
      );
      return {
        entries: updatedEntries,
        currentEntry: id === state?.currentEntry?.id ? {} : state?.currentEntry,
      };
    });
  },
}));

export default useEntriesStore;
