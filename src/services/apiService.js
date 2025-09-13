import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api" ;
console.log(API_BASE_URL)
class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

    async sendPrompt(message, options = {}) {
      try {
     const response = await axios.post(
       `${this.baseURL}/chat`,
       {
         prompt: message,
         chartTypes: ["line", "bar", "multi", "heatmap"],
         dataFormat: "visualization",
         ...options,
       },
       {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
         },
       }
     );
          console.log(response);
        const data = response;
        return this.formatAPIResponse(data);
      } catch (error) {
        console.error("API Request failed:", error);
        throw new Error(`Failed to get response: ${error.message}`);
      }
    }
  async sendPromptWithRetry(message, options = {}, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.sendPrompt(message, options);
      } catch (error) {
        lastError = error;

        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }

    throw lastError;
  }

  formatAPIResponse(apiData) {
    // Map server response to your chart format
    return {
      content: apiData.data.data.response || apiData.text || "No response received",
      chartType: apiData.chartType || "line",
      data: this.transformChartData(apiData.data.data.data, apiData.data.data.chartType),
    };
  }

  transformChartData(rawData, chartType) {
    if (!rawData) return null;

    const baseData = {
      title: rawData.title || "Ocean Data Visualization",
      xAxisLabel: rawData.xAxisLabel || "X Axis",
      yAxisLabel: rawData.yAxisLabel || "Y Axis",
    };

    switch (chartType) {
      case "multi":
        return {
          ...baseData,
          y2AxisLabel: rawData.y2AxisLabel || "Secondary Axis",
          multiData:
            rawData.series?.map((series, index) => ({
              name: series.name || `Series ${index + 1}`,
              x: series.x || [],
              y: series.y || [],
              type: "scatter",
              mode: "lines+markers",
              yaxis: index === 0 ? "y" : "y2",
            })) || [],
        };

      case "bar":
        if (rawData.series && rawData.series.length > 1) {
          return {
            ...baseData,
            barData: rawData.series.map((series) => ({
              name: series.name,
              x: series.x || [],
              y: series.y || [],
              type: "bar",
            })),
          };
        }
        return {
          ...baseData,
          chartData: {
            x: rawData.x || [],
            y: rawData.y || [],
            type: "bar",
          },
        };

      case "heatmap":
        return {
          ...baseData,
          chartData: {
            z: rawData.z || [[]],
            x: rawData.x || [],
            y: rawData.y || [],
            type: "heatmap",
            colorscale: rawData.colorscale || [
              [0, "#000080"],
              [0.5, "#00bcd4"],
              [1, "#ff6b6b"],
            ],
          },
        };

      default: // line chart
        return {
          ...baseData,
          value: rawData.summary?.value,
          change: rawData.summary?.change,
          period: rawData.summary?.period,
          chartData: {
            x: rawData.x || [],
            y: rawData.y || [],
            type: "scatter",
            mode: "lines+markers",
          },
        };
    }
  }
}

export default new APIService();







// {
//   "response": "Here's the ocean temperature data you requested...",
//   "chartType": "line",
//   "data": {
//     "title": "Ocean Temperature Profile",
//     "xAxisLabel": "Depth (m)",
//     "yAxisLabel": "Temperature (°C)",
//     "x": [0, 10, 20, 30, 40, 50],
//     "y": [25.2, 24.8, 24.1, 23.5, 22.9, 22.3],
//     "summary": {
//       "value": "25.2°C",
//       "change": "+0.3°C",
//       "period": "Surface temperature"
//     }
//   }
// }



// {
//   "response": "Temperature and salinity comparison...",
//   "chartType": "multi",
//   "data": {
//     "title": "Ocean Profile Comparison",
//     "xAxisLabel": "Depth (m)",
//     "yAxisLabel": "Temperature (°C)",
//     "y2AxisLabel": "Salinity (PSU)",
//     "series": [
//       {
//         "name": "Temperature",
//         "x": [0, 10, 20, 30],
//         "y": [25.2, 24.8, 24.1, 23.5]
//       },
//       {
//         "name": "Salinity", 
//         "x": [0, 10, 20, 30],
//         "y": [34.5, 34.7, 34.8, 34.9]
//       }
//     ]
//   }
// }

