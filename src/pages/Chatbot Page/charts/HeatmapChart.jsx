import React from "react";
import Plot from "react-plotly.js";
import FullscreenButton from "../common/FullscreenButton";
import ChartTypeSelector from "../common/ChartTypeSelector";
import ColorCustomizer from "../common/ColorCustomizer";
import DownloadButton from "../common/DownloadButton";
import { getCommonLayout } from "../utils/chartConfig";

function HeatmapChart({
  data,
  colors = {},
  isFullscreen = false,
  isCustomizationOpen = false,
  onFullscreenChange,
  onChartTypeChange,
  onColorsChange,
  onToggleCustomization,
  chartType,
  seriesCount,
  messageContent,
  title,
  chartId,
}) {
  if (!data || !data.chartData) return null;

  // Convert regular chart data to heatmap format if needed
  const heatmapData = data.chartData.z
    ? data.chartData
    : {
        z: [data.chartData.y || []],
        x: data.chartData.x || [],
        y: ["Value"],
        type: "heatmap",
        colorscale: [
          [0, colors.series?.[0] || "#000080"],
          [0.5, colors.series?.[1] || "#00bcd4"],
          [1, colors.series?.[2] || "#ff6b6b"],
        ],
      };

  const plotData = [
    {
      ...heatmapData,
      type: "heatmap",
      colorscale: heatmapData.colorscale || [
        [0, colors.series?.[0] || "#000080"],
        [0.5, colors.series?.[1] || "#00bcd4"],
        [1, colors.series?.[2] || "#ff6b6b"],
      ],
    },
  ];

  const layout = {
    ...getCommonLayout(),
    title: "",
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
        text: data.yAxisLabel || "Value",
        font: { size: isFullscreen ? 18 : 14 },
      },
      tickfont: { size: isFullscreen ? 14 : 12 },
    },
    margin: isFullscreen
      ? { l: 80, r: 80, t: 50, b: 80 }
      : { l: 50, r: 50, t: 20, b: 50 },
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
        onFullscreenChange={onFullscreenChange}
        className={isFullscreen ? "fullscreen-active" : ""}
      />

      {/* Customization Toggle Button - Only in Fullscreen */}
      {isFullscreen && (
        <button
          className="customization-toggle-btn"
          onClick={onToggleCustomization}
          title={
            isCustomizationOpen ? "Close Customization" : "Open Customization"
          }
        >
          <span className="toggle-icon">🎨</span>
          <span className="toggle-text">
            {isCustomizationOpen ? "Close" : "Customize"}
          </span>
        </button>
      )}

      {/* Fullscreen Controls Panel */}
      {isFullscreen && isCustomizationOpen && (
        <div className="fullscreen-controls-panel">
          <div className="fullscreen-controls-header">
            <h3>Chart Customization</h3>
            <button
              className="close-controls-btn"
              onClick={onToggleCustomization}
            >
              ✕
            </button>
          </div>

          <div className="fullscreen-controls-content">
            <div className="fullscreen-control-section">
              <ChartTypeSelector
                chartType={chartType}
                onChartTypeChange={onChartTypeChange}
                className="fullscreen-selector"
              />
            </div>

            <div className="fullscreen-control-section">
              <ColorCustomizer
                colors={colors}
                onColorsChange={onColorsChange}
                chartType={chartType}
                seriesCount={seriesCount}
                className="fullscreen-customizer"
              />
            </div>

            <div className="fullscreen-control-section">
              <DownloadButton
                data={data}
                chartType={chartType}
                messageContent={messageContent}
                title={title}
                className="fullscreen-download"
              />
            </div>
          </div>
        </div>
      )}

      <div className="chart-header">
        <h3
          style={{
            fontSize: isFullscreen ? "2rem" : "1.2rem",
          }}
        >
          {data.title}
        </h3>
        {data.value && (
          <div className="chart-stats">
            <span
              className="main-value"
              style={{
                color: colors.series?.[0] || "#00bcd4",
                fontSize: isFullscreen ? "3rem" : "2rem",
              }}
            >
              {data.value}
            </span>
            {data.change && (
              <span
                className="change-value"
                style={{ fontSize: isFullscreen ? "1.5rem" : "1rem" }}
              >
                {data.change}
              </span>
            )}
            {data.period && (
              <span
                className="period"
                style={{ fontSize: isFullscreen ? "1.2rem" : "0.9rem" }}
              >
                {data.period}
              </span>
            )}
          </div>
        )}
      </div>

      <Plot
        data={plotData}
        layout={layout}
        config={{
          displayModeBar: isFullscreen,
          responsive: true,
        }}
        style={{
          width: "100%",
          height: isFullscreen ? "calc(100vh - 200px)" : "350px",
        }}
      />
    </div>
  );
}

export default HeatmapChart;
