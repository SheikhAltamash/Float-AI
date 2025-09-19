import { useState, useCallback, useEffect } from "react";
import chart from "../utils/chart"
import apiService from "../../../services/apiService";
export const useChatHistory = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm FloatChat AI. Ask me anything about ocean data or select a prompt to begin.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
const argoData = {
  idx: 2,
  wmo: "2902388",
  cycle: 305,
  time: "2024-01-01T23:02:49",
  lat: 7.03633,
  lon: 65.41964,
  mode: "D",
  levels: [],
};
argoData.levels = chart.levels;
  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem("floatchat-conversations");
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      setConversations(parsed);
      if (parsed.length > 0) {
        setCurrentConversationId(parsed[0].id);
        setMessages(parsed[0].messages);
      }
    } else {
      // Create first conversation
      const firstConv = createInitialConversation();
      setConversations([firstConv]);
      setCurrentConversationId(firstConv.id);
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(
        "floatchat-conversations",
        JSON.stringify(conversations)
      );
    }
  }, [conversations]);

  const createInitialConversation = () => ({
    id: Date.now(),
    title: "Ocean Data Query",
    lastMessage: "Hello! I'm FloatChat AI...",
    createdAt: new Date().toISOString(),
    messages: [
      {
        id: 1,
        type: "ai",
        content:
          "Hello! I'm FloatChat AI. Ask me anything about ocean data or select a prompt to begin.",
        timestamp: new Date().toISOString(),
      },
    ],
  });

  const createNewConversation = useCallback(() => {
    const newConversation = createInitialConversation();
    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setMessages(newConversation.messages);
  }, []);

  const switchConversation = useCallback(
    (conversationId) => {
      const conversation = conversations.find((c) => c.id === conversationId);
      if (conversation) {
        setCurrentConversationId(conversationId);
        setMessages(conversation.messages);
      }
    },
    [conversations]
  );

  const addMessage = useCallback(
    async (content, type = "user") => {
      if (type === "user") {
        setIsLoading(true);

        // Add user message
        const userMessage = {
          id: Date.now(),
          type: "user",
          content: content,
          timestamp: new Date().toISOString(),
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        // Update conversation
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === currentConversationId
              ? {
                  ...conv,
                  messages: newMessages,
                  lastMessage: content,
                  title:
                    content.length > 50
                      ? content.substring(0, 50) + "..."
                      : content,
                }
              : conv
          )
        );

        try {
          // Simulate API response
          // const response = await apiService.sendPromptWithRetry(content, {
          //   conversationId: currentConversationId,
          //   previousMessages: messages.slice(-5),
          //   environment: import.meta.env.VITE_ENVIRONMENT, });
const response = await simulateAPIResponse(content);
          const aiMessage = {
            id: Date.now() + 1,
            type: "ai",
            content: response.content,
            data: response.data,
            chartType: response.chartType,
            timestamp: new Date().toISOString(),
          };

          const finalMessages = [...newMessages, aiMessage];
          setMessages(finalMessages);

          // Update conversation with AI response
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === currentConversationId
                ? { ...conv, messages: finalMessages }
                : conv
            )
          );
        } catch (error) {
          console.error("Error getting AI response:", error);
          // Add error message
          const errorMessage = {
            id: Date.now() + 1,
            type: "ai",
            content: `Sorry, I couldn't process your request. ${error.message}`,
            timestamp: new Date().toISOString(),
          };

          const errorMessages = [...newMessages, errorMessage];
          setMessages(errorMessages);
          
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === currentConversationId
                ? { ...conv, messages: errorMessages }
                : conv
            )
          );
        }
       
        

        setIsLoading(false);
      }
    },
    [messages, currentConversationId]
  );

  // Simulate API response (replace with actual API call)
  // In your simulateAPIResponse function, update the salinity response:
  // const simulateAPIResponse = async (message) => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  //   const lowerMessage = message.toLowerCase();

  //   if (lowerMessage.includes("temperature")) {
  //     return {
  //       content: "Here's the average temperature data for the Pacific Ocean:",
  //       chartType: "line",
  //       data: {
  //         title: "Average Temperature of the Pacific Ocean",
  //         value: "18.5°C",
  //         change: "+0.2%",
  //         period: "Past 10 Years",
  //         chartData: {
  //           x: [
  //             "2014",
  //             "2015",
  //             "2016",
  //             "2017",
  //             "2018",
  //             "2019",
  //             "2020",
  //             "2021",
  //             "2022",
  //             "2023",
  //           ],
  //           y: [18.1, 18.3, 18.2, 18.4, 18.6, 18.3, 18.7, 18.5, 18.8, 18.5],
  //         },
  //       },
  //     };
  //   } else if (
  //     lowerMessage.includes("salinity") ||
  //     lowerMessage.includes("multi")
  //   ) {
  //     return {
  //       content: "Here's ocean data showing multiple parameters:",
  //       chartType: "multi",
  //       data: {
  //         title: "Ocean Parameters Comparison",
  //         yAxisLabel: "Temperature (°C)",
  //         y2AxisLabel: "Salinity (PSU)",
  //         multiData: [
  //           {
  //             name: "Temperature",
  //             x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //             y: [18.1, 18.3, 18.5, 19.2, 19.8, 20.1],
  //             type: "scatter",
  //             mode: "lines+markers",
  //             line: { color: "#00bcd4", width: 3 },
  //             marker: { color: "#00bcd4", size: 8 },
  //             yaxis: "y", // Primary y-axis
  //           },
  //           {
  //             name: "Salinity",
  //             x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //             y: [34.5, 34.7, 34.6, 34.8, 35.0, 35.1],
  //             type: "scatter",
  //             mode: "lines+markers",
  //             line: { color: "#4facfe", width: 3 },
  //             marker: { color: "#4facfe", size: 8 },
  //             yaxis: "y2", // Secondary y-axis
  //           },
  //         ],
  //       },
  //     };
  //   } else if (
  //     lowerMessage.includes("species") ||
  //     lowerMessage.includes("bar")
  //   ) {
  //     return {
  //       content: "Here's a breakdown of marine species distribution:",
  //       chartType: "bar",
  //       data: {
  //         title: "Marine Species Distribution",
  //         chartData: {
  //           x: ["Fish", "Mammals", "Crustaceans", "Mollusks", "Others"],
  //           y: [45, 12, 18, 15, 10],
  //         },
  //       },
  //     };
  //   } else {
  //     return {
  //       content: `I can help you explore ocean data! Try asking about temperature, salinity, marine species, or ocean currents. I can provide both textual information and interactive visualizations.`,
  //       chartType: null,
  //       data: null,
  //     };
  //   }
  // };
const simulateAPIResponse = async (message) => {
  await new Promise((resolve) => setTimeout(resolve, 7000));

  const lowerMessage = message.toLowerCase();

  // Extract data arrays from ARGO levels
  const depths = argoData.levels.map((level) => level.pres_dbar);
  const temperatures = argoData.levels.map((level) => level.temp_c);
  const salinity = argoData.levels.map((level) => level.psal);

  if (lowerMessage.includes("temperature") || lowerMessage.includes("temp")) {
    return {
      content: `Here's the temperature profile from ARGO float ${
        argoData.wmo
      } collected on ${new Date(
        argoData.time
      ).toLocaleDateString()}. The data shows temperature variations from surface (${temperatures[0].toFixed(
        1
      )}°C) to deep waters (${temperatures[temperatures.length - 1].toFixed(
        1
      )}°C).`,
      chartType: "line",
      data: {
        title: "Ocean Temperature Profile",
        value: `${temperatures[0].toFixed(1)}°C`,
        change: "Surface temperature",
        period: `${argoData.levels.length} measurements`,
        xAxisLabel: "Depth (dbar)",
        yAxisLabel: "Temperature (°C)",
        chartData: {
          x: depths,
          y: temperatures,
        },
      },
    };
  } else if (
    lowerMessage.includes("salinity") ||
    lowerMessage.includes("psal")
  ) {
    return {
      content: `Here's the salinity profile from ARGO float ${
        argoData.wmo
      }. Salinity ranges from ${Math.min(...salinity).toFixed(2)} to ${Math.max(
        ...salinity
      ).toFixed(2)} PSU, showing typical ocean stratification.`,
      chartType: "line",
      data: {
        title: "Ocean Salinity Profile",
        value: `${salinity[0].toFixed(2)} PSU`,
        change: "Surface salinity",
        period: `Location: ${argoData.lat.toFixed(2)}°N, ${argoData.lon.toFixed(
          2
        )}°E`,
        xAxisLabel: "Depth (dbar)",
        yAxisLabel: "Salinity (PSU)",
        chartData: {
          x: depths,
          y: salinity,
        },
      },
    };
  } else if (
    lowerMessage.includes("profile") ||
    lowerMessage.includes("multi")
  ) {
    return {
      content: `Complete oceanographic profile from ARGO float ${argoData.wmo} showing both temperature and salinity variations with depth. This data reveals ocean structure including mixed layer, thermocline, and deep water characteristics.`,
      chartType: "multi",
      data: {
        title: "Complete Ocean Profile - Temperature & Salinity",
        xAxisLabel: "Depth (dbar)",
        yAxisLabel: "Temperature (°C)",
        y2AxisLabel: "Salinity (PSU)",
        multiData: [
          {
            name: "Temperature",
            x: depths,
            y: temperatures,
            type: "scatter",
            mode: "lines+markers",
            line: { color: "#ff6b6b", width: 3 },
            marker: { color: "#ff6b6b", size: 4 },
            yaxis: "y",
          },
          {
            name: "Salinity",
            x: depths,
            y: salinity,
            type: "scatter",
            mode: "lines+markers",
            line: { color: "#4facfe", width: 3 },
            marker: { color: "#4facfe", size: 4 },
            yaxis: "y2",
          },
        ],
      },
    };
  } else if (
    lowerMessage.includes("depth") ||
    lowerMessage.includes("layers")
  ) {
    // Analyze ocean layers
    const surfaceData = argoData.levels.filter(
      (level) => level.pres_dbar <= 100
    );
    const thermoclineData = argoData.levels.filter(
      (level) => level.pres_dbar > 100 && level.pres_dbar <= 500
    );
    const deepData = argoData.levels.filter((level) => level.pres_dbar > 500);

    const avgSurfaceTemp =
      surfaceData.reduce((sum, level) => sum + level.temp_c, 0) /
      surfaceData.length;
    const avgThermoclineTemp =
      thermoclineData.reduce((sum, level) => sum + level.temp_c, 0) /
      thermoclineData.length;
    const avgDeepTemp =
      deepData.reduce((sum, level) => sum + level.temp_c, 0) / deepData.length;

    return {
      content: `Ocean layer analysis showing distinct temperature zones: Surface mixed layer (warm), Thermocline (rapid temperature decrease), and Deep water (cold and stable).`,
      chartType: "bar",
      data: {
        title: "Average Temperature by Ocean Layer",
        xAxisLabel: "Ocean Layer",
        yAxisLabel: "Temperature (°C)",
        chartData: {
          x: ["Surface (0-100m)", "Thermocline (100-500m)", "Deep (>500m)"],
          y: [
            avgSurfaceTemp.toFixed(1),
            avgThermoclineTemp.toFixed(1),
            avgDeepTemp.toFixed(1),
          ],
        },
      },
    };
  } else if (
    lowerMessage.includes("summary") ||
    lowerMessage.includes("info")
  ) {
    const maxDepth = Math.max(...depths);
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);
    const minSal = Math.min(...salinity);
    const maxSal = Math.max(...salinity);

    return {
      content:
        `**ARGO Float Data Summary**\n\n` +
        `🚢 **Float ID:** ${argoData.wmo}\n` +
        `📅 **Date:** ${new Date(argoData.time).toLocaleDateString()}\n` +
        `📍 **Location:** ${argoData.lat.toFixed(2)}°N, ${argoData.lon.toFixed(
          2
        )}°E\n` +
        `🌊 **Max Depth:** ${maxDepth.toFixed(0)} dbar (~${(
          maxDepth * 1.02
        ).toFixed(0)}m)\n` +
        `🌡️ **Temperature Range:** ${minTemp.toFixed(1)}°C - ${maxTemp.toFixed(
          1
        )}°C\n` +
        `🧂 **Salinity Range:** ${minSal.toFixed(2)} - ${maxSal.toFixed(
          2
        )} PSU\n` +
        `📊 **Total Measurements:** ${argoData.levels.length} levels\n` +
        `🌍 **Region:** Arabian Sea (Tropical Indian Ocean)`,
      chartType: null,
      data: null,
    };
  } else if (
    lowerMessage.includes("heatmap") ||
    lowerMessage.includes("heat")
  ) {
    // Create temperature heatmap data
    const tempBins = [];
    for (let i = 0; i < temperatures.length; i += 20) {
      tempBins.push(temperatures.slice(i, i + 20));
    }

    return {
      content: `Temperature heatmap visualization showing the thermal structure of the water column.`,
      chartType: "heatmap",
      data: {
        title: "Ocean Temperature Heatmap",
        xAxisLabel: "Depth Range",
        yAxisLabel: "Temperature Distribution",
        chartData: {
          z: tempBins,
          x: tempBins.map((_, i) => `${i * 20}-${(i + 1) * 20}m`),
          y: tempBins.map((_, i) => `Layer ${i + 1}`),
          type: "heatmap",
          colorscale: [
            [0, "#000080"],
            [0.5, "#00bcd4"],
            [1, "#ff6b6b"],
          ],
        },
      },
    };
  } else {
    return {
      content:
        `I can analyze real ARGO oceanographic data! Try asking about:\n\n` +
        `🌡️ **"temperature profile"** - Temperature vs depth\n` +
        `🧂 **"salinity data"** - Salinity measurements\n` +
        `📊 **"complete profile"** - Temperature & salinity together\n` +
        `🌊 **"ocean layers"** - Analysis by depth zones\n` +
        `🔥 **"heatmap"** - Temperature distribution visualization\n` +
        `📋 **"summary"** - Complete dataset information\n\n` +
        `This data comes from ARGO float ${argoData.wmo} in the Arabian Sea!`,
      chartType: null,
      data: null,
    };
  }
};

  return {
    conversations,
    currentConversationId,
    messages,
    createNewConversation,
    switchConversation,
    addMessage,
    isLoading,
  };
};
