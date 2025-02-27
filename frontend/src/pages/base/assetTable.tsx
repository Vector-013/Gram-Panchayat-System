import React from "react";

interface AssetCount {
  type: string;
  count: number;
}

interface Props {
  assetCounts: AssetCount[];
}

const AssetsTable: React.FC<Props> = ({ assetCounts }) => {
  return (
    <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "400px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={tableHeaderStyle}>Asset Type</th>
            <th style={tableHeaderStyle}>Count</th>
          </tr>
        </thead>
        <tbody>
          {assetCounts.length > 0 ? (
            assetCounts.map((asset) => (
              <tr key={asset.type} style={tableRowStyle}>
                <td style={tableCellStyle}>{asset.type}</td>
                <td style={tableCellStyle}>{asset.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: "center", padding: "10px" }}>
                No assets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Table styles
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

export default AssetsTable;
