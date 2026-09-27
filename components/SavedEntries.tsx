import useEntriesStore from "@/store/useEntriesStore";
import { CalculationEntry } from "@/lib/types";

const SavedEntries = () => {
  const entries = useEntriesStore((s: any) => s.entries) as CalculationEntry[];
  const removeEntry = useEntriesStore((s: any) => s.removeEntry);
  const setCurrentEntry = useEntriesStore((s: any) => s.setCurrentEntry);
  return (
    <>
      <div className="mx-auto flex w-auto flex-row flex-wrap justify-center gap-8">
        {entries?.length > 0 &&
          entries.map((entry: CalculationEntry) => (
            <div
              key={entry.id}
              className="bg-input-container align relative flex aspect-square h-30 w-42 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-indigo-400 px-0 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)]"
              onClick={() => setCurrentEntry(entry)}
            >
              <div className="text-input-value flex w-auto flex-col px-2 text-center text-xs text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]">
                <span className="row-wrap flex items-center justify-between">
                  <span className="text-left font-bold text-(--color-indigo)">
                    Principal:
                  </span>{" "}
                  <span className="mr-auto pl-1">
                    {" "}
                    {Number(entry.principal).toFixed(2) || 0}
                  </span>
                </span>
                <span className="row-wrap flex items-center justify-between">
                  <span className="font-bold text-(--color-indigo)">
                    Tenure:
                  </span>{" "}
                  <span className="mr-auto pl-1">
                    {entry.tenureLength || 0} months
                  </span>
                </span>
                <span className="row-wrap flex items-center justify-between">
                  <span className="font-bold text-(--color-indigo)">
                    Annual Rate:
                  </span>{" "}
                  <span className="mr-auto pl-1">{entry?.annualRate}%</span>
                </span>
                <span className="row-wrap flex items-center justify-between">
                  <span className="text-left font-bold text-(--color-indigo)">
                    Compound Type:
                  </span>{" "}
                  <span className="mr-auto pl-1">
                    {entry.compoundType
                      .split("")
                      .map((letter, idx) => {
                        return idx === 0
                          ? (letter = letter.toUpperCase())
                          : letter;
                      })
                      .join("")}
                  </span>
                </span>
              </div>
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
