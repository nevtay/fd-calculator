import { describe, expect, it } from "@jest/globals";
import { maturityValue, growthSeries, interestEarned } from "../finance";

describe("Maturity Value Calculation", () => {
  describe("when using maturity-based (simple) compounding", () => {
    it("should apply linear simple interest across a multi-year tenure without intermediate compound steps", () => {
      const principal = 1000;
      const annualRatePercent = 2;
      const tenureMonths = 23;
      const compounding = "maturity";

      const finalMaturityValue = maturityValue(
        principal,
        annualRatePercent,
        tenureMonths,
        compounding,
      );

      expect(finalMaturityValue).toEqual(1038.33);
    });
  });

  describe("when using periodic discrete compounding", () => {
    it("should accurately stack exponential growth monthly and correctly round the final balance to two decimal places", () => {
      const principal = 1000;
      const annualRatePercent = 2;
      const tenureMonths = 12;
      const compounding = "monthly";

      const finalMaturityValue = maturityValue(
        principal,
        annualRatePercent,
        tenureMonths,
        compounding,
      );

      expect(finalMaturityValue).toEqual(1020.18);
    });
  });
});

describe("Growth Timeline Generation", () => {
  describe("for interactive UI charting", () => {
    it("should provide an incremental exponential baseline for annual compounding that reflects a smooth trend line", () => {
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

    it("should dynamically scale intermediate months to visually capture a faster compounding velocity for quarterly structures", () => {
      const principal = 1000;
      const annualRatePercent = 2;
      const tenureMonths = 2;
      const compounding = "quarterly";

      const finalGrowthSeriesValues = growthSeries(
        principal,
        annualRatePercent,
        tenureMonths,
        compounding,
      );

      expect(finalGrowthSeriesValues).toEqual([
        { balance: 1000, month: 0 },
        { balance: 1001.66, month: 1 },
        { balance: 1003.33, month: 2 },
      ]);
    });
  });
});

describe("Net Interest Earned Metric", () => {
  it("should extract only the net profit yield over a multi-year compound interest timeline", () => {
    const principal = 1000;
    const annualRatePercent = 1.9;
    const tenureMonths = 24;
    const compounding = "annually";

    const finalInterestEarned = interestEarned(
      principal,
      annualRatePercent,
      tenureMonths,
      compounding,
    );

    expect(finalInterestEarned).toEqual(38.36);
  });

  it("should isolate the net yield for a straight simple interest timeline, returning a lower profit margin than compounding structures", () => {
    const principal = 1000;
    const annualRatePercent = 1.9;
    const tenureMonths = 24;
    const compounding = "maturity";

    const finalInterestEarned = interestEarned(
      principal,
      annualRatePercent,
      tenureMonths,
      compounding,
    );

    expect(finalInterestEarned).toEqual(38);
  });
});
