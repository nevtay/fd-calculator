import { CalculationEntry } from "@/lib/types";
import { create } from "zustand";

const useEntriesStore = create((set) => ({
  entries: [],
  addEntry: (entry: CalculationEntry) => {
    entry["id"] = crypto.randomUUID();
    console.log("ENTRY IS", entry);
    set((state: any) => ({
      entries: [...state.entries, entry],
    }));
  },
  removeEntry: (id: string) =>
    set((state: any) => ({
      entries: state.entries.filter(
        (entry: CalculationEntry) => entry.id !== id,
      ),
    })),
}));

export default useEntriesStore;
