import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VaccineRecordsTable from "./tableVaccine";

interface VaccineRecord {
  citizen_id: number;
  vaccination_id: number;
  name: string;
  vaccination_type: string;
  date_administered: string; // YYYY-MM-DD format
}

const VaccinationRecords: React.FC = () => {
  const { citizenId } = useParams<{ citizenId: string }>();
  const [vaccineRecords, setVaccineRecords] = useState<VaccineRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<VaccineRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Separate filters
  const [nameFilter, setNameFilter] = useState<string>("");
  const [vaccineTypeFilter, setVaccineTypeFilter] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  useEffect(() => {
    const fetchVaccineRecords = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5000/vaccine_records");
        const data: VaccineRecord[] = await response.json();
        setVaccineRecords(data);
      } catch (err) {
        console.error(err);
        setError("Error loading vaccine records data");
      }

      setLoading(false);
    };

    fetchVaccineRecords();
  }, [citizenId]);

  useEffect(() => {
    const filtered = vaccineRecords.filter((record) => {
      const recordDate = new Date(record.date_administered);
      const startDate = startDateFilter ? new Date(startDateFilter) : new Date("0000-01-01");
      const endDate = endDateFilter ? new Date(endDateFilter) : new Date("9999-12-31");

      return (
        (nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (vaccineTypeFilter === "" || record.vaccination_type.toLowerCase().includes(vaccineTypeFilter.toLowerCase())) &&
        (recordDate >= startDate && recordDate <= endDate)
      );
    });

    setFilteredRecords(filtered);
  }, [nameFilter, vaccineTypeFilter, startDateFilter, endDateFilter, vaccineRecords]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vaccination Records</h2>

      {/* Name Filter */}
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "100%", maxWidth: "300px" }}
      />

      {/* Vaccination Type Filter */}
      <input
        type="text"
        placeholder="Filter by vaccination type"
        value={vaccineTypeFilter}
        onChange={(e) => setVaccineTypeFilter(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "100%", maxWidth: "300px" }}
      />

      {/* Date Range Filter */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="date"
          placeholder="Start Date"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
          style={{ padding: "5px", width: "100%", maxWidth: "140px" }}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
          style={{ padding: "5px", width: "100%", maxWidth: "140px" }}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <VaccineRecordsTable vaccineRecords={filteredRecords} />
      )}
    </div>
  );
};

export default VaccinationRecords;
