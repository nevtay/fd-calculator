"use client";
import { useEffect, useState } from "react";
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
    <form className="flex flex-col border-2">
      <div className="w-9/12 p-2 flex items-center">
        <label className="w-4/12 mr-2" htmlFor="principal">
          Principal
        </label>
        <input
          className="border-2"
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
      <div className="w-9/12 p-2 flex items-center">
        <label className="w-4/12 mr-2" htmlFor="annualRate">
          Rate
        </label>
        <input
          className="border-2"
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
      <div className="w-9/12 p-2 flex items-center">
        <label className="w-4/12 mr-2" htmlFor="tenureLength">
          Tenure Length (months)
        </label>
        <input
          className="border-2"
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
      <div className="w-9/12 p-2 flex items-center">
        <label className="w-4/12 mr-2" htmlFor="compoundType">
          Compound Type
        </label>
        <select
          name="compoundType"
          title="compoundType"
          defaultValue={formData.compoundType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
        >
          {compoundTypes.map((type) => {
            return <option key={type}>{type}</option>;
          })}
        </select>
      </div>
      <div className="w-9/12 p-2 flex items-center">
        <input type="reset" name="Reset" onClick={handleReset} />
      </div>

      <div className="p-2">
        <h1>
          <u>Summary</u>
        </h1>
        <h1>Maturity value: {maturityValue ? maturityValue : "-"}</h1>
        <h1>Interest Earned: {interestEarned ? interestEarned : "-"}</h1>
      </div>
    </form>
  );
};

export default Calculator;
