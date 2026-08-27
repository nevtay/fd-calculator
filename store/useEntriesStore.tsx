import { CalculationEntry } from "@/lib/types";
import { create } from "zustand";

const useEntriesStore = create((set) => ({
  entries: [],
  currentEntry: {},
  addEntry: (entry: CalculationEntry) => {
    set((state: any) => {
      const newEntry = { ...entry, id: crypto.randomUUID() };
      const updatedEntries = [...state.entries];
      if (state.entries.length > 2) {
        updatedEntries.push(newEntry);
        updatedEntries.pop();
      } else {
        updatedEntries.push(newEntry);
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
        currentEntry:
          id === state?.currentEntry?.id ? null : state?.currentEntry,
      };
    });
  },
}));

export default useEntriesStore;
