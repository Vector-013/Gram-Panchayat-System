import React, { useState, useEffect } from "react";
import GeoTable from "./geotable";

interface GeoFeature {
  feature_id: number;
  feature_type: string;
  name: string;
  area: number;
}

const GeoPage: React.FC = () => {
  const [geoFeatures, setGeoFeatures] = useState<GeoFeature[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<GeoFeature[]>([]);
  const [search, setSearch] = useState("");
  const [featureType, setFeatureType] = useState("");

  useEffect(() => {
    // Fetch geo features data (replace URL with actual API endpoint)
    const fetchGeoFeatures = async () => {
      try {
        const response = await fetch("http://localhost:5000/geo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data: GeoFeature[] = await response.json();
        setGeoFeatures(data);
      } catch (error) {
        console.error("Error fetching geo features:", error);
      }
    };

    fetchGeoFeatures();
  }, []);

  useEffect(() => {
    let filtered = geoFeatures.filter((feature) =>
      feature.name.toLowerCase().includes(search.toLowerCase())
    );
    
    if (featureType) {
      filtered = filtered.filter((feature) =>
        feature.feature_type.toLowerCase() === featureType.toLowerCase()
      );
    }
    
    setFilteredFeatures(filtered);
  }, [search, featureType, geoFeatures]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Geo Features</h2>
      
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      
      <select
        value={featureType}
        onChange={(e) => setFeatureType(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="">All Types</option>
        <option value="Mountain">Mountain</option>
        <option value="River">River</option>
        <option value="Forest">Forest</option>
        <option value="Lake">Lake</option>
      </select>
      
      <GeoTable geoFeatures={filteredFeatures} />
    </div>
  );
};

export default GeoPage;
