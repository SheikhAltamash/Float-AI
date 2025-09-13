import React from "react";
import { motion } from "framer-motion";
import "../styles/LoadingIndicator.css";

function LoadingIndicator() {
  return (
    <motion.div
      className="loading-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="message ai-message">
        <div className="message-content">
          <div className="typing-indicator">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          {/* <span className="loading-text">Analyzing ocean data...</span> */}
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingIndicator;
