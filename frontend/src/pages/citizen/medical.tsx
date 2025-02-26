import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MedicalDataTable from "./medTable";

interface MedicalData {
  medical_id: number;
  citizen_id: number;
  name: string;
  health_status: string;
  medical_condition: string;
}

const MedicalDataPage: React.FC = () => {
  const { citizenId } = useParams<{ citizenId: string }>();
  const [medicalData, setMedicalData] = useState<MedicalData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [conditionFilter, setConditionFilter] = useState<string>("");

  useEffect(() => {
    if (!citizenId) return;

    const fetchMedicalData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://localhost:5000/medical_data`);
        const data: MedicalData[] = await response.json();

        if ("error" in data) {
          setMedicalData([]);
        } else {
          setMedicalData(data);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching medical data");
      }

      setLoading(false);
    };

    fetchMedicalData();
  }, [citizenId]);

  // Filtered data based on input fields
  const filteredData = medicalData.filter((data) =>
    data.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    data.health_status.toLowerCase().includes(statusFilter.toLowerCase()) &&
    data.medical_condition.toLowerCase().includes(conditionFilter.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Medical Data for Household</h2>

      {/* Filter Inputs */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Filter by Health Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Filter by Medical Condition"
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
          style={inputStyle}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <MedicalDataTable medicalData={filteredData} />
      )}
    </div>
  );
};

// Styles
const inputStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "200px",
};

export default MedicalDataPage;
