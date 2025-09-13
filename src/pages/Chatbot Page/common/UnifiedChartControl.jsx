// components/charts/UnifiedChartControls.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/UnifiedChartControl.css";

function UnifiedChartControls({
  chartType,
  colors,
  data,
  onChartTypeChange,
  onColorsChange,
  onDownload,
  messageContent,
  title,
  seriesCount = 1,
}) {
  const [activePanel, setActivePanel] = useState(null);

  const chartTypes = [
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "multi", label: "Multi Line", icon: "📉" },
    { value: "multi-bar", label: "Multi Bar", icon: "📊" },
    { value: "scatter", label: "Scatter Plot", icon: "⚡" },
    { value: "area", label: "Area Chart", icon: "🏔️" },
    { value: "heatmap", label: "Heat Map", icon: "🔥" },
  ];

  const downloadOptions = [
    { format: "PNG", icon: "🖼️", description: "High quality image" },
    { format: "SVG", icon: "📊", description: "Vector graphics" },
    { format: "PDF", icon: "📄", description: "Document format" },
    { format: "CSV", icon: "📋", description: "Data spreadsheet" },
    { format: "JSON", icon: "🔗", description: "Raw data" },
  ];

  const handleColorChange = (colorType, value, seriesIndex = 0) => {
    const newColors = { ...colors };
    if (colorType === "series" && seriesIndex !== undefined) {
      if (!newColors.series) newColors.series = [];
      newColors.series[seriesIndex] = value;
    } else {
      newColors[colorType] = value;
    }
    onColorsChange(newColors);
  };

  const resetColors = () => {
    const defaultColors = {
      background: "#0f0f0f",
      plotBackground: "#1a1a1a",
      series: ["#00bcd4", "#4facfe", "#00f2fe", "#26c6da", "#64b5f6"],
    };
    onColorsChange(defaultColors);
  };

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="unified-chart-controls">
      {/* Main Controls Bar */}
      <div className="controls-bar">
        {/* Chart Type Selector */}
        <div className="control-section">
          <div className="control-header">
            <span className="control-icon">📊</span>
            <span className="control-label">Chart Type</span>
          </div>
          <select
            className="unified-select"
            value={chartType}
            onChange={(e) => onChartTypeChange(e.target.value)}
          >
            {chartTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Download Section */}
        <div className="control-section">
          <motion.button
            className="unified-button"
            onClick={() => togglePanel("download")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="control-icon">📥</span>
            <span className="control-label">Download</span>
            <motion.span
              className="dropdown-arrow"
              animate={{ rotate: activePanel === "download" ? 180 : 0 }}
            >
              ▼
            </motion.span>
          </motion.button>
        </div>

        {/* Colors Section */}
        <div className="control-section">
          <motion.button
            className="unified-button"
            onClick={() => togglePanel("colors")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="control-icon">🎨</span>
            <span className="control-label">Customize</span>
            <motion.span
              className="dropdown-arrow"
              animate={{ rotate: activePanel === "colors" ? 180 : 0 }}
            >
              ▼
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Expandable Panels */}
      <AnimatePresence>
        {activePanel === "download" && (
          <motion.div
            className="control-panel download-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="panel-content">
              {downloadOptions.map((option) => (
                <motion.button
                  key={option.format}
                  className="download-option"
                  onClick={() => onDownload(option.format)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="option-left">
                    <span className="option-icon">{option.icon}</span>
                    <div className="option-info">
                      <span className="option-format">{option.format}</span>
                      <span className="option-description">
                        {option.description}
                      </span>
                    </div>
                  </div>
                  <span className="option-arrow">→</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {activePanel === "colors" && (
          <motion.div
            className="control-panel colors-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="panel-content">
              {/* Background Colors */}
              <div className="color-section">
                <h4 className="section-title">Background</h4>
                <div className="color-row">
                  <div className="color-input-group">
                    <label>Chart Background</label>
                    <input
                      type="color"
                      value={colors.background || "#0f0f0f"}
                      onChange={(e) =>
                        handleColorChange("background", e.target.value)
                      }
                      className="color-input"
                    />
                    <span className="color-value">
                      {colors.background || "#0f0f0f"}
                    </span>
                  </div>
                  <div className="color-input-group">
                    <label>Plot Area</label>
                    <input
                      type="color"
                      value={colors.plotBackground || "#1a1a1a"}
                      onChange={(e) =>
                        handleColorChange("plotBackground", e.target.value)
                      }
                      className="color-input"
                    />
                    <span className="color-value">
                      {colors.plotBackground || "#1a1a1a"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Colors */}
              <div className="color-section">
                <h4 className="section-title">Data Colors</h4>
                <div className="color-row">
                  {Array.from(
                    { length: Math.min(seriesCount, 3) },
                    (_, index) => (
                      <div key={index} className="color-input-group">
                        <label>
                          {seriesCount > 1
                            ? `Series ${index + 1}`
                            : "Main Color"}
                        </label>
                        <input
                          type="color"
                          value={
                            colors.series?.[index] ||
                            ["#00bcd4", "#4facfe", "#00f2fe"][index]
                          }
                          onChange={(e) =>
                            handleColorChange("series", e.target.value, index)
                          }
                          className="color-input"
                        />
                        <span className="color-value">
                          {colors.series?.[index] ||
                            ["#00bcd4", "#4facfe", "#00f2fe"][index]}
                        </span>
                      </div>
                    )
                  )}
                </div>
                <motion.button
                  className="reset-button"
                  onClick={resetColors}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset to Default
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UnifiedChartControls;
