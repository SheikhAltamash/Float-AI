import React from "react";
import { motion } from "framer-motion";
import "../styles/ChartTypeSelector.css";

function ChartTypeSelector({
  chartType,
  onChartTypeChange,
  supportedChartTypes = [],
  className = "",
}) {
  const allChartTypes = [
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "multi", label: "Multi Line", icon: "📉" },
    { value: "multi-bar", label: "Multi Bar", icon: "📊" },
    { value: "scatter", label: "Scatter Plot", icon: "⚡" },
    { value: "area", label: "Area Chart", icon: "🏔️" },
    { value: "heatmap", label: "Heat Map", icon: "🔥" },
  ];

  // Filter chart types based on supported types
  const availableChartTypes = allChartTypes.filter((type) =>
    supportedChartTypes.includes(type.value)
  );

  // If no supported types provided, show all
  const chartTypes =
    availableChartTypes.length > 0 ? availableChartTypes : allChartTypes;

  return (
    <div className={`chart-type-selector-professional ${className}`}>
      <label className="selector-label-professional">Chart Type</label>
      <div className="select-wrapper-professional">
        <motion.select
          className="chart-type-select-professional"
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value)}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {chartTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </motion.select>
        <div className="select-arrow-professional">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {chartTypes.length === 0 && (
        <div className="no-charts-available">
          <span>No chart types available for current data</span>
        </div>
      )}
    </div>
  );
}

export default ChartTypeSelector;
