import React from "react";
import Plot from "react-plotly.js";
import FullscreenButton from "../common/FullscreenButton";
import { getCommonLayout } from "../utils/chartConfig";

function BarChart({ data, colors = {} }) {
  if (!data || !data.chartData) return null;

  const chartId = `chart-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Generate colors for each bar
  const barColors =
    data.chartData.x?.map(
      (_, index) =>
        colors.series?.[index % (colors.series?.length || 5)] ||
        ["#00bcd4", "#26c6da", "#4facfe", "#00f2fe", "#64b5f6"][index % 5]
    ) ||
    colors.series?.[0] ||
    "#00bcd4";

  const plotData = [
    {
      ...data.chartData,
      type: "bar",
      marker: {
        color: barColors,
        line: {
          color: "rgba(255,255,255,0.2)",
          width: 1,
        },
      },
    },
  ];

  const layout = {
    ...getCommonLayout(),
    title: "",
    paper_bgcolor: colors.background || "#0f0f0f",
    plot_bgcolor: colors.plotBackground || "#1a1a1a",
    xaxis: {
      gridcolor: "rgba(255,255,255,0.1)",
      color: "#cbd5e0",
      title: data.xAxisLabel || "",
    },
    yaxis: {
      gridcolor: "rgba(255,255,255,0.1)",
      color: "#cbd5e0",
      title: data.yAxisLabel || "Count",
    },
  };

  return (
    <div
      className="chart-container"
      id={chartId}
      style={{
        background: `linear-gradient(135deg, ${
          colors.background || "#1a1a1a"
        } 0%, ${colors.plotBackground || "#0f0f0f"} 100%)`,
      }}
    >
      <FullscreenButton targetElementId={chartId} />

      <div className="chart-header">
        <h3>{data.title}</h3>
      </div>

      <Plot
        data={plotData}
        layout={layout}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{ width: "100%", height: "350px" }}
      />
    </div>
  );
}

export default BarChart;
