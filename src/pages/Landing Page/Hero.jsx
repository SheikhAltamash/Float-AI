import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import { Link } from "react-router";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-left">
            <motion.h1 className="hero-title" variants={itemVariants}>
              <span className="title-highlight animated-gradient slow">
                Float AI
              </span>{" "} <br className="on"/>
              Conversational AI for Ocean Data
            </motion.h1>
            <motion.p className="hero-subtitle" variants={itemVariants}>
              Ask questions. Get insights. Visualize the ocean like never
              before.
            </motion.p>
            <motion.div className="hero-buttons" variants={itemVariants}>
             <Link to='/chat'><motion.button
                className="btn-primary hero-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Launch Demo
              </motion.button></Link> 
              <motion.button
                className="btn-secondary hero-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
          <motion.div className="hero-right" variants={itemVariants}>
            <div className="hero-illustration">
              <motion.div
                className="chat-bubble"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="chat-icon">💬</span>
                <span>Show me temperature trends...</span>
              </motion.div>
              <motion.div
                className="data-visualization"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="chart-bars">
                  <motion.div
                    className="bar bar-1"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  ></motion.div>
                  <motion.div
                    className="bar bar-2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  ></motion.div>
                  <motion.div
                    className="bar bar-3"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  ></motion.div>
                  <motion.div
                    className="bar bar-4"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  ></motion.div>
                </div>
                <div className="ocean-waves">
                  <motion.div
                    className="wave wave-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <motion.div
                    className="wave wave-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  ></motion.div>
                  <motion.div
                    className="wave wave-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
