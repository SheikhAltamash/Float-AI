import React from "react";
import { motion } from "framer-motion";
import "./UseCases.css";

function UseCases() {
  const useCases = [
    {
      icon: "/landing/who/res.png",
      title: "Researchers",
      description: "Advanced data analysis and research tools",
    },
    {
      icon: "/landing/who/pol.png",
      title: "Policymakers",
      description: "Data-driven insights for policy decisions",
    },
    {
      icon: "/landing/who/stu.png",
      title: "Students",
      description: "Educational tools and interactive learning",
    },
    {
      icon: "/landing/who/env.png",
      title: "Environmental Monitoring",
      description: "Real-time environmental tracking and alerts",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const tileVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  };

  return (
    <section className="use-cases">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Who Uses Float AI?
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Empowering diverse communities with ocean intelligence
        </motion.p>
        <motion.div
          className="use-cases-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="use-case-tile"
              variants={tileVariants}
              whileHover={hoverEffect}
            >
              <motion.img
                src={useCase.icon}
                alt={useCase.title}
                className="feature-icon"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ duration: 0.3 }}
              />

              <h3 className="use-case-title">{useCase.title}</h3>
              <p className="use-case-description">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default UseCases;
