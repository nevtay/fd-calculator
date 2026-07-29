"use client";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./Theme/ThemeToggle";
import {
  growthSeries,
  interestEarned as calculateInterestEarned,
  maturityValue as calculateMaturityValue,
  Compounding,
} from "@/lib/finance";

export interface CompoundTypes {
  monthly: "monthly";
  quarterly: "quarterly";
  annually: "annually";
  maturity: "maturity";
}

const Calculator = () => {
  const compoundTypes = {
    monthly: "monthly",
    quarterly: "quarterly",
    annually: "annually",
    maturity: "maturity",
  } as CompoundTypes;

  const defaultState = {
    principal: "",
    annualRate: "",
    tenureLength: "",
    compoundType: compoundTypes.monthly,
  };

  const [formData, setFormData] = useState(defaultState);
  const [maturityValue, setMaturityValue] = useState("");
  const [interestEarned, setInterestEarned] = useState("");

  const isValidNumber = (key: string, currentValue: string): boolean => {
    if (/^\d$/.test(key)) return true;
    if (key === "." && !currentValue.includes(".")) return true;
    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ];
    const isSelectAll = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a";
    if (
      !isSelectAll &&
      !allowedKeys.includes(e.key) &&
      !isValidNumber(e.key, e.currentTarget.value)
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(defaultState);
    setInterestEarned("-");
    setMaturityValue("-");
  };

  const { principal, annualRate, tenureLength, compoundType } = formData;

  const getMaturityValue = () => {
    const result = calculateMaturityValue(
      Number(principal),
      Number(annualRate),
      Number(tenureLength),
      compoundType as Compounding,
    ).toLocaleString("en-US", { maximumFractionDigits: 2 });
    if (result && result.length > 15) {
      setMaturityValue(result.slice(0, 15) + " ...");
    } else if (result && result.length <= 15) {
      setMaturityValue(result);
    }
  };

  const getInterestEarned = () => {
    const result = calculateInterestEarned(
      Number(principal),
      Number(annualRate),
      Number(tenureLength),
      compoundType as Compounding,
    ).toLocaleString("en-US", { maximumFractionDigits: 2 });

    if (result && result.length > 15) {
      setInterestEarned(result.slice(0, 15) + " ...");
    } else if (result && result.length <= 15) {
      setInterestEarned(result);
    }
  };

  useEffect(() => {
    if (!formData.principal || !formData.annualRate || !formData.tenureLength) {
      setMaturityValue("-");
      setInterestEarned("-");
    } else {
      getInterestEarned();
      getMaturityValue();
    }
  }, [
    formData.principal,
    formData.annualRate,
    formData.tenureLength,
    formData.compoundType,
  ]);

  return (
    <>
      <form className="flex flex-row flex-wrap gap-12.5">
        <div className="bg-input-container flex w-4/12 flex-col justify-evenly gap-3 rounded-3xl px-5 pt-3.5 pb-6 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)] max-md:w-12/12">
          <label
            className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
            htmlFor="principal"
          >
            Principal
          </label>
          <label
            className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
            htmlFor="principal"
          ></label>
          <input
            className="text-input-value border-b-2 bg-none outline-0 text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
            title="principal"
            name="principal"
            type="text"
            inputMode="numeric"
            defaultValue={formData.principal}
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="bg-input-container flex w-auto flex-col justify-evenly gap-3 rounded-3xl px-5 pt-3.5 pb-6 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)] max-md:w-12/12">
          <label
            className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
            htmlFor="tenureLength"
          >
            Tenure Length (months)
          </label>
          <input
            className="text-input-value border-b-2 bg-none outline-0 text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
            title="tenureLength"
            name="tenureLength"
            type="text"
            inputMode="numeric"
            defaultValue={formData.tenureLength}
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="bg-input-container flex w-auto flex-col justify-evenly gap-3 rounded-3xl px-5 pt-3.5 pb-6 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)] max-md:w-12/12">
          <label
            className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
            htmlFor="annualRate"
          >
            Annual Rate (%)
          </label>
          <input
            className="text-input-value border-b-2 bg-none outline-0 text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
            title="annualRate"
            name="annualRate"
            type="text"
            inputMode="numeric"
            defaultValue={formData.annualRate}
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="bg-input-container flex min-w-auto flex-col justify-evenly gap-3 rounded-3xl px-5 pt-3.5 pb-6 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)] max-md:w-12/12">
          <label
            className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
            htmlFor="compoundType"
          >
            Compound Type
          </label>
          <div className="relative">
            <select
              name="compoundType"
              defaultValue={formData.compoundType}
              className="text-input-value m-0 w-full appearance-none border-b-2 pr-8 outline-0 text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
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
        <div className="bg-input-container flex w-5/12 items-center rounded-3xl px-5 pt-3.5 pb-6 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] duration-200 ease-in-out hover:scale-95 hover:shadow-[-2px_-2px_4px_var(--skeu-highlight),2px_2px_4px_var(--skeu-shadow)] max-md:w-12/12">
          <div className="min-w-7/12 text-(--color-body-text) text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]">
            <h1 className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]">
              <u>Summary</u>
            </h1>
            <h1 className="text-(--color-body-text)">
              Maturity value: {maturityValue ? maturityValue : "-"}
            </h1>
            <h1 className="text-(--color-body-text)">
              Interest Earned: {interestEarned ? interestEarned : "-"}
            </h1>
          </div>
        </div>
        <div className="m-auto mb-8 flex w-12/12">
          <button
            className="bg-input-container m-auto h-fit w-auto cursor-pointer rounded-2xl px-6 py-2 text-(--color-body-text) shadow-[-0px_-0px_4px_var(--skeu-shadow),4px_4px_4px_var(--skeu-shadow)] text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)] hover:scale-90 md:ml-auto"
            type="reset"
            name="Reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default Calculator;
