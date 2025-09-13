import React from "react";
import { motion } from "framer-motion";

function MobileMenuToggle({ isOpen, onToggle }) {
  return (
    <motion.button
      className="mobile-menu-toggle"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isOpen ? "Close menu" : "Open menu"}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        {isOpen ? (
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M3 12h18m-9-6h9m-9 12h9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>
    </motion.button>
  );
}

export default MobileMenuToggle;
