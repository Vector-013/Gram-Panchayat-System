import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AssetQuery.css";

interface AssetRecord {
    asset_id: number;
    type: string;
    location: string;
    installation_date: string;
    value: number;
}

function AssetQueryForm() {
    const [assetType, setAssetType] = useState("");
    const [location, setLocation] = useState("");
    const [valueMin, setValueMin] = useState(0);
    const [valueMax, setValueMax] = useState(100000);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [assetRecords, setAssetRecords] = useState<AssetRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<AssetRecord[]>([]);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (valueMin > valueMax) {
            setError("Minimum value cannot be greater than maximum value.");
            return;
        }
        try {
            const requestBody = {
                asset_type: assetType,
                location,
                value_min: valueMin,
                value_max: valueMax,
                start_date: startDate,
                end_date: endDate,
            };

            const response = await fetch("http://localhost:8000/it-dept/asset-query", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }
            const data: AssetRecord[] = await response.json();
            setAssetRecords(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Apply filters dynamically using useEffect
    useEffect(() => {
        const filtered = assetRecords.filter((record) => {
            const matchesType =
                assetType === "" || record.type.toLowerCase().includes(assetType.toLowerCase());

            const matchesLocation =
                location === "" || record.location.toLowerCase().includes(location.toLowerCase());

            const matchesValueRange =
                record.value >= valueMin && record.value <= valueMax;

            const matchesDateRange =
                (startDate === "" || new Date(record.installation_date) >= new Date(startDate)) &&
                (endDate === "" || new Date(record.installation_date) <= new Date(endDate));

            return matchesType && matchesLocation && matchesValueRange && matchesDateRange;
        });

        setFilteredRecords(filtered);
    }, [assetType, location, valueMin, valueMax, startDate, endDate, assetRecords]);

    return (
        <div className="asset-query-container col card-holder">
            <div className="asset-query-title">Asset Query</div>

            {error && <div className="asset-query-error">{error}</div>}

            <form className="asset-query-form" onSubmit={handleSubmit}>
                <label className="asset-query-label">Asset Type:</label>
                <select className="asset-query-input" value={assetType} onChange={(e) => setAssetType(e.target.value)}>
                    <option value="">Select Asset Type</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Road">Road</option>
                    <option value="School">School</option>
                    <option value="Library">Library</option>
                    <option value="Public Toilet">Public Toilet</option>
                    <option value="Water Pump">Water Pump</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Well">Well</option>
                </select>

                <label className="asset-query-label">Location:</label>
                <input className="asset-query-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

                <div className="asset-query-range">
                    <label className="asset-query-label">Asset Value Range:</label>
                    <div className="asset-query-input-group">
                        <input className="asset-query-input" type="number" value={valueMin} onChange={(e) => setValueMin(parseFloat(e.target.value))} />
                        <span className="asset-query-separator">to</span>
                        <input className="asset-query-input" type="number" value={valueMax} onChange={(e) => setValueMax(parseFloat(e.target.value))} />
                    </div>
                </div>

                <div className="asset-query-range">
                    <label className="asset-query-label">Installation Date Range:</label>
                    <div className="asset-query-input-group">
                        <input className="asset-query-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <span className="asset-query-separator">to</span>
                        <input className="asset-query-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                <input className="asset-query-submit" type="submit" value="Submit" />
            </form>

            {/* Filters Section */}
            <div className="asset-filter-container">
                <select className="asset-filter-input" value={assetType} onChange={(e) => setAssetType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Road">Road</option>
                    <option value="School">School</option>
                    <option value="Library">Library</option>
                    <option value="Public Toilet">Public Toilet</option>
                    <option value="Water Pump">Water Pump</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Well">Well</option>
                </select>

                <select className="asset-filter-input" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Select Location</option>
                    <option value="Main Bazaar, Phulera">Main Bazaar, Phulera</option>
                    <option value="Gandhi Chowk, Phulera">Gandhi Chowk, Phulera</option>
                    <option value="Subhash Marg, Phulera">Subhash Marg, Phulera</option>
                    <option value="Rajput Mohalla, Phulera">Rajput Mohalla, Phulera</option>
                    <option value="Station Road, Phulera">Station Road, Phulera</option>
                </select>

                Amount :
                <input
                    type="number"
                    placeholder="Min Value"
                    value={valueMin}
                    onChange={(e) => setValueMin(parseFloat(e.target.value))}
                    className="asset-filter-input"
                />

                <input
                    type="number"
                    placeholder="Max Value"
                    value={valueMax}
                    onChange={(e) => setValueMax(parseFloat(e.target.value))}
                    className="asset-filter-input"
                />
                Date :
                <input
                    type="date"
                    placeholder="Min Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="asset-filter-input"
                />

                <input
                    type="date"
                    placeholder="Max Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="asset-filter-input"
                />
            </div>

            {filteredRecords.length > 0 && (
                <div className="asset-records-container">
                    <table className="asset-records-table">
                        <thead>
                            <tr>
                                <th>Asset ID</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Installation Date</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.asset_id}</td>
                                    <td>{record.type}</td>
                                    <td>{record.location}</td>
                                    <td>{record.installation_date}</td>
                                    <td>{record.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AssetQueryForm;
