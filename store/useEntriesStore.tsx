import { EntriesStore } from "@/lib/types";
import { create } from "zustand";

export const MAX_SAVED_ENTRIES = 3;

/** 
The double-parentheses syntax, also known as currying or a higher-order function, is a structural pattern required by Zustand to properly infer types without making creating redundant code.
1. create<EntriesStore>() is the first function call. It locks in your type definitions (EntriesStore) and returns a second function.
2. ((set) => ({ ... })) is the second function call, which takes your actual store implementation (the state and actions).

Why not just use "create<EntriesStore>((set) => ({...}))"?
1. In older versions of Zustand, it worked exactly like that.
2. However, if you wanted to use store middlewares (like devtools or persist), TypeScript struggled to automatically figure out the types.
*/

const useEntriesStore = create<EntriesStore>()((set) => ({
  entries: [],
  currentEntry: null,
  addEntry: (entry) => {
    set((state) => {
      const newEntry = { ...entry, id: crypto.randomUUID() };
      const updatedEntries = [...state.entries, newEntry];
      if (updatedEntries.length > MAX_SAVED_ENTRIES) {
        updatedEntries.shift();
      }
      return { entries: updatedEntries };
    });
  },
  setCurrentEntry: (selectedEntry) => {
    set(() => ({
      currentEntry: selectedEntry,
    }));
  },
  removeEntry: (id) => {
    set((state) => {
      const updatedEntries = state.entries.filter((entry) => entry.id !== id);
      return {
        entries: updatedEntries,
        currentEntry: id === state.currentEntry?.id ? null : state.currentEntry,
      };
    });
  },
}));

export default useEntriesStore;
