import React from "react";
import { motion } from "framer-motion";
import "./Footer.css";

function Footer() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialVariants = {
    hover: {
      scale: 1.2,
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container" id="contact">
        <motion.div
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="footer-brand" variants={itemVariants}>
            <div className="footer-logo">
              <span className="logo-text">FloatAI</span>
            </div>
            <p className="footer-tagline">Conversational AI for Ocean Data</p>
          </motion.div>

          {/* <motion.div className="footer-links" variants={itemVariants}>
            {/* <div className="footer-section">
              <h4>Product</h4>
              <motion.a href="#features" whileHover={{ x: 5 }}>
                Features
              </motion.a>
              <motion.a href="#demo" whileHover={{ x: 5 }}>
                Demo
              </motion.a>
              <motion.a href="#pricing" whileHover={{ x: 5 }}>
                Pricing
              </motion.a>
            </div> */}

            {/* <div className="footer-section">
              <h4>Company</h4>
              <motion.a href="#about" whileHover={{ x: 5 }}>
                About
              </motion.a>
              <motion.a href="#contact" whileHover={{ x: 5 }}>
                Contact
              </motion.a>
              <motion.a href="#careers" whileHover={{ x: 5 }}>
                Careers
              </motion.a>
            </div> */}
{/* 
            <div className="footer-section">
              <h4>Resources</h4>
              <motion.a href="#docs" whileHover={{ x: 5 }}>
                Documentation
              </motion.a>
              <motion.a href="#support" whileHover={{ x: 5 }}>
                Support
              </motion.a>
              <motion.a href="#blog" whileHover={{ x: 5 }}>
                Blog
              </motion.a>
            </div> 
          </motion.div> */}

          <motion.div className="footer-contact" variants={itemVariants}>
            <h4>Get in Touch</h4>
            <motion.a
              href="mailto:hello@floatchat.ai"
              className="contact-email"
              whileHover={{ scale: 1.05 }}
            >
              altamashsheikh077@gmail.com
            </motion.a>
            {/* <div className="social-links">
              <motion.a
                href="#"
                className="social-link"
                variants={socialVariants}
                whileHover="hover"
              >
                🐦
              </motion.a>
              <motion.a
                href="#"
                className="social-link"
                variants={socialVariants}
                whileHover="hover"
              >
                💼
              </motion.a>
              <motion.a
                href="#"
                className="social-link"
                variants={socialVariants}
                whileHover="hover"
              >
                📧
              </motion.a>
            </div> */}
          </motion.div>
        </motion.div>

        {/* <motion.div
          className="footer-bottom"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 Float AI. All rights reserved.</p>
          <div className="footer-bottom-links">
            <motion.a href="#privacy" whileHover={{ scale: 1.05 }}>
              Privacy Policy
            </motion.a>
            <motion.a href="#terms" whileHover={{ scale: 1.05 }}>
              Terms of Service
            </motion.a>
          </div>
        </motion.div> */}
      </div>
    </motion.footer>
  );
}

export default Footer;
