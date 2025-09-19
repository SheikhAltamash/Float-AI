import React, { useState, useEffect, useRef, useCallback } from "react";
import Plot from "react-plotly.js";
import FullscreenButton from "../common/FullScreenButtons";
import { getCommonLayout } from "../utils/chartConfig";

function LineChart({
  data,
  mode = "lines+markers",
  type = "scatter",
  fill = null,
  colors = {},
  onPlotReady,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
 const plotRef = useRef(null); // Add ref to access plot instance
  const [plotDivId] = useState(
    `plot-div-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );

 // Expose plot reference to parent component
 useEffect(() => {
   if (onPlotReady && plotRef.current) {
     onPlotReady(plotRef.current);
   }
 }, [onPlotReady]);

  if (!data || !data.chartData) return null;
  const handlePlotInitialized = useCallback(
    (figure, graphDiv) => {
      console.log("Plot initialized:", graphDiv);
      if (onPlotReady) {
        onPlotReady(graphDiv); // Pass the actual DOM element
      }
    },
    [onPlotReady]
  );
    const handlePlotUpdate = useCallback(
      (figure, graphDiv) => {
        console.log("Plot updated:", graphDiv);
        if (onPlotReady) {
          onPlotReady(graphDiv); // Pass the actual DOM element
        }
      },
      [onPlotReady]
    );
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

  const plotData = [
    {
      ...data.chartData,
      type: type,
      mode: mode,
      fill: fill,
      line: {
        color: colors.series?.[0] || "#00bcd4",
        width: 3,
      },
      marker: {
        size: 8,
        color: colors.series?.[0] || "#26c6da",
        line: {
          color: colors.series?.[0] || "#00bcd4",
          width: 1,
        },
      },
      fillcolor: fill ? `${colors.series?.[0] || "#00bcd4"}40` : undefined,
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

  // Enhanced config for fullscreen mode
  const plotConfig = {
    displayModeBar: isFullscreen ? "hover" : false,
    modeBarButtonsToAdd: ["pan2d", "select2d", "lasso2d", "resetScale2d"],
    modeBarButtonsToRemove: ["autoScale2d", "toggleSpikelines"],
    displaylogo: false,
    toImageButtonOptions: {
      format: "png",
      filename: data.title || "line-chart",
      height: isFullscreen ? 800 : 500,
      width: isFullscreen ? 1200 : 700,
      scale: 2,
    },
    modeBarStyle: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#00bcd4",
    },
    responsive: true,
    plotGlPixelRatio: 2,
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
        ref={plotRef}
        data={plotData}
        layout={layout}
        config={plotConfig}
        onInitialized={handlePlotInitialized}
        onUpdate={handlePlotUpdate}
        style={{
          width: "100%",
          height: isFullscreen ? "calc(100vh - 200px)" : "350px",
        }}
        divId={plotDivId}
      />
    </div>
  );
}

export default LineChart;
