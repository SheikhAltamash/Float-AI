import React from "react";
import { motion } from "framer-motion";
import "./Features.css";

function Features() {
  const features = [
    {
      icon: "🗣️",
      title: "Chat with Data",
      description: "Ask natural questions and get instant answers.",
    },
    {
      icon: "📊",
      title: "Interactive Dashboards",
      description: "Depth profiles, time-series, maps, and heatmaps.",
    },
    {
      icon: "🔍",
      title: "Smart Retrieval",
      description: "AI + hybrid search ensures accurate results.",
    },
    {
      icon: "⚠️",
      title: "Anomaly Alerts",
      description: "Detect climate/ocean changes in real time.",
    },
    {
      icon: "📑",
      title: "Export Options",
      description: "Download results in multiple formats.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="features" id="features">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Powerful Features
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Everything you need to explore ocean data intelligently
        </motion.p>
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={cardVariants}
              whileHover="hover"
              {...hoverVariants}
            >
              <motion.div
                className="feature-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
