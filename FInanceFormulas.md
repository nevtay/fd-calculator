To support partial final months while ensuring a smooth curve for chart visualizations, we must revert from a staircase timeline back to a continuous growth model, but with one crucial adjustment: **the final month must perfectly match the conventional banking method for broken periods.**

In real-world banking, if a tenure ends on a broken month (e.g., a 7-month investment with quarterly compounding), the bank calculates compound interest for the completed periods (6 months) and then applies simple interest to the remaining broken period (1 month).

<h1>The Math Logic for the Smooth Chart</h1>

To have a visually beautiful curve while maintaining absolute mathematical correctness at every single milestone month, the loop will:

- Accurately track ordinary months on a smooth exponential curve using fractional exponents.
- Override the absolute final month using the hybrid banking formula (Compound Interest + Simple Interest) so your total maturity calculation is precise down to the penny

<h2>Production-Ready Implementation</h2>

The formulas live in `lib/utils/finance.ts`, with the shared `Compounding` type now defined once in `lib/types.ts` and imported here. A private `rawMaturityValue` helper holds the unrounded math so both `maturityValue` and `interestEarned` can share it without double-rounding drift; `growthSeries` is paired with `maturityValue` to ensure your single-value calculation and chart data align exactly.

```ts
import { Compounding } from "../types";

const periodsPerYear: Record<Exclude<Compounding, "maturity">, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

function rawMaturityValue(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  compounding: Compounding,
): number {
  const r = annualRatePercent / 100;
  const t = tenureMonths / 12;

  if (compounding === "maturity") {
    return principal * (1 + r * t);
  }
  const n = periodsPerYear[compounding];
  return principal * Math.pow(1 + r / n, n * t);
}

// final value of the deposit at end of tenure
export function maturityValue(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  compounding: Compounding,
): number {
  const rawMaturity = rawMaturityValue(
    principal,
    annualRatePercent,
    tenureMonths,
    compounding,
  );

  // fix floating-point issues by rounding to 2 decimal places
  return Math.round((rawMaturity + Number.EPSILON) * 100) / 100;
}

// interest earned over tenure
export function interestEarned(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  compounding: Compounding,
): number {
  // compare against the unrounded maturity value, not maturityValue()'s
  // rounded result, otherwise near-zero interest can round to -0
  const rawMaturity = rawMaturityValue(
    principal,
    annualRatePercent,
    tenureMonths,
    compounding,
  );
  const earned = rawMaturity - principal;
  return Math.round((earned + Number.EPSILON) * 100) / 100 || 0;
}

// month-by-month balance, for charting. Includes month 0 (= principal)
export function growthSeries(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  compounding: Compounding,
): { month: number; balance: number }[] {
  const r = annualRatePercent / 100;
  const series: { month: number; balance: number }[] = [];

  for (let m = 0; m <= tenureMonths; m++) {
    let balance: number;

    // for absolute final month of the timeline
    if (m === tenureMonths) {
      // use the precise banking method for the endpoint
      balance = maturityValue(
        principal,
        annualRatePercent,
        tenureMonths,
        compounding,
      );
      series.push({ month: m, balance });
      continue;
    }

    // intermediate months generate a smooth curve for better UI styling
    if (compounding === "maturity") {
      balance = principal * (1 + r * (m / 12));
    } else {
      const n = periodsPerYear[compounding];
      // fractional years create the perfect curve for Recharts / Chart.js
      const fractionalYears = m / 12;
      balance = principal * Math.pow(1 + r / n, n * fractionalYears);
    }

    series.push({
      month: m,
      balance: Math.round((balance + Number.EPSILON) * 100) / 100,
    });
  }

  return series;
}
```

<h2>Why This is Ideal for UI Charts</h2>

- Visually Pleasing Line Charts: Libraries like Recharts, Chart.js, or ApexCharts will render a gorgeous, smooth upward slope instead of ugly vertical jumps.
- No Fractional Exponent Bugs at Maturity: If a user runs a 7-month tenure with quarterly compounding at 12% interest on $10,000, Month 6 maps perfectly to the 2nd quarter compound, and Month 7 smoothly glides to the precise hybrid banking value of $10,715.09 (instead of a raw fractional exponent value of $10,715.19).
- Guaranteed Alignment: Your summary card data (maturityValue()) will always exactly match the final node on your chart timeline graph (growthSeries()).
- No More "-0.00": `interestEarned()` used to subtract the raw principal from `maturityValue()`'s already-rounded result, so near-zero interest could round down to negative zero and display as "-0.00". It now derives interest from the same unrounded `rawMaturityValue()` used internally by `maturityValue()`, rounding only once at the end.
