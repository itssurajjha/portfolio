// components/ChartDisplay.js
import React from "react";
import dynamic from "next/dynamic";

// Load Plotly only client-side
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const ChartDisplay = ({ chart }) => {
  return (
    <div className="project-card fade-up" style={{ padding: 20 }}>
      <div className="kicker">{chart.type?.toUpperCase() || "CHART"}</div>
      <h3>{chart.title}</h3>

      {chart.data ? (
        <Plot
          data={chart.data}
          layout={{
            ...chart.layout,
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#fff" }
          }}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <img
          src={chart.src}
          alt={chart.title}
          style={{ width: "100%", height: "auto", borderRadius: 8 }}
        />
      )}

      {chart.link && (
        <a href={chart.link} className="btn btn-primary" style={{ marginTop: 12 }}>
          View Full Report
        </a>
      )}
    </div>
  );
};

export default ChartDisplay;
