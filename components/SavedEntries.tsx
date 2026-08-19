import useEntriesStore from "@/store/useEntriesStore";
import { CalculationEntry } from "@/lib/types";

const SavedEntries = () => {
  const entries = useEntriesStore((s: any) => s.entries) as CalculationEntry[];
  return (
    <>
      <div className="m-auto flex w-auto flex-row gap-5 md:ml-10">
        {entries?.length > 0 &&
          entries.map((entry: CalculationEntry, idx: number) => (
            <div
              key={entry.id}
              className="relative flex w-30 flex-col justify-center rounded-2xl border border-dotted py-4 text-center text-(--color-body-text)"
            >
              <h2 className="cursor-pointer">Result {idx + 1}</h2>
              <button
                type="button"
                className="absolute top-[1] right-1 h-5 w-5 cursor-pointer rounded-3xl text-[16px] text-(--color-indigo)"
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
