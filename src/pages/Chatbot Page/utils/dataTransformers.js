// dataTransformers.js - Enhanced with better error handling

// Transform single series data to multi-chart format
export const transformToMultiData = (data) => {
    console.log("transformToMultiData called with:", data);
  if (!data) {
    console.warn("No data provided for multi transformation");
    return null;
  }

  if (data.multiData && data.multiData.length > 0) {
     console.log("Data already has multiData, returning as is");
    return data;
  }

  if (data.chartData && data.chartData.x && data.chartData.y) {
      console.log("Converting single chartData to multiData format");
    // Create a simple multi-series from single series
    return {
      ...data,
      multiData: [
        {
          name: data.title || "Series 1",
          x: data.chartData.x,
          y: data.chartData.y,
          type: "scatter",
          mode: "lines+markers",
          line: { color: "#00bcd4" },
          marker: { color: "#00bcd4" },
        },
      ],
    };
  }

  console.warn("Data cannot be transformed to multi format");
  return null;
};

// Transform multi-chart data to single series format
export const transformToSingleData = (data, seriesIndex = 0) => {
  if (!data) {
    console.warn("No data provided for single transformation");
    return null;
  }

  if (data.chartData && data.chartData.x && data.chartData.y) {
    return data;
  }

  if (data.multiData && data.multiData.length > seriesIndex) {
    const selectedSeries = data.multiData[seriesIndex];
    return {
      ...data,
      chartData: {
        x: selectedSeries.x,
        y: selectedSeries.y,
        type: selectedSeries.type || "scatter",
        mode: selectedSeries.mode || "lines+markers",
      },
    };
  }

  console.warn("Data cannot be transformed to single format");
  return null;
};

// Transform any data to bar chart format with multiple series
export const transformToBarData = (data) => {
  if (!data) {
    console.warn("No data provided for bar transformation");
    return null;
  }

  if (data.barData && data.barData.length > 0) {
    return data;
  }

  if (data.multiData && data.multiData.length > 0) {
    return {
      ...data,
      barData: data.multiData.map((series) => ({
        name: series.name,
        x: series.x,
        y: series.y,
        type: "bar",
        marker: {
          color: series.line?.color || series.marker?.color || "#00bcd4",
        },
      })),
    };
  }

  if (data.chartData && data.chartData.x && data.chartData.y) {
    return {
      ...data,
      barData: [
        {
          name: data.title || "Data",
          x: data.chartData.x,
          y: data.chartData.y,
          type: "bar",
          marker: {
            color: data.chartData.marker?.color || [
              "#00bcd4",
              "#26c6da",
              "#4facfe",
              "#00f2fe",
              "#64b5f6",
            ],
          },
        },
      ],
    };
  }

  console.warn("Data cannot be transformed to bar format");
  return null;
};
