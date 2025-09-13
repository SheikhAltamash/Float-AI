import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/DownloadButton.css";

function DownloadButton({
  data,
  chartType,
  messageContent,
  title = "Ocean Data",
  className = "",
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownload = (format) => {
    console.log(`Downloading ${format} for ${title}`);
    // Add your download logic here
    setIsExpanded(false);
  };

  const downloadOptions = [
    { format: "PNG", icon: "🖼️", description: "High quality image" },
    { format: "SVG", icon: "📊", description: "Vector graphics" },
    { format: "PDF", icon: "📄", description: "Document format" },
    { format: "CSV", icon: "📋", description: "Data spreadsheet" },
    { format: "JSON", icon: "🔗", description: "Raw data" },
  ];

  return (
    <div className={`download-button-professional ${className}`}>
      <motion.button
        className="download-toggle-professional"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="download-toggle-content">
          <div className="download-toggle-left">
            <span className="download-icon-professional">📥</span>
            <span className="download-text-professional">Download Data</span>
          </div>
          <motion.span
            className="download-arrow-professional"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path
                d="M2 2L8 8L14 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="download-options-professional"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {downloadOptions.map((option, index) => (
              <motion.button
                key={option.format}
                className="download-option-professional"
                onClick={() => handleDownload(option.format)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="download-option-left">
                  <span className="download-option-icon">{option.icon}</span>
                  <div className="download-option-info">
                    <span className="download-option-format">
                      {option.format}
                    </span>
                    <span className="download-option-description">
                      {option.description}
                    </span>
                  </div>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="download-option-arrow"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DownloadButton;
