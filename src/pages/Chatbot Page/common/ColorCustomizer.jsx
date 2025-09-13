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

  // Original non-compact version remains unchanged
  return (
    <div className={`color-customizer ${className}`}>
      {/* ... original implementation ... */}
    </div>
  );
}

export default ColorCustomizer;
