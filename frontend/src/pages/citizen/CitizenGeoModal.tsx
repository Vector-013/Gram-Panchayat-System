import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GeoRecordsTable from "./tableGeo";
import "../../styles/CitizenGeo.css";

interface GeoRecord {
    feature_id: number;
    feature_type: string;
    name: string;
    area: number;
}

const CitizenGeoModal: React.FC = () => {
    const { citizenId } = useParams<{ citizenId: string }>();
    const [geoRecords, setGeoRecords] = useState<GeoRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<GeoRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // Filter states
    const [nameFilter, setNameFilter] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<string>("");
    const [minAreaFilter, setMinAreaFilter] = useState<string>("");
    const [maxAreaFilter, setMaxAreaFilter] = useState<string>("");

    useEffect(() => {
        const fetchGeoRecords = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`http://localhost:8000/api/${citizenId}/geo`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                const data: GeoRecord[] = await response.json();
                console.log(data);
                setGeoRecords(data);
            } catch (err) {
                console.error(err);
                setError("Error loading geographic records");
            }

            setLoading(false);
        };

        fetchGeoRecords();
    }, [citizenId]);

    useEffect(() => {
        const filtered = geoRecords.filter((record) => {
            const minArea = minAreaFilter === "" ? Number.NEGATIVE_INFINITY : Number(minAreaFilter);
            const maxArea = maxAreaFilter === "" ? Number.POSITIVE_INFINITY : Number(maxAreaFilter);

            return (
                (nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
                (typeFilter === "" || record.feature_type === typeFilter) &&
                (record.area >= minArea && record.area <= maxArea)
            );
        });

        setFilteredRecords(filtered);
    }, [nameFilter, typeFilter, minAreaFilter, maxAreaFilter, geoRecords]);

    return (
        <div className="geo-container card-holder">
            <h2 className="geo-title">Geographic Features</h2>

            {/* Filters */}
            <div className="geo-filter-container">
                <input
                    type="text"
                    placeholder="Filter by Name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="geo-input"
                />

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="geo-input"
                >
                    <option value="">All Feature Types</option>
                    <option value="River">River</option>
                    <option value="Forest">Forest</option>
                    <option value="Mountain">Mountain</option>
                    <option value="Lake">Lake</option>
                    <option value="Desert">Desert</option>
                </select>

                <div className="geo-range">
                    <label className="geo-label">Area:</label>
                    <input
                        type="number"
                        placeholder="Min"
                        value={minAreaFilter}
                        onChange={(e) => setMinAreaFilter(e.target.value)}
                        className="geo-input"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxAreaFilter}
                        onChange={(e) => setMaxAreaFilter(e.target.value)}
                        className="geo-input"
                    />
                </div>
            </div>

            {/* Display Table */}
            {loading ? (
                <p className="geo-loading">Loading...</p>
            ) : error ? (
                <p className="geo-error">{error}</p>
            ) : (
                <GeoRecordsTable geoRecords={filteredRecords} />
            )}
        </div>
    );
};

export default CitizenGeoModal;
