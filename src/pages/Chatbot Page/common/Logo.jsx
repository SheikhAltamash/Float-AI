import React from "react";
import "../styles/Logo.css";

function FixedLogo() {
  return (
    <div className="logo-fixed">
      <img src="/slogo.png" alt="" className="chatLogo"/>
      <span className="title-highlight animated-gradient slow">Float AI</span>
    </div>
  );
}

export default FixedLogo;
