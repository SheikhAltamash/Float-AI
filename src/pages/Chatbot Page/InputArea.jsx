import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/InputArea.css";

function InputArea({ onSendMessage, isLoading, isSidebarCollapsed }) {
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const textareaRef = useRef(null); 
const [isMultiline, setIsMultiline] = useState(false);
  useEffect(() => {
    const chatContent = document.querySelector(".chat-content");
    if (!chatContent) return;

    const handleScroll = () => {
      const currentScrollY = chatContent.scrollTop;
      const maxScroll = chatContent.scrollHeight - chatContent.clientHeight;

      // Show input when at bottom or scrolling up
      if (currentScrollY >= maxScroll - 50 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide when scrolling down and not near bottom
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
      if (textareaRef.current) {
        textareaRef.current.style.height = "18px";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };



// Update the input change handler
const handleInputChange = (e) => {
  setInputValue(e.target.value);

  // Check if we need multiline
  const hasLineBreaks = e.target.value.includes("\n");
  const isLong = e.target.value.length > 50;

  if (hasLineBreaks || isLong) {
    setIsMultiline(true);
  } else if (e.target.value.length === 0) {
    setIsMultiline(false);
  }

  // Auto-resize for textarea
  if (isMultiline && textareaRef.current) {
    textareaRef.current.style.height = "auto";
    const scrollHeight = textareaRef.current.scrollHeight;
    const minHeight = 24;
    const maxHeight = 120;
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    textareaRef.current.style.height = `${newHeight}px`;
  }
};

// In the render section, use conditional rendering
{
  isMultiline ? (
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
  ) : (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Ask a follow-up question or start a new query..."
      className="message-input message-input-single"
      disabled={isLoading}
    />
  );
}
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
