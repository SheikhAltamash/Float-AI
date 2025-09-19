import { useCallback } from "react";
import { formatDataForExport } from "../utils/dataProcessor";
import jsPDF from "jspdf";

export const useDataExport = () => {
  /**
   * Generic utility to trigger a file download in the browser.
   */
  const downloadFile = useCallback((content, fileName, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, []);

  /**
   * Capture chart image using Plotly's toImage function with proper timing
   */
  const captureChartImage = useCallback(async (graphDiv) => {
    if (!graphDiv || !window.Plotly) {
      console.warn("Plotly instance or graph div not available");
      return null;
    }

    try {
      console.log("Attempting to capture chart image from:", graphDiv);

      // Wait a bit to ensure the plot is fully rendered
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if the plot has data
      const plotData = graphDiv.data;
      if (!plotData || plotData.length === 0) {
        console.warn("No plot data found");
        return null;
      }

      console.log("Plot data found:", plotData);

      // Use Plotly's toImage function with the actual DOM element
      const imageDataUrl = await window.Plotly.toImage(graphDiv, {
        format: "png",
        width: 800,
        height: 600,
        scale: 2,
        // Ensure we capture the current state
        engine: "png",
      });

      console.log("Image captured successfully");
      return imageDataUrl;
    } catch (error) {
      console.error("Error capturing chart image:", error);

      // Fallback: try with different parameters
      try {
        console.log("Trying fallback image capture...");
        const imageDataUrl = await window.Plotly.toImage(graphDiv, {
          format: "png",
          width: 600,
          height: 400,
          scale: 1,
        });
        return imageDataUrl;
      } catch (fallbackError) {
        console.error("Fallback image capture also failed:", fallbackError);
        return null;
      }
    }
  }, []);

  /**
   * Alternative image capture using html2canvas as fallback
   */
  const captureChartImageFallback = useCallback(async (graphDiv) => {
    try {
      // Dynamically import html2canvas if available
      const html2canvas = await import("html2canvas");

      const canvas = await html2canvas.default(graphDiv, {
        backgroundColor: "#0f0f0f",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 800,
        height: 600,
      });

      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("html2canvas fallback failed:", error);
      return null;
    }
  }, []);

  /**
   * Generate PDF with embedded chart image
   */
  const generatePDFWithChart = useCallback(
    async (data, title, messageContent, graphDiv) => {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      let yPosition = margin;

      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(0, 188, 212); // #00bcd4 color
      pdf.text(title, margin, yPosition);
      yPosition += 15;

      // Add generation timestamp
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `Generated on ${new Date().toLocaleString()}`,
        margin,
        yPosition
      );
      yPosition += 20;

      // Add analysis section
      pdf.setFontSize(16);
      pdf.setTextColor(0, 188, 212);
      pdf.text("Analysis", margin, yPosition);
      yPosition += 10;

      // Add message content
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      const splitText = pdf.splitTextToSize(messageContent, contentWidth);
      pdf.text(splitText, margin, yPosition);
      yPosition += splitText.length * 5 + 15;

      // Try to capture and add chart image
      try {
        console.log("Starting chart capture for PDF...");
        let chartImageUrl = await captureChartImage(graphDiv);

        // If primary method fails, try fallback
        if (!chartImageUrl) {
          console.log("Primary capture failed, trying fallback...");
          chartImageUrl = await captureChartImageFallback(graphDiv);
        }

        if (chartImageUrl) {
          // Add chart section title
          pdf.setFontSize(16);
          pdf.setTextColor(0, 188, 212);
          pdf.text("Chart Visualization", margin, yPosition);
          yPosition += 15;

          // Calculate image dimensions to fit within page
          const maxImageWidth = contentWidth;
          const maxImageHeight = pageHeight - yPosition - margin - 20; // Leave some space at bottom

          // Calculate the aspect ratio to maintain proportions
          const imageHeight = Math.min(maxImageHeight, maxImageWidth * 0.75); // 4:3 aspect ratio

          console.log(
            "Adding image to PDF with dimensions:",
            maxImageWidth,
            imageHeight
          );

          // Add the chart image
          pdf.addImage(
            chartImageUrl,
            "PNG",
            margin,
            yPosition,
            maxImageWidth,
            imageHeight
          );

          yPosition += imageHeight + 10;
        } else {
          // Fallback if image capture fails
          pdf.setFontSize(12);
          pdf.setTextColor(128, 128, 128);
          pdf.text("Chart image could not be captured", margin, yPosition);
          yPosition += 20;
        }
      } catch (error) {
        console.error("Error adding chart to PDF:", error);
        // Add error message to PDF
        pdf.setFontSize(12);
        pdf.setTextColor(255, 0, 0);
        pdf.text(
          "Error: Chart image could not be generated",
          margin,
          yPosition
        );
        yPosition += 20;
      }

      // Add data summary if space allows
      if (yPosition < pageHeight - 40) {
        pdf.setFontSize(14);
        pdf.setTextColor(0, 188, 212);
        pdf.text("Data Summary", margin, yPosition);
        yPosition += 10;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);

        if (data.chartData && data.chartData.x && data.chartData.y) {
          const dataPoints = Math.min(
            data.chartData.x.length,
            data.chartData.y.length
          );
          pdf.text(`Total data points: ${dataPoints}`, margin, yPosition);
          yPosition += 8;

          if (data.chartData.y.length > 0) {
            const values = data.chartData.y.filter(
              (v) => typeof v === "number"
            );
            if (values.length > 0) {
              const min = Math.min(...values);
              const max = Math.max(...values);
              const avg = values.reduce((a, b) => a + b, 0) / values.length;

              pdf.text(
                `Value range: ${min.toFixed(2)} - ${max.toFixed(2)}`,
                margin,
                yPosition
              );
              yPosition += 8;
              pdf.text(`Average value: ${avg.toFixed(2)}`, margin, yPosition);
            }
          }
        }
      }

      return pdf;
    },
    [captureChartImage, captureChartImageFallback]
  );

  /**
   * Handles the export process for various formats.
   */
  const exportData = useCallback(
    async (format, data, title, messageContent, graphDiv = null) => {
      const fileNameBase = title.replace(/\s+/g, "_").toLowerCase();

      switch (format) {
        case "CSV": {
          const content = formatDataForExport(data, "csv");
          downloadFile(
            content,
            `${fileNameBase}.csv`,
            "text/csv;charset=utf-8;"
          );
          break;
        }
        case "JSON": {
          const content = formatDataForExport(data, "json");
          downloadFile(content, `${fileNameBase}.json`, "application/json");
          break;
        }
        case "NetCDF": {
          const content = formatDataForExport(data, "netcdf");
          downloadFile(content, `${fileNameBase}.nc.json`, "application/json");
          break;
        }
        case "PDF": {
          try {
            console.log("Starting PDF generation with graph div:", graphDiv);
            const pdf = await generatePDFWithChart(
              data,
              title,
              messageContent,
              graphDiv
            );
            pdf.save(`${fileNameBase}_report.pdf`);
          } catch (error) {
            console.error("Error generating PDF:", error);
            // Fallback to basic PDF without chart
            const pdf = new jsPDF();
            pdf.setFontSize(16);
            pdf.text(title, 20, 30);
            pdf.setFontSize(12);
            pdf.text("Error: Could not generate PDF with chart", 20, 50);
            pdf.text(`Error details: ${error.message}`, 20, 70);
            pdf.save(`${fileNameBase}_error.pdf`);
          }
          break;
        }
        default:
          console.warn(`Unsupported export format: ${format}`);
      }
    },
    [downloadFile, generatePDFWithChart]
  );

  return { exportData };
};
