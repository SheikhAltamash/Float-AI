import React from "react";
import { motion, useScroll } from "framer-motion";
import "./ScrollBar.css";

// We accept a `className` prop so we can add custom styles later, like placing it below the header.
const ScrollProgressBar = ({ className }) => {
  // The useScroll hook provides scroll progress as a value between 0 and 1.
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      // We combine the default class with any custom class passed in.
      className={`scroll-progress-bar ${className || ""}`}
      // The core of the animation: the horizontal scale (scaleX) is tied
      // directly to the scroll progress.
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgressBar;
