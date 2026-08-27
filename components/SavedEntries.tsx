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
          entries.map((entry: CalculationEntry, idx: number) => (
            <div
              key={entry.id}
              className="relative flex w-30 flex-col justify-center rounded-2xl border border-dotted py-4 text-center text-(--color-body-text)"
              onClick={() => {
                setCurrentEntry(entries.find((e) => e?.id === entry?.id));
              }}
            >
              <h2 className="cursor-pointer">Result {entry.id}</h2>
              <button
                type="button"
                className="absolute top-[1] right-1 h-5 w-5 cursor-pointer rounded-3xl text-[16px] text-(--color-indigo)"
                onClick={() => removeEntry(entry.id)}
              >
                x
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default SavedEntries;
