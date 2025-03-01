import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LandRecordsTable from "./tableLand";
import "../../styles/CitizenLand.css";

interface LandRecord {
  citizen_id: number;
  name: string;
  area_acres: number;
  crop_type: string;
}

const CitizenLandModal: React.FC = () => {
  const { citizenId } = useParams<{ citizenId: string }>();
  const [landRecords, setLandRecords] = useState<LandRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<LandRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [total_personal_land, setTotalPersonalLand] = useState<string>("");
  const [total_family_land, setTotalFamilyLand] = useState<string>("");

  // Separate filters
  const [nameFilter, setNameFilter] = useState<string>("");
  const [cropTypeFilter, setCropTypeFilter] = useState<string>("");
  const [minAreaFilter, setMinAreaFilter] = useState<string>("");
  const [maxAreaFilter, setMaxAreaFilter] = useState<string>("");

  useEffect(() => {
    const fetchLandRecords = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://localhost:8000/api/${citizenId}/fam-land`);
        const res: LandRecord[] = await response.json();
        const data = res.records;
        const total_personal_land = res.summary.total_person_land;
        const total_family_land = res.summary.total_family_land;
        setTotalPersonalLand(total_personal_land);
        setTotalFamilyLand(total_family_land);
        console.log(data);
        setLandRecords(data);
      } catch (err) {
        console.error(err);
        setError("Error loading land records data");
      }

      setLoading(false);
    };

    fetchLandRecords();
  }, [citizenId]);

  useEffect(() => {
    const filtered = landRecords.filter((record) => {
      const area = record.area_acres;
      const minArea = minAreaFilter === "" ? Number.NEGATIVE_INFINITY : Number(minAreaFilter);
      const maxArea = maxAreaFilter === "" ? Number.POSITIVE_INFINITY : Number(maxAreaFilter);

      return (
        (nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (cropTypeFilter === "" || record.crop_type.toLowerCase().includes(cropTypeFilter.toLowerCase())) &&
        (area >= minArea && area <= maxArea)
      );
    });

    setFilteredRecords(filtered);
  }, [nameFilter, cropTypeFilter, minAreaFilter, maxAreaFilter, landRecords]);

  return (
    <div className="land-container card-holder">
      <h2 className="land-title">Land Records</h2>
      <div className="stats">
        <h2 className="land-stats land-title">Total Personal Land: {total_personal_land} acres</h2>
        <h2 className="land-stats land-title">Total Family Land: {total_family_land} acres</h2>
      </div>
      {/* Filters */}
      <div className="land-filter-container">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="land-input"
        />

        <input
          type="text"
          placeholder="Filter by crop type"
          value={cropTypeFilter}
          onChange={(e) => setCropTypeFilter(e.target.value)}
          className="land-input"
        />

        <div className="land-range">
          <label className="land-label">Area (Acres):</label>
          <input
            type="number"
            placeholder="Min"
            value={minAreaFilter}
            onChange={(e) => setMinAreaFilter(e.target.value)}
            className="land-input"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxAreaFilter}
            onChange={(e) => setMaxAreaFilter(e.target.value)}
            className="land-input"
          />
        </div>
      </div>

      {/* Display Table */}
      {loading ? (
        <p className="land-loading">Loading...</p>
      ) : error ? (
        <p className="land-error">{error}</p>
      ) : (
        <LandRecordsTable landRecords={filteredRecords} />
      )}
    </div>
  );
};

export default CitizenLandModal;
