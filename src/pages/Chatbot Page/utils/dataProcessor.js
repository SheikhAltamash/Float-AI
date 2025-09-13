export const processOceanData = (rawData, dataType) => {
  switch (dataType) {
    case "temperature":
      return {
        title: `Ocean ${
          dataType.charAt(0).toUpperCase() + dataType.slice(1)
        } Data`,
        xAxisLabel: "Time",
        yAxisLabel: "Temperature (°C)",
        chartData: {
          x: rawData.timestamps || rawData.x,
          y: rawData.temperatures || rawData.y,
          type: "scatter",
          mode: "lines+markers",
        },
      };

    case "salinity":
      return {
        title: "Ocean Salinity Measurements",
        xAxisLabel: "Location",
        yAxisLabel: "Salinity (PSU)",
        chartData: {
          x: rawData.locations || rawData.x,
          y: rawData.salinity || rawData.y,
          type: "scatter",
          mode: "markers",
        },
      };

    case "wind":
      return {
        title: "Wind Speed Data",
        xAxisLabel: "Time",
        yAxisLabel: "Wind Speed (m/s)",
        chartData: {
          x: rawData.timestamps || rawData.x,
          y: rawData.windSpeed || rawData.y,
          type: "scatter",
          mode: "lines",
        },
      };

    default:
      return rawData;
  }
};

export const formatDataForExport = (data, format) => {
  switch (format) {
    case "csv":
      return convertToCSV(data);
    case "json":
      return JSON.stringify(data, null, 2);
    case "netcdf":
      return convertToNetCDF(data);
    default:
      return data;
  }
};

const convertToCSV = (data) => {
  if (!data.chartData) return "";

  let csv = "X,Y\n";
  const xData = data.chartData.x || [];
  const yData = data.chartData.y || [];

  for (let i = 0; i < Math.min(xData.length, yData.length); i++) {
    csv += `${xData[i]},${yData[i]}\n`;
  }

  return csv;
};

const convertToNetCDF = (data) => {
  // Simplified NetCDF-like structure
  return JSON.stringify(
    {
      dimensions: {
        time: data.chartData?.x?.length || 0,
      },
      variables: {
        time: {
          data: data.chartData?.x || [],
          units: "time",
        },
        values: {
          data: data.chartData?.y || [],
          units: data.units || "unknown",
        },
      },
      attributes: {
        title: data.title,
        source: "FloatChat Ocean Data Platform",
        created: new Date().toISOString(),
      },
    },
    null,
    2
  );
};
