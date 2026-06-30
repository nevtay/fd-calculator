"use client";
import { useState } from "react";

const Calculator = () => {
  const compoundTypes = ["monthly", "quarterly", "annually", "maturity"];
  const defaultState = {
    principal: "",
    annualRate: "",
    tenureLength: "",
    compoundType: "monthly",
  };

  const [formData, setFormData] = useState(defaultState);

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
    if (
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

  const handleReset = () => setFormData(defaultState);

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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
        <h1>Principal: {formData.principal || "0.00"}</h1>
        <h1>Annual Rate: {formData.annualRate || 0}% `</h1>
        <h1>
          Tenure: {formData.tenureLength || 0}{" "}
          {parseInt(formData?.tenureLength) === 1 ? "month" : "months"}
        </h1>
        <h1>Compound Type: {formData.compoundType || 0}</h1>
      </div>
    </form>
  );
};

export default Calculator;
