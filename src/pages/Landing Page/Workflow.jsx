import React from "react";
import { motion } from "framer-motion";
import "./Workflow.css";

function Workflow() {
  const steps = [
    {
      icon: "💬",
      title: "Ask",
      description: "User query",
    },
    {
      icon: "🧠",
      title: "AI Understands",
      description: "LLM processes",
    },
    {
      icon: "📈",
      title: "Visualize",
      description: "Charts/maps",
    },
    {
      icon: "📄",
      title: "Get Insights",
      description: "Export or read summaries",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const arrowVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  return (
    <section className="workflow" id="work">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Simple 4-step process to unlock ocean insights
        </motion.p>
        <motion.div
          className="workflow-steps"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="workflow-step"
              variants={stepVariants}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div className="step-number" variants={numberVariants}>
                {index + 1}
              </motion.div>
              <motion.div
                className="step-icon"
                whileHover={{ scale: 1.3, rotate: 15 }}
                transition={{ duration: 0.3 }}
              >
                {step.icon}
              </motion.div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && (
                <motion.div
                  className="step-arrow"
                  variants={arrowVariants}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Workflow;
