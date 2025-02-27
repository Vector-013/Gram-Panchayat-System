import React from "react";

interface GeoFeature {
  feature_id: number;
  feature_type: string;
  name: string;
  area: number;
}

interface Props {
  geoFeatures: GeoFeature[];
}

const GeoTable: React.FC<Props> = ({ geoFeatures }) => {
  return (
    <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={tableHeaderStyle}>Feature ID</th>
            <th style={tableHeaderStyle}>Feature Type</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Area</th>
          </tr>
        </thead>
        <tbody>
          {geoFeatures.length > 0 ? (
            geoFeatures.map((feature) => (
              <tr key={feature.feature_id} style={tableRowStyle}>
                <td style={tableCellStyle}>{feature.feature_id}</td>
                <td style={tableCellStyle}>{feature.feature_type}</td>
                <td style={tableCellStyle}>{feature.name}</td>
                <td style={tableCellStyle}>{feature.area}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                No geo features found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

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

export default GeoTable;
