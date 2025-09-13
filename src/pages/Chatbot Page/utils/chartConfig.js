export const getCommonLayout = () => ({
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: {
    color: "#e2e8f0",
    family: "Inter, sans-serif",
    size: 12,
  },
  margin: { l: 50, r: 50, t: 20, b: 50 },
  showlegend: true,
  legend: {
    bgcolor: "rgba(0,0,0,0.3)",
    bordercolor: "rgba(0,188,212,0.3)",
    borderwidth: 1,
    x: 1,
    y: 1,
  },
  hovermode: "closest",
  hoverlabel: {
    bgcolor: "rgba(0,0,0,0.8)",
    bordercolor: "#00bcd4",
    font: { color: "#ffffff" },
  },
});

export const chartColors = {
  primary: "#00bcd4",
  secondary: "#26c6da",
  accent: "#4facfe",
  highlight: "#00f2fe",
  gradient: ["#00bcd4", "#26c6da", "#4facfe", "#00f2fe", "#64b5f6"],
};
