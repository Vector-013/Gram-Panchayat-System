import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VaccineRecordsTable from "./tableVaccine";
import "../../styles/CitizenVaccine.css";

interface VaccineRecord {
  citizen_id: number;
  vaccination_id: number;
  name: string;
  vaccination_type: string;
  date_administered: string;
  age: number;
}

const CitizenVaccineModal: React.FC = () => {
  const { citizenId } = useParams<{ citizenId: string }>();
  const [vaccineRecords, setVaccineRecords] = useState<VaccineRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<VaccineRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [minDateFilter, setMinDateFilter] = useState<string>("");
  const [maxDateFilter, setMaxDateFilter] = useState<string>("");
  const [minAgeFilter, setMinAgeFilter] = useState<string>("");
  const [maxAgeFilter, setMaxAgeFilter] = useState<string>("");

  useEffect(() => {
    const fetchVaccineRecords = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://localhost:8000/api/${citizenId}/vaccine`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data: VaccineRecord[] = await response.json();
        console.log(data);
        setVaccineRecords(data);
      } catch (err) {
        console.error(err);
        setError("Error loading vaccination records");
      }

      setLoading(false);
    };

    fetchVaccineRecords();
  }, [citizenId]);

  useEffect(() => {
    const filtered = vaccineRecords.filter((record) => {
      const date = new Date(record.date_administered);
      const minDate = minDateFilter ? new Date(minDateFilter) : new Date("1900-01-01");
      const maxDate = maxDateFilter ? new Date(maxDateFilter) : new Date();

      const minAge = minAgeFilter === "" ? Number.NEGATIVE_INFINITY : Number(minAgeFilter);
      const maxAge = maxAgeFilter === "" ? Number.POSITIVE_INFINITY : Number(maxAgeFilter);

      return (
        (nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (typeFilter === "" || record.vaccination_type.toLowerCase().includes(typeFilter.toLowerCase())) &&
        (date >= minDate && date <= maxDate) &&
        (record.age >= minAge && record.age <= maxAge)
      );
    });

    setFilteredRecords(filtered);
  }, [nameFilter, typeFilter, minDateFilter, maxDateFilter, minAgeFilter, maxAgeFilter, vaccineRecords]);

  return (
    <div className="vaccine-container card-holder">
      <h2 className="vaccine-title">Vaccination Records</h2>

      {/* Filters */}
      <div className="vaccine-filter-container">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="vaccine-input"
        />

        <input
          type="text"
          placeholder="Filter by Vaccination Type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="vaccine-input"
        />

        <div className="vaccine-range">
          <label className="vaccine-label">Date Administered:</label>
          <input
            type="date"
            value={minDateFilter}
            onChange={(e) => setMinDateFilter(e.target.value)}
            className="vaccine-input"
          />
          <input
            type="date"
            value={maxDateFilter}
            onChange={(e) => setMaxDateFilter(e.target.value)}
            className="vaccine-input"
          />
        </div>

        <div className="vaccine-range">
          <label className="vaccine-label">Age Range:</label>
          <input
            type="number"
            placeholder="Min Age"
            value={minAgeFilter}
            onChange={(e) => setMinAgeFilter(e.target.value)}
            className="vaccine-input"
          />
          <input
            type="number"
            placeholder="Max Age"
            value={maxAgeFilter}
            onChange={(e) => setMaxAgeFilter(e.target.value)}
            className="vaccine-input"
          />
        </div>
      </div>

      {/* Display Table */}
      {loading ? (
        <p className="vaccine-loading">Loading...</p>
      ) : error ? (
        <p className="vaccine-error">{error}</p>
      ) : (
        <VaccineRecordsTable vaccineRecords={filteredRecords} />
      )}
    </div>
  );
};

export default CitizenVaccineModal;
