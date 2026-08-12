export type CalculationEntry = {
  principal: number;
  tenureLength: number;
  annualRate: number;
  compoundType: Compounding;
  id: string;
};
export type Compounding = "monthly" | "quarterly" | "annually" | "maturity";
export interface CompoundTypes {
  monthly: "monthly";
  quarterly: "quarterly";
  annually: "annually";
  maturity: "maturity";
}
export interface ChartVisualisationProps {
  growthSeriesData: GrowthSeries;
}
export type GrowthSeries = { month: number; balance: number }[];
