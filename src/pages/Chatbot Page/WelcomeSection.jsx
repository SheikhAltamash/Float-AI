import React from "react";
import { motion } from "framer-motion";
import "./styles/Welcome.css";

function WelcomeSection({ onSendMessage }) {
  const suggestedPrompts = [
    "What is the average temperature of the Pacific Ocean?",
    "Show me a graph of sea level rise over the past decade.",
    "What are the most common marine species in the Arctic?",
    "Visualize ocean currents in the Atlantic.",
    "Compare ocean acidity levels across different regions.",
  ];

  return (
    <div className="welcome-section">
      <motion.div
        className="welcome-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="welcome-title">Explore the Depths of Oceanographic Data</h1>
        <p className="welcome-subtitle">
          Ask me anything about the ocean or select a prompt to begin.
        </p>
      </motion.div>
{/* 
      <div className="temperature-display">
        <motion.div
          className="temp-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3>Average Temperature of the Pacific Ocean</h3>
          <div className="temp-value">18.5°C</div>
          <div className="temp-change">
            <span className="change-indicator">📈 +0.2%</span>
            <span className="time-period">Past 10 Years</span>
          </div>
          <div className="temp-chart-placeholder">
            {/* Mini chart visualization 
            <svg width="300" height="80" viewBox="0 0 300 80">
              <path
                d="M 10 60 Q 50 40 90 50 T 170 30 T 250 45 T 290 35"
                stroke="#00bcd4"
                strokeWidth="3"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00bcd4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 10 60 Q 50 40 90 50 T 170 30 T 250 45 T 290 35 L 290 80 L 10 80 Z"
                fill="url(#gradient)"
              />
            </svg>
          </div>
        </motion.div>
      </div> */}

      <motion.div
        className="suggested-prompts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="prompts-title">Try asking about:</h3>
        <div className="prompts-grid">
          {suggestedPrompts.map((prompt, index) => (
            <motion.button
              key={index}
              className="prompt-button"
              onClick={() => onSendMessage(prompt)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {prompt}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default WelcomeSection;
