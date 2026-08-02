export type Compounding = "monthly" | "quarterly" | "annually" | "maturity";

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
