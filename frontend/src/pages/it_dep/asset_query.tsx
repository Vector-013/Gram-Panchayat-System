import { useState } from "react";
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

            const response = await fetch("http://localhost:8000/assets/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }
            const data: AssetRecord[] = await response.json();
            setAssetRecords(data);
            navigate("/success");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="asset-query-container col card-holder">
            <div className="header">
                <div className="asset-query-title">Asset Query</div>
                <button className="back-button" onClick={() => navigate("/it-dashboard")}>Back</button>
            </div>

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

            {assetRecords.length > 0 && (
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
                            {assetRecords.map((record, index) => (
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
