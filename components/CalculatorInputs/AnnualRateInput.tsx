type AnnualRateInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const AnnualRateInput = ({ value, onChange, onKeyDown }: AnnualRateInputProps) => {
  return (
    <div className="bg-input-container flex w-3/12 flex-col justify-between rounded-3xl px-5 pt-3.5 pb-6 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)] max-md:w-12/12 md:flex-1 lg:w-4/12">
      <label
        className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
        htmlFor="annualRate"
      >
        Annual Rate (%)
      </label>
      <input
        className="text-input-value [appearance:textfield] border-b-2 bg-none outline-0 text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        title="annualRate"
        name="annualRate"
        type="number"
        max={999}
        maxLength={5}
        inputMode="numeric"
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </div>
  );
};

export default AnnualRateInput;
