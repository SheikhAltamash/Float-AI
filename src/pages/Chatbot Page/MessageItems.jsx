// MessageItems.js
import React from "react";
import ChartRenderer from "./charts/ChartRenderer";
import { motion } from "framer-motion";
import "./styles/MessageList.css";

function MessageItem({ message }) {
  const hasChart = message.data && message.chartType;
  const isError =
    message.type === "ai" &&
    message.content.includes("Sorry, I couldn't process");

  return (
    <motion.div
      className={`message ${message.type}-message ${
        isError ? "error-message" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="message-content">
        <p>{message.content}</p>

        {hasChart && !isError && (
          <div className="chart-section">
            <ChartRenderer
              data={message.data}
              initialChartType={message.chartType}
              messageContent={message.content}
              title={message.data?.title || "Ocean Data"}
            />
          </div>
        )}

        {isError && (
          <div className="error-indicator">
            <span className="error-icon">⚠️</span>
            <span>
              Please try rephrasing your question or check your connection.
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MessageItem;
