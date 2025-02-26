import React from "react";

interface MedicalData {
  medical_id: number;
  citizen_id: number;
  name: string;
  health_status: string;
  medical_condition: string;
}

interface MedicalDataTableProps {
  medicalData: MedicalData[];
}

const MedicalDataTable: React.FC<MedicalDataTableProps> = ({ medicalData }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={tableHeaderStyle}>ID</th>
          <th style={tableHeaderStyle}>Citizen ID</th>
          <th style={tableHeaderStyle}>Name</th>
          <th style={tableHeaderStyle}>Health Status</th>
          <th style={tableHeaderStyle}>Medical Condition</th>
        </tr>
      </thead>
      <tbody>
        {medicalData.length > 0 ? (
          medicalData.map((data) => (
            <tr key={data.medical_id} style={tableRowStyle}>
              <td style={tableCellStyle}>{data.medical_id}</td>
              <td style={tableCellStyle}>{data.citizen_id}</td>
              <td style={tableCellStyle}>{data.name}</td>
              <td style={tableCellStyle}>{data.health_status}</td>
              <td style={tableCellStyle}>{data.medical_condition}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>No matching records found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

// Styles
const tableHeaderStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
  textAlign: "left",
  fontWeight: "bold",
};

const tableCellStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const tableRowStyle: React.CSSProperties = {
  backgroundColor: "#fff",
};

export default MedicalDataTable;
