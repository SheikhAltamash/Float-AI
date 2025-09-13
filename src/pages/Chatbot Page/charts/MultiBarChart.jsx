import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import FullscreenButton from "../common/FullscreenButton";
import { getCommonLayout } from "../utils/chartConfig";

function MultiBarChart({ data, colors = {} }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!data || !data.barData) return null;

  const chartId = `chart-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Check fullscreen status
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const plotData = data.barData.map((series, index) => ({
    ...series,
    type: "bar",
    name: series.name,
    marker: {
      color:
        colors.series?.[index] ||
        ["#00bcd4", "#4facfe", "#00f2fe", "#26c6da", "#64b5f6"][index],
    },
  }));

  const layout = {
    ...getCommonLayout(),
    title: "",
    barmode: "group",
    paper_bgcolor: colors.background || "#0f0f0f",
    plot_bgcolor: colors.plotBackground || "#1a1a1a",
    font: {
      ...getCommonLayout().font,
      size: isFullscreen ? 16 : 12,
    },
    xaxis: {
      gridcolor: "rgba(255,255,255,0.1)",
      color: "#cbd5e0",
      title: {
        text: data.xAxisLabel || "",
        font: { size: isFullscreen ? 18 : 14 },
      },
      tickfont: { size: isFullscreen ? 14 : 12 },
    },
    yaxis: {
      gridcolor: "rgba(255,255,255,0.1)",
      color: "#cbd5e0",
      title: {
        text: data.yAxisLabel || "Values",
        font: { size: isFullscreen ? 18 : 14 },
      },
      tickfont: { size: isFullscreen ? 14 : 12 },
    },
    legend: {
      ...getCommonLayout().legend,
      orientation: "h",
      y: isFullscreen ? -0.15 : -0.1,
      x: 0.5,
      xanchor: "center",
      font: { size: isFullscreen ? 14 : 12 },
    },
    margin: isFullscreen
      ? { l: 80, r: 80, t: 50, b: 100 }
      : { l: 50, r: 50, t: 20, b: 60 },
  };

  // Enhanced config
  const plotConfig = {
    displayModeBar: isFullscreen ? "hover" : false,
    modeBarButtonsToAdd: ["pan2d", "select2d", "lasso2d", "resetScale2d"],
    modeBarButtonsToRemove: ["autoScale2d", "toggleSpikelines"],
    displaylogo: false,
    toImageButtonOptions: {
      format: "png",
      filename: data.title || "multi-bar-chart",
      height: isFullscreen ? 800 : 500,
      width: isFullscreen ? 1200 : 700,
      scale: 2,
    },
    responsive: true,
  };

  return (
    <div
      className={`chart-container ${isFullscreen ? "in-fullscreen" : ""}`}
      id={chartId}
      style={{
        background: `linear-gradient(135deg, ${
          colors.background || "#1a1a1a"
        } 0%, ${colors.plotBackground || "#0f0f0f"} 100%)`,
      }}
    >
      <FullscreenButton
        targetElementId={chartId}
        onFullscreenChange={setIsFullscreen}
      />

      <div className="chart-header">
        <h3 style={{ fontSize: isFullscreen ? "2rem" : "1.2rem" }}>
          {data.title}
        </h3>
      </div>

      <Plot
        data={plotData}
        layout={layout}
        config={plotConfig}
        style={{
          width: "100%",
          height: isFullscreen ? "calc(100vh - 200px)" : "350px",
        }}
      />
    </div>
  );
}

export default MultiBarChart;
