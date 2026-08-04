import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { ChartVisualisationProps } from "@/lib/types";

const ChartVisualisation = ({ growthSeriesData }: ChartVisualisationProps) => {
  return (
    <div className="ml-[-20] rounded-lg">
      <BarChart
        data={growthSeriesData}
        height={300}
        margin={{ top: 0, right: 0, left: 0, bottom: 20 }}
        responsive
        width={"100%"}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <YAxis
          dataKey="balance"
          domain={[growthSeriesData[0]?.balance ?? 0, "dataMax"]}
          label={{
            angle: -90,
            dataKey: "Balance",
            dx: 25,
            fill: "var(--color-indigo)",
            fontSize: 18,
            fontWeight: 500,
            position: "insideLeft",
            textAnchor: "middle",
            value: "Balance",
          }}
          tick={{ fill: "var(--color-body-text)" }}
          tickFormatter={(value: number) =>
            value.toLocaleString("en-US", { maximumFractionDigits: 0 })
          }
          width={90}
        />
        <XAxis
          dataKey="month"
          label={{
            dataKey: "month",
            fill: "var(--color-indigo)",
            fontSize: 18,
            fontWeight: 500,
            offset: -20,
            position: "insideBottom",
            textAnchor: "middle",
            value: "Month",
          }}
          tick={{ fill: "var(--color-body-text)" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "darkgrey",
            borderColor: "none",
            color: "#6366F1",
          }}
          cursor={growthSeriesData.length > 1 ? true : false}
          formatter={(value) =>
            typeof value === "number"
              ? value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : value
          }
          itemStyle={{ fontWeight: "bold" }}
          labelFormatter={(label) => (
            <>
              <b>Month:</b> <b>{label}</b>
            </>
          )}
          separator=": "
        />
        <Bar dataKey="balance" fill="#6366F1" name="Balance" />
      </BarChart>
    </div>
  );
};

export default ChartVisualisation;
