import React, { useEffect, useState, useRef } from "react";
import "../styles/CustomeScroller.css";

function CustomScrollbar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const chatContent = document.querySelector(".chat-content");
    if (!chatContent) return;

    const updateScrollbar = () => {
      const scrollTop = chatContent.scrollTop;
      const scrollHeight = chatContent.scrollHeight;
      const clientHeight = chatContent.clientHeight;

      const maxScroll = scrollHeight - clientHeight;
      const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setScrollPercentage(percentage);
    };

    const handleScroll = () => {
      setIsScrolling(true);
      updateScrollbar();

      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    chatContent.addEventListener("scroll", handleScroll);

    // Initial update
    updateScrollbar();

    return () => {
      chatContent.removeEventListener("scroll", handleScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  const handleScrollbarClick = (e) => {
    const chatContent = document.querySelector(".chat-content");
    if (!chatContent || !scrollbarRef.current) return;

    const rect = scrollbarRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = (clickY / rect.height) * 100;

    const scrollHeight = chatContent.scrollHeight;
    const clientHeight = chatContent.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    const newScrollTop = (percentage / 100) * maxScroll;
    chatContent.scrollTo({
      top: newScrollTop,
      behavior: "smooth",
    });
  };

  const thumbHeight = Math.max(
    20,
    (window.innerHeight /
      document.querySelector(".chat-content")?.scrollHeight || 1) * 100
  );
  const thumbTop = (scrollPercentage / 100) * (100 - thumbHeight);

  return (
    <div
      ref={scrollbarRef}
      className={`custom-scrollbar ${isScrolling ? "scrolling" : ""}`}
      onClick={handleScrollbarClick}
    >
      <div
        ref={thumbRef}
        className="scrollbar-thumb"
        style={{
          height: `${thumbHeight}%`,
          top: `${thumbTop}%`,
        }}
      />
    </div>
  );
}

export default CustomScrollbar;
