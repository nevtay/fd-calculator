// client/lib/finance.ts

export type Compounding = "monthly" | "quarterly" | "annually" | "maturity";

const periodsPerYear: Record<Exclude<Compounding, "maturity">, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

// final value of the deposit at end of tenure
export function maturityValue(
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

// interest earned over tenure
export function interestEarned(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  compounding: Compounding,
): number {
  return (
    maturityValue(principal, annualRatePercent, tenureMonths, compounding) -
    principal
  );
}

// Month-by-month balance, for charting. Includes month 0 (= principal)
export function growthSeries(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  compounding: Compounding,
): { month: number; balance: number }[] {
  const r = annualRatePercent / 100;
  const series: { month: number; balance: number }[] = [];

  for (let m = 0; m <= tenureMonths; m++) {
    const years = m / 12;
    let balance: number;
    if (compounding === "maturity") {
      balance = principal * (1 + r * years);
    } else {
      const n = periodsPerYear[compounding];
      balance = principal * Math.pow(1 + r / n, n * years);
    }
    series.push({ month: m, balance: Math.round(balance * 100) / 100 });
  }
  return series;
}
