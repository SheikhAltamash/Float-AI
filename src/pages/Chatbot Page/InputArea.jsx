import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/InputArea.css";

function InputArea({ onSendMessage, isLoading, isSidebarCollapsed }) {
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    const chatContent = document.querySelector(".chat-content");
    if (!chatContent) return;

    const handleScroll = () => {
      const currentScrollY = chatContent.scrollTop;
      const maxScroll = chatContent.scrollHeight - chatContent.clientHeight;

      if (currentScrollY >= maxScroll - 50 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    chatContent.addEventListener("scroll", handleScroll);
    return () => chatContent.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Simplified input change handler
  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120;
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`input-container ${
            isSidebarCollapsed ? "sidebar-collapsed" : ""
          }`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="input-wrapper-container">
            <form onSubmit={handleSubmit} className="input-form">
              <div className="input-wrapper">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a follow-up question or start a new query..."
                  className="message-input"
                  disabled={isLoading}
                  rows="1"
                />
                <motion.button
                  type="submit"
                  className="send-button"
                  disabled={!inputValue.trim() || isLoading}
                  whileHover={
                    !isLoading && inputValue.trim() ? { scale: 1.05 } : {}
                  }
                  whileTap={
                    !isLoading && inputValue.trim() ? { scale: 0.95 } : {}
                  }
                >
                  <span className="send-icon">→</span>
                </motion.button>
              </div>
            </form>
            <p className="input-disclaimer">
              Data provided by the National Oceanic and Atmospheric
              Administration (NOAA).
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InputArea;
