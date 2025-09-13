import React from "react";
import { motion } from "framer-motion";
import "./styles/DataControls.css";

function DataControls({
  selectedDataType,
  selectedVisualization,
  onDataTypeChange,
  onVisualizationChange,
}) {
  const dataTypes = [
    { value: "temperature", label: "Temperature", icon: "🌡️" },
    { value: "salinity", label: "Salinity", icon: "🧂" },
    { value: "wind", label: "Wind Speed", icon: "💨" },
    { value: "pressure", label: "Pressure", icon: "📊" },
    { value: "current", label: "Ocean Current", icon: "🌊" },
    { value: "depth", label: "Depth Profile", icon: "📏" },
  ];

  const visualizationTypes = [
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "scatter", label: "Scatter Plot", icon: "⚡" },
    { value: "heatmap", label: "Heat Map", icon: "🔥" },
    { value: "contour", label: "Contour Plot", icon: "🗺️" },
    { value: "3d", label: "3D Surface", icon: "🏔️" },
  ];

  return (
    <motion.div
      className="data-controls"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="controls-container">
        {/* Data Type Selector */}
        <div className="control-group">
          <label className="control-label">Data Type:</label>
          <select
            className="control-select"
            value={selectedDataType}
            onChange={(e) => onDataTypeChange(e.target.value)}
          >
            {dataTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Visualization Type Selector */}
        <div className="control-group">
          <label className="control-label">Visualization:</label>
          <select
            className="control-select"
            value={selectedVisualization}
            onChange={(e) => onVisualizationChange(e.target.value)}
          >
            {visualizationTypes.map((viz) => (
              <option key={viz.value} value={viz.value}>
                {viz.icon} {viz.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn" title="Export Data">
            📥 Export
          </button>
          <button className="action-btn" title="Share Chart">
            🔗 Share
          </button>
          <button className="action-btn" title="Settings">
            ⚙️ Settings
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default DataControls;
