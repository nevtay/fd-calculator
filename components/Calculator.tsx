"use client";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./Theme/ThemeToggle";
import {
  growthSeries,
  interestEarned as calculateInterestEarned,
  maturityValue as calculateMaturityValue,
  Compounding,
} from "@/lib/finance";

const Calculator = () => {
  const compoundTypes = ["monthly", "quarterly", "annually", "maturity"];
  const defaultState = {
    principal: "",
    annualRate: "",
    tenureLength: "",
    compoundType: "monthly",
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
    setMaturityValue(
      calculateMaturityValue(
        Number(principal),
        Number(annualRate),
        Number(tenureLength),
        compoundType as Compounding,
      ).toLocaleString(),
    );
  };

  const getInterestEarned = () => {
    setInterestEarned(
      calculateInterestEarned(
        Number(principal),
        Number(annualRate),
        Number(tenureLength),
        compoundType as Compounding,
      ).toLocaleString(),
    );
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
        <div className="min-w-4/12 pt-2.5 pb-5 px-5 flex flex-col border-2 gap-3 dark:bg-input-bg rounded-3xl">
          <label
            className="text-(--color-indigo) text-[24px]"
            htmlFor="principal"
          >
            Principal
          </label>
          <input
            className="border-2 text-(--color-body-text)"
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
        <div className="min-w-2/12 pt-2.5 pb-5 px-5 flex flex-col gap-3 dark:bg-input-bg rounded-3xl">
          <label
            className="text-(--color-indigo) text-[24px]"
            htmlFor="annualRate"
          >
            Rate
          </label>
          <input
            className="border-2 text-(--color-body-text)"
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
        <div className="min-w-3/12 pt-2.5 pb-5 px-5 flex flex-col gap-3 dark:bg-input-bg rounded-3xl">
          <label
            className="text-(--color-indigo) text-[24px]"
            htmlFor="tenureLength"
          >
            Tenure Length (months)
          </label>
          <input
            className="border-2 text-(--color-body-text)"
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
        <div className="max-h-30 min-w-3/12 pt-2.5 pb-5 px-5 flex flex-col justify-center  gap-3 dark:bg-input-bg rounded-3xl">
          <label
            className="text-(--color-indigo) text-[24px]"
            htmlFor="compoundType"
          >
            Compound Type
          </label>
          <select
            name="compoundType"
            defaultValue={formData.compoundType}
            className="p-0 m-0 border-2 text-(--color-body-text)"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            title="compoundType"
          >
            {compoundTypes.map((type) => {
              return (
                <option className="text-(--color-body-text)" key={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-5/12 pt-2.5 pb-5 px-5 flex items-center dark:bg-input-bg rounded-3xl">
          <div className="min-w-7/12 text-(--color-body-text)">
            <h1 className="text-(--color-indigo) text-[24px]">
              <u>Summary</u>
            </h1>
            <h1>Maturity value: {maturityValue ? maturityValue : "-"}</h1>
            <h1>Interest Earned: {interestEarned ? interestEarned : "-"}</h1>
          </div>
        </div>
        <input
          className="mt-5 cursor-pointer"
          type="reset"
          name="Reset"
          onClick={handleReset}
        />
      </form>
    </>
  );
};

export default Calculator;
