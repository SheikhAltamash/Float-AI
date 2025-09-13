import React, { useState } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import MultiChart from "./MultiChart";
import MultiBarChart from "./MultiBarChart";
import HeatmapChart from "./HeatmapChart";
import ChartTypeSelector from "../common/ChartTypeSelector";
import ColorCustomizer from "../common/ColorCustomizer";
import DownloadButton from "../common/DownloadButton";
import {
  transformToMultiData,
  transformToSingleData,
  transformToBarData,
} from "../utils/dataTransformers";
import "../styles/ChartRenderer.css";

function ChartRenderer({
  data,
  initialChartType = "line",
  messageContent,
  title,
}) {
  const [chartType, setChartType] = useState(initialChartType);
  const [colors, setColors] = useState({
    background: "#0f0f0f",
    plotBackground: "#1a1a1a",
    series: ["#00bcd4", "#4facfe", "#00f2fe", "#26c6da", "#64b5f6"],
  });
  const [expandedSection, setExpandedSection] = useState(null);

  const handleChartTypeChange = (newChartType) => {
    setChartType(newChartType);
  };

  const handleColorsChange = (newColors) => {
    setColors(newColors);
  };

  const handleSectionToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getSeriesCount = () => {
    if (data.multiData) return data.multiData.length;
    if (data.barData) return data.barData.length;
    return 1;
  };

  const renderChart = () => {
    let transformedData = data;
    const chartProps = { colors };

    switch (chartType) {
      case "line":
        transformedData = transformToSingleData(data);
        return <LineChart data={transformedData} {...chartProps} />;

      case "bar":
        transformedData = transformToBarData(data);
        return data.multiData ? (
          <MultiBarChart data={transformedData} {...chartProps} />
        ) : (
          <BarChart data={transformToSingleData(data)} {...chartProps} />
        );

      case "multi":
        transformedData = transformToMultiData(data);
        return <MultiChart data={transformedData} {...chartProps} />;

      case "multi-bar":
        transformedData = transformToBarData(data);
        return <MultiBarChart data={transformedData} {...chartProps} />;

      case "scatter":
        transformedData = transformToSingleData(data);
        return (
          <LineChart data={transformedData} mode="markers" {...chartProps} />
        );

      case "area":
        transformedData = transformToSingleData(data);
        return (
          <LineChart
            data={transformedData}
            mode="lines"
            fill="tonexty"
            {...chartProps}
          />
        );

      case "heatmap":
        return <HeatmapChart data={data} {...chartProps} />;

      default:
        return <LineChart data={transformToSingleData(data)} {...chartProps} />;
    }
  };

  if (!data) return null;

  return (
    <div className="chart-renderer">
      {/* Horizontal Controls Container */}
      <div className="chart-controls-horizontal">
        {/* Main Buttons Row */}
        <div className="controls-buttons-row">
          <button
            className={`control-button ${
              expandedSection === "chartType" ? "active" : ""
            }`}
            onClick={() => handleSectionToggle("chartType")}
          >
            <span className="control-icon">📊</span>
            <span className="control-text">Chart Type</span>
            <span
              className={`control-arrow ${
                expandedSection === "chartType" ? "up" : "down"
              }`}
            >
              ▼
            </span>
          </button>

          <button
            className={`control-button ${
              expandedSection === "colors" ? "active" : ""
            }`}
            onClick={() => handleSectionToggle("colors")}
          >
            <span className="control-icon">🎨</span>
            <span className="control-text">Colors</span>
            <span
              className={`control-arrow ${
                expandedSection === "colors" ? "up" : "down"
              }`}
            >
              ▼
            </span>
          </button>

          <button
            className={`control-button ${
              expandedSection === "download" ? "active" : ""
            }`}
            onClick={() => handleSectionToggle("download")}
          >
            <span className="control-icon">📥</span>
            <span className="control-text">Download</span>
            <span
              className={`control-arrow ${
                expandedSection === "download" ? "up" : "down"
              }`}
            >
              ▼
            </span>
          </button>
        </div>

        {/* Expanded Content Row */}
        {expandedSection && (
          <div className="controls-expanded-row">
            {expandedSection === "chartType" && (
              <ChartTypeSelector
                chartType={chartType}
                onChartTypeChange={handleChartTypeChange}
                compact={true}
              />
            )}

            {expandedSection === "colors" && (
              <ColorCustomizer
                colors={colors}
                onColorsChange={handleColorsChange}
                chartType={chartType}
                seriesCount={getSeriesCount()}
                compact={true}
              />
            )}

            {expandedSection === "download" && (
              <DownloadButton
                data={data}
                chartType={chartType}
                messageContent={messageContent}
                title={title || data?.title || "Ocean Data"}
                compact={true}
              />
            )}
          </div>
        )}
      </div>

      {/* Chart Display */}
      <div className="chart-display">{renderChart()}</div>
    </div>
  );
}

export default ChartRenderer;
