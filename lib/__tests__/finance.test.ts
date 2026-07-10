import { describe, expect, it } from "@jest/globals";
import { maturityValue, growthSeries, interestEarned } from "../finance";

describe("maturity value logic", () => {
  it("should return the correct maturity value", () => {
    const principal = 1000;
    const annualRatePercent = 2;
    const tenureMonths = 12;
    const compounding = "annually";

    const finalMaturityValue = maturityValue(
      principal,
      annualRatePercent,
      tenureMonths,
      compounding,
    );

    expect(finalMaturityValue).toEqual(1020);
  });
});

describe("growthSeries logic", () => {
  it("should return a sequential array of objects to show how much a fixed deposit grows every month until end of the given tenure", () => {
    const principal = 1000;
    const annualRatePercent = 2;
    const tenureMonths = 2;
    const compounding = "annually";

    const finalGrowthSeriesValues = growthSeries(
      principal,
      annualRatePercent,
      tenureMonths,
      compounding,
    );

    expect(finalGrowthSeriesValues).toEqual([
      { balance: 1000, month: 0 },
      { balance: 1001.65, month: 1 },
      { balance: 1003.31, month: 2 },
    ]);
  });
});

describe("interestEarned logic", () => {
  it("should return the correct interest earned for a given fixed deposit", () => {
    const principal = 1000;
    const annualRatePercent = 2;
    const tenureMonths = 12;
    const compounding = "annually";

    const finalInterestEarned = interestEarned(
      principal,
      annualRatePercent,
      tenureMonths,
      compounding,
    );

    expect(finalInterestEarned).toEqual(20);
  });
});
