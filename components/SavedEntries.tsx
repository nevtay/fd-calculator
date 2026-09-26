import useEntriesStore from "@/store/useEntriesStore";
import { CalculationEntry } from "@/lib/types";

const SavedEntries = () => {
  const entries = useEntriesStore((s: any) => s.entries) as CalculationEntry[];
  const removeEntry = useEntriesStore((s: any) => s.removeEntry);
  const setCurrentEntry = useEntriesStore((s: any) => s.setCurrentEntry);
  return (
    <>
      <div className="m-auto flex w-auto flex-row gap-5 md:ml-10">
        {entries?.length > 0 &&
          entries.map((entry: CalculationEntry) => (
            <div
              key={entry.id}
              className="bg-input-container relative flex aspect-square w-28 cursor-pointer flex-col items-center justify-center rounded-3xl px-3 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)]"
              onClick={() => setCurrentEntry(entry)}
            >
              <h2 className="text-input-value line-clamp-3 text-center text-xs break-all text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]">
                {entry.id}
              </h2>
              <button
                type="button"
                title="Remove saved entry"
                className="absolute top-2 right-2 flex size-5 cursor-pointer items-center justify-center rounded-full text-(--color-indigo) hover:scale-90"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEntry(entry.id);
                }}
              >
                <svg
                  className="size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                >
                  <path d="M5 5L15 15M15 5L5 15" />
                </svg>
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default SavedEntries;
