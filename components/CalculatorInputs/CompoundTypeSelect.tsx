import { CompoundTypes } from "@/lib/types";

type CompoundTypeSelectProps = {
  value: string;
  compoundTypes: CompoundTypes;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CompoundTypeSelect = ({
  value,
  compoundTypes,
  onChange,
}: CompoundTypeSelectProps) => {
  return (
    <div className="bg-input-container flex w-3/12 flex-col justify-between gap-3 self-start rounded-3xl px-5 pt-3.5 pb-6 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)] max-md:w-12/12">
      <label
        className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
        htmlFor="compoundType"
      >
        Compound Type
      </label>
      <div className="relative">
        <select
          name="compoundType"
          value={value}
          className="text-input-value m-0 w-full appearance-none border-b-2 pr-8 outline-0 text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
          onChange={onChange}
          title="compoundType"
        >
          {Object.keys(compoundTypes).map((type) => {
            return (
              <option
                className="text-input-value text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
                key={type}
              >
                {type}
              </option>
            );
          })}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-(--color-indigo)"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
        </svg>
      </div>
    </div>
  );
};

export default CompoundTypeSelect;
