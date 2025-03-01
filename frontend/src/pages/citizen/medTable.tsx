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
    <div className="medical-table-container">
      <table className="medical-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Citizen ID</th>
            <th>Name</th>
            <th>Health Status</th>
            <th>Medical Condition</th>
          </tr>
        </thead>
        <tbody>
          {medicalData.length > 0 ? (
            medicalData.map((data) => (
              <tr key={data.medical_id}>
                <td>{data.medical_id}</td>
                <td>{data.citizen_id}</td>
                <td>{data.name}</td>
                <td>{data.health_status}</td>
                <td>{data.medical_condition}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalDataTable;
