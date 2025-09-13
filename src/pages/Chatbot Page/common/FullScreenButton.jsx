import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "../styles/FullscreenButton.css";

function FullscreenButton({
  targetElementId,
  onFullscreenChange,
  className = "",
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if currently in fullscreen
  const checkFullscreenStatus = useCallback(() => {
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    const newIsFullscreen = !!fullscreenElement;
    setIsFullscreen(newIsFullscreen);

    // Notify parent component about fullscreen state change
    if (onFullscreenChange) {
      onFullscreenChange(newIsFullscreen);
    }
  }, [onFullscreenChange]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      checkFullscreenStatus();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, [checkFullscreenStatus]);

  // Enter fullscreen
  const enterFullscreen = async (element) => {
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
    } catch (error) {
      console.error("Error entering fullscreen:", error);
    }
  };

  // Exit fullscreen
  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
    } catch (error) {
      console.error("Error exiting fullscreen:", error);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const element = targetElementId
      ? document.getElementById(targetElementId)
      : document.documentElement;

    if (!element) {
      console.error("Target element not found");
      return;
    }

    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen(element);
    }
  };

  return (
    <motion.button
      className={`fullscreen-btn ${className} ${
        isFullscreen ? "in-fullscreen" : ""
      }`}
      onClick={toggleFullscreen}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isFullscreen ? "Exit Fullscreen (ESC)" : "Enter Fullscreen"}
    >
      <span className="fullscreen-icon">
        {isFullscreen ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
          </svg>
        )}
      </span>
      <span className="fullscreen-text">
        {isFullscreen ? "Exit" : "Fullscreen"}
      </span>
    </motion.button>
  );
}

export default FullscreenButton;
