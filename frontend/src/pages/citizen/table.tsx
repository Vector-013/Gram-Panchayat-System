import React from "react";

interface Citizen {
  citizen_id: number;
  name: string;
  gender: string;
  dob: string;
  educational_qualification: string;
  income: number;
  household_id: number;
}

interface Props {
  citizens: Citizen[];
}

const CitizensTable: React.FC<Props> = ({ citizens }) => {
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
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>DOB</th>
            <th style={tableHeaderStyle}>Education</th>
            <th style={tableHeaderStyle}>Income</th>
          </tr>
        </thead>
        <tbody>
          {citizens.length > 0 ? (
            citizens.map((citizen) => (
              <tr key={citizen.citizen_id} style={tableRowStyle}>
                <td style={tableCellStyle}>{citizen.citizen_id}</td>
                <td style={tableCellStyle}>{citizen.name}</td>
                <td style={tableCellStyle}>{citizen.gender}</td>
                <td style={tableCellStyle}>{citizen.dob}</td>
                <td style={tableCellStyle}>{citizen.educational_qualification}</td>
                <td style={tableCellStyle}>{citizen.income}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "10px" }}>
                No citizens found
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

export default CitizensTable;
