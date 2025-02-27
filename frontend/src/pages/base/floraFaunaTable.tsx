import React from "react";

interface FloraFauna {
  f_id: number;
  type: string;
  name: string;
  habitat: string;
}

interface Props {
  data: FloraFauna[];
}

const FloraFaunaTable: React.FC<Props> = ({ data }) => {
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
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Type</th>
            <th style={tableHeaderStyle}>Habitat</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.f_id} style={tableRowStyle}>
                <td style={tableCellStyle}>{item.f_id}</td>
                <td style={tableCellStyle}>{item.name}</td>
                <td style={tableCellStyle}>{item.type}</td>
                <td style={tableCellStyle}>{item.habitat}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                No records found
              </td>
            </tr>
          )}
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

export default FloraFaunaTable;
