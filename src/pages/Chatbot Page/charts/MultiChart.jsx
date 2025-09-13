import React from "react";
import Plot from "react-plotly.js";
import FullscreenButton from "../common/FullscreenButton";
import { getCommonLayout } from "../utils/chartConfig";

function MultiChart({ data, colors = {} }) {
  if (!data || !data.multiData) return null;

  const chartId = `chart-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const plotData = data.multiData.map((trace, index) => {
    const seriesColor =
      colors.series?.[index] ||
      ["#00bcd4", "#4facfe", "#00f2fe", "#26c6da", "#64b5f6"][index];

    return {
      ...trace,
      type: trace.type || "scatter",
      mode: trace.mode || "lines+markers",
      line: {
        color: seriesColor,
        width: 3,
      },
      marker: {
        size: 8,
        color: seriesColor,
      },
      yaxis: trace.yaxis || (index > 0 ? "y2" : "y"),
    };
  });

  const layout = {
    ...getCommonLayout(),
    title: "",
    paper_bgcolor: colors.background || "#0f0f0f",
    plot_bgcolor: colors.plotBackground || "#1a1a1a",
    xaxis: {
      gridcolor: "rgba(255,255,255,0.1)",
      color: "#cbd5e0",
      title: data.xAxisLabel || "Time",
    },
    yaxis: {
      gridcolor: "rgba(255,255,255,0.1)",
      color: "#cbd5e0",
      title: data.yAxisLabel || "Primary Values",
      side: "left",
    },
    yaxis2: {
      title: data.y2AxisLabel || "Secondary Values",
      titlefont: { color: colors.series?.[1] || "#4facfe" },
      tickfont: { color: colors.series?.[1] || "#4facfe" },
      overlaying: "y",
      side: "right",
      color: "#cbd5e0",
      gridcolor: `${colors.series?.[1] || "#4facfe"}20`,
    },
    legend: {
      ...getCommonLayout().legend,
      orientation: "h",
      y: -0.1,
      x: 0.5,
      xanchor: "center",
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
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
}

export default MultiChart;
