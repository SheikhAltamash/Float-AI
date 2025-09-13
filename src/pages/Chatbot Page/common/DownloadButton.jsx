import React from "react";
import { motion } from "framer-motion";
import "../styles/DownloadButton.css";

function DownloadButton({
  data,
  chartType,
  messageContent,
  title = "Ocean Data",
  className = "",
  compact = false,
}) {
  const handleDownload = (format) => {
    console.log(`Downloading ${format} for ${title}`);
    // Add your download logic here
  };

  const downloadOptions = [
    { format: "PNG", icon: "🖼️", description: "High quality image" },
    { format: "SVG", icon: "📊", description: "Vector graphics" },
    { format: "PDF", icon: "📄", description: "Document format" },
    { format: "CSV", icon: "📋", description: "Data spreadsheet" },
    { format: "JSON", icon: "🔗", description: "Raw data" },
  ];

  if (compact) {
    return (
      <div className="download-button-compact-expanded">
        {downloadOptions.map((option, index) => (
          <motion.button
            key={option.format}
            className="download-option-compact"
            onClick={() => handleDownload(option.format)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${option.format} - ${option.description}`}
          >
            <span className="download-option-icon-compact">{option.icon}</span>
            <span className="download-option-format-compact">
              {option.format}
            </span>
          </motion.button>
        ))}
      </div>
    );
  }

  // Original non-compact version remains unchanged
  return (
    <div className={`download-button-professional ${className}`}>
      {/* ... original implementation ... */}
    </div>
  );
}

export default DownloadButton;
