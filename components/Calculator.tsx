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
    ).toLocaleString();
    if (result && result.length > 15) {
      setMaturityValue(result.slice(0, 15) + "...");
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
    ).toLocaleString();
    if (result && result.length > 15) {
      setInterestEarned(result.slice(0, 15) + "...");
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
        <div className="w-4/12 pt-3.5 pb-6 px-5 flex flex-col justify-evenly gap-3 bg-input-container rounded-3xl">
          <label
            className="text-(--color-indigo) text-[24px]"
            htmlFor="principal"
          >
            Principal
          </label>
          <input
            className="bg-none border-b-2 outline-0 text-input-value"
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
        <div className="w-auto pt-3.5 pb-6 px-5 flex flex-col justify-evenly gap-3 bg-input-container rounded-3xl">
          <label
            className="text-(--color-indigo) text-[24px]"
            htmlFor="tenureLength"
          >
            Tenure Length (months)
          </label>
          <input
            className="bg-none border-b-2 outline-0 text-input-value"
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
        <div className="w-auto pt-3.5 pb-6 px-5 flex flex-col justify-evenly gap-3 bg-input-container rounded-3xl">
          <label
            className="text-(--color-indigo) text-[24px]"
            htmlFor="annualRate"
          >
            Annual Rate (%)
          </label>
          <input
            className="bg-none border-b-2 outline-0 text-input-value"
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
        <div className="max-h-30 min-w-auto pt-3.5 pb-6 px-5 flex flex-col justify-evenly gap-3 bg-input-container rounded-3xl">
          <label
            className="text-(--color-indigo) text-[24px]"
            htmlFor="compoundType"
          >
            Compound Type
          </label>
          <div className="relative">
            <select
              name="compoundType"
              defaultValue={formData.compoundType}
              className="m-0 w-full border-b-2 pr-8 outline-0 text-input-value appearance-none"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              title="compoundType"
            >
              {Object.keys(compoundTypes).map((type) => {
                return (
                  <option className="text-input-value" key={type}>
                    {type}
                  </option>
                );
              })}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-(--color-indigo)"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
            </svg>
          </div>
        </div>
        <div className="w-5/12 pt-3.5 pb-6 px-5 flex items-center bg-input-container rounded-3xl">
          <div className="min-w-7/12 text-(--color-body-text)">
            <h1 className="text-(--color-indigo) text-[24px]">
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
        <input
          className="mt-5 cursor-pointer bg-input-container text-(--color-body-text) h-fit px-6 py-2 rounded-xl"
          type="reset"
          name="Reset"
          onClick={handleReset}
        />
      </form>
    </>
  );
};

export default Calculator;
