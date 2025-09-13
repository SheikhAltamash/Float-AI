import { useState, useCallback, useEffect } from "react";

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
        }

        setIsLoading(false);
      }
    },
    [messages, currentConversationId]
  );

  // Simulate API response (replace with actual API call)
  // In your simulateAPIResponse function, update the salinity response:
  const simulateAPIResponse = async (message) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("temperature")) {
      return {
        content: "Here's the average temperature data for the Pacific Ocean:",
        chartType: "line",
        data: {
          title: "Average Temperature of the Pacific Ocean",
          value: "18.5°C",
          change: "+0.2%",
          period: "Past 10 Years",
          chartData: {
            x: [
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2021",
              "2022",
              "2023",
            ],
            y: [18.1, 18.3, 18.2, 18.4, 18.6, 18.3, 18.7, 18.5, 18.8, 18.5],
          },
        },
      };
    } else if (
      lowerMessage.includes("salinity") ||
      lowerMessage.includes("multi")
    ) {
      return {
        content: "Here's ocean data showing multiple parameters:",
        chartType: "multi",
        data: {
          title: "Ocean Parameters Comparison",
          yAxisLabel: "Temperature (°C)",
          y2AxisLabel: "Salinity (PSU)",
          multiData: [
            {
              name: "Temperature",
              x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              y: [18.1, 18.3, 18.5, 19.2, 19.8, 20.1],
              type: "scatter",
              mode: "lines+markers",
              line: { color: "#00bcd4", width: 3 },
              marker: { color: "#00bcd4", size: 8 },
              yaxis: "y", // Primary y-axis
            },
            {
              name: "Salinity",
              x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              y: [34.5, 34.7, 34.6, 34.8, 35.0, 35.1],
              type: "scatter",
              mode: "lines+markers",
              line: { color: "#4facfe", width: 3 },
              marker: { color: "#4facfe", size: 8 },
              yaxis: "y2", // Secondary y-axis
            },
          ],
        },
      };
    } else if (
      lowerMessage.includes("species") ||
      lowerMessage.includes("bar")
    ) {
      return {
        content: "Here's a breakdown of marine species distribution:",
        chartType: "bar",
        data: {
          title: "Marine Species Distribution",
          chartData: {
            x: ["Fish", "Mammals", "Crustaceans", "Mollusks", "Others"],
            y: [45, 12, 18, 15, 10],
          },
        },
      };
    } else {
      return {
        content: `I can help you explore ocean data! Try asking about temperature, salinity, marine species, or ocean currents. I can provide both textual information and interactive visualizations.`,
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
