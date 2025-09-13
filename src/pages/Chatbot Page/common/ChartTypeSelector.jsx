import React from "react";
import { motion } from "framer-motion";
import "../styles/ChartTypeSelector.css";

function ChartTypeSelector({
  chartType,
  onChartTypeChange,
  supportedChartTypes = [],
  className = "",
  compact = false,
}) {
  const allChartTypes = [
    { value: "line", label: "Line Chart" },
    { value: "bar", label: "Bar Chart" },
    { value: "multi", label: "Multi Line" },
    { value: "multi-bar", label: "Multi Bar" },
    { value: "scatter", label: "Scatter Plot" },
    { value: "area", label: "Area Chart" },
    { value: "heatmap", label: "Heat Map" },
  ];

  // Filter chart types based on supported types
  const availableChartTypes = allChartTypes.filter((type) =>
    supportedChartTypes.includes(type.value)
  );

  // If no supported types provided, show all
  const chartTypes =
    availableChartTypes.length > 0 ? availableChartTypes : allChartTypes;

  if (compact) {
    return (
      <div className="chart-type-compact-expanded">
        {chartTypes.map((type) => (
          <motion.button
            key={type.value}
            className={`chart-type-option ${
              chartType === type.value ? "active" : ""
            }`}
            onClick={() => onChartTypeChange(type.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="chart-type-label">{type.label}</span>
          </motion.button>
        ))}
      </div>
    );
  }

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
              {type.label}
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
