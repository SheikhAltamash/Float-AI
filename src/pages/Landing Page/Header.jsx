import React from "react";
import { motion } from "framer-motion";
import "./Header.css";

function Header() {
  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const buttonVariants = {
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
    <motion.header
      className="header"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <div className="nav-content">
          <motion.div
            className="logo"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            {/* <span className="logo-icon">🌊</span>
            <span className="logo-text">FloatChat</span> */}
            <img src="/logo.png" alt="" className="float_logo"/>
          </motion.div>
          <motion.nav className="nav-menu" variants={itemVariants}>
            <motion.a
              href="#work"
              className="nav-link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Workflow
            </motion.a>
            <motion.a
              href="#features"
              className="nav-link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.a>
            <motion.a
              href="#contact"
              className="nav-link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
          </motion.nav>
          <motion.div className="nav-buttons" variants={itemVariants}>
            <motion.button
              className="btn-secondary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Learn More
            </motion.button>
            <motion.button
              className="btn-primary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Launch Demo
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
