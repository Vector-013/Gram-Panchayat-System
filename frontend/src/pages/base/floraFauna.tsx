import React, { useState, useEffect } from "react";
import FloraFaunaTable from "./floraFaunaTable";

interface FloraFauna {
  f_id: number;
  type: string;
  name: string;
  habitat: string;
}

const FloraFaunaPage: React.FC = () => {
  const [floraFauna, setFloraFauna] = useState<FloraFauna[]>([]);
  const [filteredData, setFilteredData] = useState<FloraFauna[]>([]);
  const [filterType, setFilterType] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFloraFauna = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5000/flora_fauna");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data: FloraFauna[] = await response.json();
        setFloraFauna(data);
        setFilteredData(data);
      } catch (err) {
        setError("Error loading flora & fauna data");
        console.error(err);
      }

      setLoading(false);
    };

    fetchFloraFauna();
  }, []);

  useEffect(() => {
    let filtered = floraFauna;

    if (filterType) {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    if (filterName) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [filterType, filterName, floraFauna]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Flora & Fauna Records</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All</option>
          <option value="Flora">Flora</option>
          <option value="Fauna">Fauna</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <FloraFaunaTable data={filteredData} />
      )}
    </div>
  );
};

export default FloraFaunaPage;
