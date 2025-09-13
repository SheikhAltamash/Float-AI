import React from "react";
import { motion } from "framer-motion";
import "../styles/ColorCustomizer.css";

function ColorCustomizer({
  colors,
  onColorsChange,
  chartType,
  seriesCount = 1,
  className = "",
  compact = false,
}) {
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

  if (compact) {
    return (
      <div className="color-customizer-compact-expanded">
        {/* Background Colors */}
        <div className="color-group">
          <span className="color-group-label">Background</span>
          <div className="color-inputs">
            <div className="color-item-compact">
              <span className="color-label-compact">Chart BG</span>
              <input
                type="color"
                value={colors.background || "#0f0f0f"}
                onChange={(e) =>
                  handleColorChange("background", e.target.value)
                }
                className="color-input-compact"
              />
            </div>
            <div className="color-item-compact">
              <span className="color-label-compact">Plot BG</span>
              <input
                type="color"
                value={colors.plotBackground || "#1a1a1a"}
                onChange={(e) =>
                  handleColorChange("plotBackground", e.target.value)
                }
                className="color-input-compact"
              />
            </div>
          </div>
        </div>

        {/* Series Colors */}
        <div className="color-group">
          <span className="color-group-label">Data Colors</span>
          <div className="color-inputs">
            {Array.from({ length: Math.min(seriesCount, 3) }, (_, index) => (
              <div key={index} className="color-item-compact">
                <span className="color-label-compact">
                  {seriesCount > 1 ? `S${index + 1}` : "Main"}
                </span>
                <input
                  type="color"
                  value={
                    colors.series?.[index] ||
                    ["#00bcd4", "#4facfe", "#00f2fe", "#26c6da", "#64b5f6"][
                      index
                    ]
                  }
                  onChange={(e) =>
                    handleColorChange("series", e.target.value, index)
                  }
                  className="color-input-compact"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <motion.button
          className="reset-colors-compact"
          onClick={resetColors}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      </div>
    );
  }

  // Original non-compact version (also remove icons)
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className={`color-customizer ${className}`}>
      <motion.button
        className="color-toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="color-text">Customize Colors</span>
        <span className={`color-arrow ${isExpanded ? "up" : "down"}`}>▼</span>
      </motion.button>

      {isExpanded && (
        <motion.div
          className="color-controls"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Colors */}
          <div className="color-section">
            <h4 className="color-section-title">Background</h4>

            <div className="color-input-group">
              <label className="color-label">Chart Background</label>
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
              <label className="color-label">Plot Area</label>
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

          {/* Series Colors */}
          <div className="color-section">
            <h4 className="color-section-title">
              {chartType === "multi" || chartType === "multi-bar"
                ? "Series Colors"
                : "Data Colors"}
            </h4>

            {Array.from({ length: seriesCount }, (_, index) => (
              <div key={index} className="color-input-group">
                <label className="color-label">
                  {seriesCount > 1 ? `Series ${index + 1}` : "Main Color"}
                </label>
                <input
                  type="color"
                  value={
                    colors.series?.[index] ||
                    ["#00bcd4", "#4facfe", "#00f2fe", "#26c6da", "#64b5f6"][
                      index
                    ]
                  }
                  onChange={(e) =>
                    handleColorChange("series", e.target.value, index)
                  }
                  className="color-input"
                />
                <span className="color-value">
                  {colors.series?.[index] ||
                    ["#00bcd4", "#4facfe", "#00f2fe", "#26c6da", "#64b5f6"][
                      index
                    ]}
                </span>
              </div>
            ))}
          </div>

          {/* Reset Button */}
          <div className="color-actions">
            <motion.button
              className="reset-colors-btn"
              onClick={resetColors}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset to Default
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ColorCustomizer;
