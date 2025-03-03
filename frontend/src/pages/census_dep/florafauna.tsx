import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/CitizenFloraFauna.css";

interface FloraFaunaRecord {
    f_id : number;
    type: string;
    name: string;
    habitat: string;
    count: number;
}
// FloraFaunaQueryForm
const FloraFaunaQueryForm: React.FC = () => {
    const { citizenId } = useParams<{ citizenId: string }>();
    const [records, setRecords] = useState<FloraFaunaRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<FloraFaunaRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // Filter states
    const [typeFilter, setTypeFilter] = useState<string>("");
    const [nameFilter, setNameFilter] = useState<string>("");
    const [habitatFilter, setHabitatFilter] = useState<string>("");
    const [minCountFilter, setMinCountFilter] = useState<string>("");
    const [maxCountFilter, setMaxCountFilter] = useState<string>("");

    useEffect(() => {
        const fetchFloraFaunaRecords = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`http://localhost:8000/flora-fauna-assets/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                const data = await response.json();
                setRecords(data.flora_fauna);
            } catch (err) {
                console.error(err);
                setError("Error loading flora and fauna records");
            }

            setLoading(false);
        };

        fetchFloraFaunaRecords();
    }, [citizenId]);

    useEffect(() => {
        const filtered = records.filter((record) => {
            const minCount = minCountFilter === "" ? Number.NEGATIVE_INFINITY : Number(minCountFilter);
            const maxCount = maxCountFilter === "" ? Number.POSITIVE_INFINITY : Number(maxCountFilter);

            return (
                (nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
                (habitatFilter === "" || record.habitat.toLowerCase().includes(habitatFilter.toLowerCase())) &&
                (typeFilter === "" || record.type === typeFilter) &&
                (record.count >= minCount && record.count <= maxCount)
            );
        });

        setFilteredRecords(filtered);
    }, [nameFilter, habitatFilter, typeFilter, minCountFilter, maxCountFilter, records]);

    return (
        <div className="flora-fauna-container card-holder">
            <h2 className="flora-fauna-title">Flora & Fauna Records</h2>

            {/* Filters */}
            <div className="flora-fauna-filter-container">
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="flora-fauna-input"
                >
                    <option value="">All Types</option>
                    <option value="Flora">Flora</option>
                    <option value="Fauna">Fauna</option>
                </select>

                <input
                    type="text"
                    placeholder="Filter by Name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="flora-fauna-input"
                />

                <input
                    type="text"
                    placeholder="Filter by Habitat"
                    value={habitatFilter}
                    onChange={(e) => setHabitatFilter(e.target.value)}
                    className="flora-fauna-input"
                />

                <div className="flora-fauna-range">
                    <label className="flora-fauna-label">Count:</label>
                    <input
                        type="number"
                        placeholder="Min"
                        value={minCountFilter}
                        onChange={(e) => setMinCountFilter(e.target.value)}
                        className="flora-fauna-input"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxCountFilter}
                        onChange={(e) => setMaxCountFilter(e.target.value)}
                        className="flora-fauna-input"
                    />
                </div>
            </div>

            {/* Display Table */}
            {loading ? (
                <p className="flora-fauna-loading">Loading...</p>
            ) : error ? (
                <p className="flora-fauna-error">{error}</p>
            ) : (
                <div className="flora-fauna-table-container">
                    <table className="flora-fauna-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Habitat</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.type}</td>
                                        <td>{record.name}</td>
                                        <td>{record.habitat}</td>
                                        <td>{record.count}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="no-data">
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FloraFaunaQueryForm;
