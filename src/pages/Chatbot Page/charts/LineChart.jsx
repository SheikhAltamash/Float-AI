import React from "react";
import Plot from "react-plotly.js";
import FullscreenButton from "../common/FullscreenButton";
import { getCommonLayout } from "../utils/chartConfig";

function LineChart({
  data,
  mode = "lines+markers",
  type = "scatter",
  fill = null,
  colors = {},
}) {
  if (!data || !data.chartData) return null;

  const chartId = `chart-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const plotData = [
    {
      ...data.chartData,
      type: type,
      mode: mode,
      fill: fill,
      line: {
        color: colors.series?.[0] || "#00bcd4",
        width: 3,
      },
      marker: {
        size: 8,
        color: colors.series?.[0] || "#26c6da",
        line: {
          color: colors.series?.[0] || "#00bcd4",
          width: 1,
        },
      },
      fillcolor: fill ? `${colors.series?.[0] || "#00bcd4"}40` : undefined,
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
      title: data.yAxisLabel || "Value",
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
        {data.value && (
          <div className="chart-stats">
            <span
              className="main-value"
              style={{ color: colors.series?.[0] || "#00bcd4" }}
            >
              {data.value}
            </span>
            {data.change && <span className="change-value">{data.change}</span>}
            {data.period && <span className="period">{data.period}</span>}
          </div>
        )}
      </div>

      <Plot
        data={plotData}
        layout={layout}
        config={{
          displayModeBar: false,
          responsive: true,
          staticPlot: false,
        }}
        style={{ width: "100%", height: "350px" }}
      />
    </div>
  );
}

export default LineChart;
