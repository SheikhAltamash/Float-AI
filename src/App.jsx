import React from "react";
import Header from "./pages/Landing Page/Header";
import Hero from "./pages/Landing Page/Hero";
import Features from "./pages/Landing Page/Features";
import UseCases from "./pages/Landing Page/UseCases";
import Workflow from "./pages/Landing Page/Workflow";
import Footer from "./pages/Landing Page/Footer";
import "./App.css";
import ScrollProgressBar from "./pages/Landing Page/ScrollBar";

function App() {
  return (
    <div className="App">
            <ScrollProgressBar></ScrollProgressBar>
<Header />
      <Hero />
      <Features />
      <UseCases />
      <Workflow />
      <Footer />
    </div>
  );
}

export default App;
