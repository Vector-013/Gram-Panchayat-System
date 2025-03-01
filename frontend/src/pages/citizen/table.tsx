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
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>ID</th>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>Gender</th>
            <th style={headerCellStyle}>DOB</th>
            <th style={headerCellStyle}>Education</th>
            <th style={headerCellStyle}>Income</th>
          </tr>
        </thead>
        <tbody>
          {citizens.length > 0 ? (
            citizens.map((citizen, index) => (
              <tr key={citizen.citizen_id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={cellStyle}>{citizen.citizen_id}</td>
                <td style={cellStyle}>{citizen.name}</td>
                <td style={cellStyle}>{citizen.gender}</td>
                <td style={cellStyle}>{citizen.dob}</td>
                <td style={cellStyle}>{citizen.educational_qualification}</td>
                <td style={cellStyle}>{citizen.income}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={noDataStyle}>
                No citizens found
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

// Styles
const tableContainerStyle: React.CSSProperties = {
  marginTop: "20px",
  overflowY: "scroll",
  maxHeight: "500px",
  borderRadius: "5px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
};

const headerCellStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const cellStyle: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const evenRowStyle: React.CSSProperties = {
  backgroundColor: "#f2f2f2",
};

const oddRowStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
};

const noDataStyle: React.CSSProperties = {
  textAlign: "center",
  fontWeight: "bold",
  color: "#888",
  padding: "15px",
};

export default CitizensTable;
