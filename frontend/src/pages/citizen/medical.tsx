import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MedicalDataTable from "./medTable";
import "../../styles/CitizenMedical.css";

interface MedicalData {
  medical_id: number;
  citizen_id: number;
  name: string;
  health_status: string;
  medical_condition: string;
}

const CitizenMedicalModal: React.FC = () => {
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
        const response = await fetch(`http://localhost:8000/api/${citizenId}/medical`);
        const data: MedicalData[] = await response.json();
        console.log(data);
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
    <div className="medical-container card-holder">
      <h2 className="medical-title">Medical Data for Household</h2>

      {/* Filter Section */}
      <div className="medical-filter-container">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="medical-input"
        />
        <input
          type="text"
          placeholder="Filter by Health Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="medical-input"
        />
        <input
          type="text"
          placeholder="Filter by Medical Condition"
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
          className="medical-input"
        />
      </div>

      {/* Display Table */}
      {loading ? (
        <p className="medical-loading">Loading...</p>
      ) : error ? (
        <p className="medical-error">{error}</p>
      ) : (
        <MedicalDataTable medicalData={filteredData} />
      )}
    </div>
  );
};

export default CitizenMedicalModal;
