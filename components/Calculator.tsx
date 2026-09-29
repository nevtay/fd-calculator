"use client";
import { useEffect, useState } from "react";
import ChartVisualisation from "./ChartVisualisation";
import PrincipalInput from "./CalculatorInputs/PrincipalInput";
import TenureLengthInput from "./CalculatorInputs/TenureLengthInput";
import AnnualRateInput from "./CalculatorInputs/AnnualRateInput";
import CompoundTypeSelect from "./CalculatorInputs/CompoundTypeSelect";
import SavedEntries from "./SavedEntries";
import {
  growthSeries,
  interestEarned as calculateInterestEarned,
  maturityValue as calculateMaturityValue,
} from "@/lib/utils/finance";
import {
  type CalculatorFormData,
  type Compounding,
  CompoundTypes,
  EntriesStore,
  GrowthSeries,
} from "@/lib/types";

import useEntriesStore from "@/store/useEntriesStore";
import { MAX_SAVED_ENTRIES } from "@/store/useEntriesStore";

const Calculator = () => {
  const saveEntry = useEntriesStore((s: EntriesStore) => s.addEntry);
  const currentEntry = useEntriesStore((s: EntriesStore) => s.currentEntry);
  const entries = useEntriesStore((s: EntriesStore) => s.entries);

  const compoundTypes = {
    monthly: "monthly",
    quarterly: "quarterly",
    annually: "annually",
    maturity: "maturity",
  } as CompoundTypes;

  const defaultState: CalculatorFormData = {
    principal: "",
    annualRate: "",
    tenureLength: "",
    compoundType: compoundTypes.annually,
  };

  const [formData, setFormData] = useState<CalculatorFormData>(defaultState);
  const [maturityValue, setMaturityValue] = useState("");
  const [interestEarned, setInterestEarned] = useState("");
  const [growthSeriesData, setGrowthSeriesData] = useState<GrowthSeries>([
    { month: 0, balance: 0 },
  ]);

  const isValidNumber = (
    key: string,
    currentValue: string,
    allowDecimal: boolean,
  ): boolean => {
    if (/^\d$/.test(key)) {
      return true;
    }
    if (allowDecimal && key === "." && !currentValue.includes(".")) {
      return true;
    }
    return false;
  };

  // sanitize the resulting value so it's digits only, at most one decimal
  // point (or no decimal point at all when allowDecimal is false).
  const sanitizeNumericInput = (
    value: string,
    allowDecimal: boolean,
  ): string => {
    if (!allowDecimal) {
      return value.replace(/[^\d]/g, "");
    }
    const digitsAndDots = value.replace(/[^\d.]/g, "");
    const firstDotIndex = digitsAndDots.indexOf(".");
    if (firstDotIndex === -1) {
      return digitsAndDots;
    }
    if (firstDotIndex === 0 && value.length === 1) {
      return "0" + value;
    }
    return (
      digitsAndDots.slice(0, firstDotIndex + 1) +
      digitsAndDots.slice(firstDotIndex + 1).replace(/\./g, "")
    );
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
    const isRefresh = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r";
    const allowDecimal = e.currentTarget.name !== "tenureLength";
    if (
      !isSelectAll &&
      !isRefresh &&
      !allowedKeys.includes(e.key) &&
      !isValidNumber(e.key, e.currentTarget.value, allowDecimal)
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    let sanitizedValue =
      e.target instanceof HTMLInputElement
        ? sanitizeNumericInput(value, name !== "tenureLength")
        : value;

    if (name === "tenureLength") {
      if (Number(sanitizedValue) > 120) {
        sanitizedValue = "120";
      }
    }
    if (name === "annualRate") {
      const dotIndex = sanitizedValue.indexOf(".");
      if (dotIndex !== -1 && sanitizedValue.length - dotIndex - 1 > 3) {
        sanitizedValue = sanitizedValue.slice(0, dotIndex + 4);
      }
      if (Number(sanitizedValue) > 999) {
        sanitizedValue = "999";
      }
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
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
    ).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    if (result && result.length > 20) {
      setMaturityValue(
        result.slice(0, 20) + ` ... (${result.length - 20} more digits)`,
      );
    } else if (result && result.length <= 20) {
      setMaturityValue(result);
    }
  };

  const getInterestEarned = () => {
    const result = calculateInterestEarned(
      Number(principal),
      Number(annualRate),
      Number(tenureLength),
      compoundType as Compounding,
    ).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    if (result && result.length > 20) {
      setInterestEarned(
        result.slice(0, 20) + ` ... (${result.length - 20} more digits)`,
      );
    } else if (result && result.length <= 20) {
      setInterestEarned(result);
    }
  };

  useEffect(() => {
    if (currentEntry) {
      setFormData({ ...currentEntry });
    }
  }, [currentEntry]);

  useEffect(() => {
    if (!formData.principal || !formData.annualRate || !formData.tenureLength) {
      setMaturityValue("-");
      setInterestEarned("-");
      setGrowthSeriesData([{ month: 0, balance: 0 }]);
    } else {
      getInterestEarned();
      getMaturityValue();

      const growthSeriesData = growthSeries(
        Number(principal),
        Number(annualRate),
        Number(tenureLength),
        compoundType,
      );
      setGrowthSeriesData(growthSeriesData);
    }
  }, [
    formData.principal,
    formData.annualRate,
    formData.tenureLength,
    formData.compoundType,
  ]);

  return (
    <>
      <form className="flex flex-row flex-wrap gap-x-5 gap-y-10">
        <PrincipalInput
          value={formData.principal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <TenureLengthInput
          value={formData.tenureLength}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <AnnualRateInput
          value={formData.annualRate}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <CompoundTypeSelect
          value={formData.compoundType}
          compoundTypes={compoundTypes}
          onChange={handleChange}
        />
        <div className="bg-input-container flex flex-1 flex-col justify-evenly gap-3 rounded-3xl px-4 pt-3.5 pb-6 shadow-[-4px_-4px_8px_var(--skeu-highlight),4px_4px_8px_var(--skeu-shadow)] transition-[scale,box-shadow] max-md:w-12/12">
          <div className="min-w-12/12 text-(--color-body-text) text-shadow-[-1px_-1px_1px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]">
            <h1 className="text-[24px] font-semibold text-(--color-indigo) text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)]">
              <u>Summary</u>
            </h1>
            <h1 className="text-(--color-body-text)">
              Maturity value: {maturityValue ? maturityValue : "-"}
            </h1>
            <h1 className="text-(--color-body-text)">
              Total Interest Earned: {interestEarned ? interestEarned : "-"}
            </h1>
            {entries.length !== 0 && (
              <div className="m-auto mt-5 mb-3 flex flex-col">
                <h1 className="text(--color-indigo) mb-5 text-center font-semibold">
                  Saved Entries
                </h1>
                <SavedEntries />
              </div>
            )}
          </div>
          <ChartVisualisation growthSeriesData={growthSeriesData} />
        </div>
        <div className="m-auto mb-8 flex w-12/12">
          <button
            className="bg-input-container m-auto h-fit w-auto cursor-pointer rounded-2xl px-6 py-2 text-(--color-body-text) shadow-[-0px_-0px_4px_var(--skeu-shadow),4px_4px_4px_var(--skeu-shadow)] text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)] hover:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:mb-5 md:mb-0 md:ml-auto"
            type="reset"
            name="Reset"
            disabled={entries && entries.length >= MAX_SAVED_ENTRIES}
            onClick={() => {
              const { annualRate, compoundType, tenureLength, principal } =
                formData;
              if (!annualRate || !compoundType || !tenureLength || !principal) {
                return;
              } else {
                saveEntry(formData);
              }
            }}
          >
            Save Results
          </button>
          <button
            className="bg-input-container m-auto h-fit w-auto cursor-pointer rounded-2xl px-6 py-2 text-(--color-body-text) shadow-[-0px_-0px_4px_var(--skeu-shadow),4px_4px_4px_var(--skeu-shadow)] text-shadow-[.6px_.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)] hover:scale-90 sm:mb-5 md:mb-0 md:ml-auto"
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
