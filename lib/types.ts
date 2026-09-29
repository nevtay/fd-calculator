// principal/tenureLength/annualRate are kept as strings, matching the
// sanitized controlled-input values they're populated from and saved as —
// conversion to numbers only happens at calculation time (see finance.ts).
export interface CalculationEntry {
  principal: string;
  tenureLength: string;
  annualRate: string;
  compoundType: Compounding;
  id: string;
}
export type CalculatorFormData = Omit<CalculationEntry, "id">;
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

export interface EntriesStore {
  entries: CalculationEntry[];
  currentEntry: CalculationEntry | null;
  addEntry: (entry: CalculatorFormData) => void;
  setCurrentEntry: (entry: CalculationEntry) => void;
  removeEntry: (id: string) => void;
}
