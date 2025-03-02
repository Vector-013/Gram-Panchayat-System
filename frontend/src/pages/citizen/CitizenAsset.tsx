import React, { useEffect, useState } from "react";
import "../../styles/CitizenAsset.css";

interface AssetRecord {
    asset_id: number;
    type: string;
    location: string;
    value: number;
    installation_date: string;
}

const CitizenAsset: React.FC = () => {
    const [records, setRecords] = useState<AssetRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<AssetRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // Filter states
    const [typeFilter, setTypeFilter] = useState<string>("");
    const [locationFilter, setLocationFilter] = useState<string>("");
    const [minDateFilter, setMinDateFilter] = useState<string>("");
    const [maxDateFilter, setMaxDateFilter] = useState<string>("");

    // useEffect(() => {
    //     const fetchAssetRecords = async () => {
    //         setLoading(true);
    //         setError("");

    //         try {
    //             const response = await fetch("http://localhost:8000/api/assets", {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": "Bearer " + localStorage.getItem("token"),
    //                 },
    //             });

    //             const data: AssetRecord[] = await response.json();
    //             console.log(data);
    //             setRecords(data);
    //         } catch (err) {
    //             console.error(err);
    //             setError("Error loading asset records");
    //         }

    //         setLoading(false);
    //     };

    //     fetchAssetRecords();
    // }, []);

    // useEffect(() => {
    //     const filtered = records.filter((record) => {
    //         const minDate = minDateFilter === "" ? "0000-00-00" : minDateFilter;
    //         const maxDate = maxDateFilter === "" ? "9999-99-99" : maxDateFilter;

    //         return (
    //             (typeFilter === "" || record.type === typeFilter) &&
    //             (locationFilter === "" || record.location === locationFilter) &&
    //             (record.installation_date >= minDate && record.installation_date <= maxDate)
    //         );
    //     });

    //     setFilteredRecords(filtered);
    // }, [typeFilter, locationFilter, minDateFilter, maxDateFilter, records]);

    return (
        <div className="asset-container card-holder">
            <h2 className="asset-title">Public Assets</h2>

            {/* Filters */}
            <div className="asset-filter-container">
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="asset-input"
                >
                    <option value="">Select Asset Type</option>
                    <option value="Street Light">Street Light</option>
                    <option value="School">School</option>
                    <option value="Road">Road</option>
                    <option value="Library">Library</option>
                    <option value="Public Toilet">Public Toilet</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Water Pump">Water Pump</option>
                    <option value="Well">Well</option>
                </select>

                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="asset-input"
                >
                    <option value="">Select Location</option>
                    <option value="Main Bazaar, Phulera">Main Bazaar, Phulera</option>
                    <option value="Gandhi Chowk, Phulera">Gandhi Chowk, Phulera</option>
                    <option value="Subhash Marg, Phulera">Subhash Marg, Phulera</option>
                    <option value="Rajput Mohalla, Phulera">Rajput Mohalla, Phulera</option>
                    <option value="Station Road, Phulera">Station Road, Phulera</option>
                </select>

                <div className="asset-range">
                    <label className="asset-label">Installation Date:</label>
                    <input
                        type="date"
                        placeholder="Min"
                        value={minDateFilter}
                        onChange={(e) => setMinDateFilter(e.target.value)}
                        className="asset-input"
                    />
                    <input
                        type="date"
                        placeholder="Max"
                        value={maxDateFilter}
                        onChange={(e) => setMaxDateFilter(e.target.value)}
                        className="asset-input"
                    />
                </div>
            </div>

            {/* Display Table */}
            {loading ? (
                <p className="asset-loading">Loading...</p>
            ) : error ? (
                <p className="asset-error">{error}</p>
            ) : (
                <div className="asset-table-container">
                    <table className="asset-table">
                        <thead>
                            <tr>
                                <th>Asset ID</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Value</th>
                                <th>Installation Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.asset_id}</td>
                                        <td>{record.type}</td>
                                        <td>{record.location}</td>
                                        <td>{record.value}</td>
                                        <td>{record.installation_date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="no-data">
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

export default CitizenAsset;
