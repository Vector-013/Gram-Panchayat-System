import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LandRecordsTable from "./tableLand";

interface LandRecord {
  citizen_id: number;
  land_id: number;
  name: string;
  area_acres: number;
  crop_type: string;
}

const LandRecords: React.FC = () => {
  const { citizenId } = useParams<{ citizenId: string }>();
  const [landRecords, setLandRecords] = useState<LandRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<LandRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
        const response = await fetch("http://localhost:5000/land_records");
        const data: LandRecord[] = await response.json();
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
    <div style={{ padding: "20px" }}>
      <h2>Land Records</h2>

      {/* Name Filter */}
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "100%", maxWidth: "300px" }}
      />

      {/* Crop Type Filter */}
      <input
        type="text"
        placeholder="Filter by crop type"
        value={cropTypeFilter}
        onChange={(e) => setCropTypeFilter(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "100%", maxWidth: "300px" }}
      />

      {/* Area Range Filter */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="number"
          placeholder="Min area (acres)"
          value={minAreaFilter}
          onChange={(e) => setMinAreaFilter(e.target.value)}
          style={{ padding: "5px", width: "100%", maxWidth: "140px" }}
        />
        <input
          type="number"
          placeholder="Max area (acres)"
          value={maxAreaFilter}
          onChange={(e) => setMaxAreaFilter(e.target.value)}
          style={{ padding: "5px", width: "100%", maxWidth: "140px" }}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <LandRecordsTable landRecords={filteredRecords} />
      )}
    </div>
  );
};

export default LandRecords;
