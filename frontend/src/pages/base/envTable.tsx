import React from "react";

interface Props {
  stats: Record<string, { min: number; max: number; avg: number }>;
}

const EnvironmentTable: React.FC<Props> = ({ stats }) => {
  const metrics = ["aqi", "temperature", "humidity", "rainfall"];

  return (
    <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "600px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={tableHeaderStyle}>Metric</th>
            <th style={tableHeaderStyle}>Min</th>
            <th style={tableHeaderStyle}>Max</th>
            <th style={tableHeaderStyle}>Avg</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric} style={tableRowStyle}>
              <td style={tableCellStyle}>{metric.toUpperCase()}</td>
              <td style={tableCellStyle}>{stats[metric]?.min.toFixed(2) || "N/A"}</td>
              <td style={tableCellStyle}>{stats[metric]?.max.toFixed(2) || "N/A"}</td>
              <td style={tableCellStyle}>{stats[metric]?.avg.toFixed(2) || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styling
const tableHeaderStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
  textAlign: "left",
};

const tableCellStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const tableRowStyle: React.CSSProperties = {
  backgroundColor: "#fff",
};

export default EnvironmentTable;
