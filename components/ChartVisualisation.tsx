import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PolarGrid,
  Brush,
  Label,
} from "recharts";
import { GrowthSeries } from "./Calculator";

interface ChartVisualisationProps {
  growthSeriesData: GrowthSeries;
}

const ChartVisualisation = ({ growthSeriesData }: ChartVisualisationProps) => {
  return (
    <div className="rounded-lg p-4">
      <LineChart
        width={"100%"}
        height={300}
        responsive
        data={growthSeriesData}
        margin={{ top: 0, right: 0, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <YAxis
          dataKey="balance"
          domain={[growthSeriesData[0]?.balance ?? 0, "dataMax"]}
          width={90}
          tickFormatter={(value: number) =>
            value.toLocaleString("en-US", { maximumFractionDigits: 0 })
          }
          tick={{ fill: "var(--color-body-text)" }}
          label={{
            dataKey: "Balance",
            fill: "var(--color-body-text)",
            fontWeight: 500,
            value: "Balance",
            angle: -90,
            position: "insideLeft",
            textAnchor: "middle",
          }}
        />
        <XAxis
          dataKey="month"
          tick={{ fill: "var(--color-body-text)" }}
          label={{
            dataKey: "month",
            fill: "var(--color-body-text)",
            fontWeight: 500,
            value: "Month",
            position: "insideBottom",
            offset: -20,
            textAnchor: "middle",
          }}
        />
        <Tooltip
          labelFormatter={(label) => (
            <>
              <b>Month:</b> {label}
            </>
          )}

          itemStyle={{ fontWeight: "bold" }}
          contentStyle={{
            color: "#6366F1",
            backgroundColor: "darkgrey",
            borderColor: "none",
          }}
        />
        <Line
          type="natural"
          dataKey="balance"
          stroke="#6366F1"
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
};

export default ChartVisualisation;
