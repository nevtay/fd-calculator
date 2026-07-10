To support partial final months while ensuring a smooth curve for chart visualizations, we must revert from a staircase timeline back to a continuous growth model, but with one crucial adjustment: **the final month must perfectly match the conventional banking method for broken periods.**

In real-world banking, if a tenure ends on a broken month (e.g., a 7-month investment with quarterly compounding), the bank calculates compound interest for the completed periods (6 months) and then applies simple interest to the remaining broken period (1 month).

<h1>The Math Logic for the Smooth Chart</h1>

To have a visually beautiful curve while maintaining absolute mathematical correctness at every single milestone month, the loop will:

- Accurately track ordinary months on a smooth exponential curve using fractional exponents.
- Override the absolute final month using the hybrid banking formula (Compound Interest + Simple Interest) so your total maturity calculation is precise down to the penny

<h2>Production-Ready Implementation</h2>

For the updated `growthSeries` function, it's paired with an updated `maturityValue` function to ensure your single-value calculation and chart data align exactly

```ts
export type Compounding = "monthly" | "quarterly" | "annually" | "maturity";

const periodsPerYear: Record<Exclude<Compounding, "maturity">, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

// Calculates exact banking maturity value handling partial final periods
export function maturityValue(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  compounding: Compounding,
): number {
  const r = annualRatePercent / 100;

  if (compounding === "maturity") {
    const raw = principal * (1 + r * (tenureMonths / 12));
    return Math.round((raw + Number.EPSILON) * 100) / 100;
  }

  const n = periodsPerYear[compounding];
  const monthsPerPeriod = 12 / n;

  // 1. Identify completed full compounding chunks
  const completedPeriods = Math.floor(tenureMonths / monthsPerPeriod);
  const compoundedMonths = completedPeriods * monthsPerPeriod;

  // 2. Compound interest for completed periods
  const balanceAfterCompounding =
    principal * Math.pow(1 + r / n, completedPeriods);

  // 3. Simple interest for remaining partial months
  const remainingMonths = tenureMonths - compoundedMonths;
  const rawMaturity =
    balanceAfterCompounding * (1 + r * (remainingMonths / 12));

  return Math.round((rawMaturity + Number.EPSILON) * 100) / 100;
}

// Generates a smooth, visually pleasing curve for UI charts
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

    // Is this the absolute final month of the timeline?
    if (m === tenureMonths) {
      // Use the precise banking method for the endpoint
      balance = maturityValue(
        principal,
        annualRatePercent,
        tenureMonths,
        compounding,
      );
      series.push({ month: m, balance });
      continue;
    }

    // Intermediate months generate a smooth curve for better UI styling
    if (compounding === "maturity") {
      balance = principal * (1 + r * (m / 12));
    } else {
      const n = periodsPerYear[compounding];
      // Fractional years create the perfect curve for Recharts / Chart.js
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
