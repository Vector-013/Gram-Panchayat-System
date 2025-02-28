import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AssetQueryForm() {
    const [assetType, setAssetType] = useState("");
    const [location, setLocation] = useState("");
    const [valueMin, setValueMin] = useState(0);
    const [valueMax, setValueMax] = useState(100000);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState<string | null>(null);
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
            navigate("/success");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="col card-holder">
            <h2>Asset Query</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="asset_type">Asset Type:</label>
                <select id="asset_type" name="asset_type" required value={assetType} onChange={(e) => setAssetType(e.target.value)}>
                    <option value="">Select Asset Type</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Road">Road</option>
                    <option value="School">School</option>
                    <option value="Library">Library</option>
                    <option value="Public Toilet">Public Toilet</option>
                    <option value="Water Pump">Water Pump</option>
                </select>
                <br /><br />

                <label htmlFor="location">Location:</label>
                <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                />
                <br /><br />

                <label>Asset Value Range:</label>
                <br />
                <label htmlFor="value_min">Min:</label>
                <input 
                    type="number" 
                    id="value_min" 
                    name="value_min" 
                    min="0" 
                    step="100" 
                    value={valueMin} 
                    onChange={(e) => setValueMin(parseFloat(e.target.value))} 
                />
                
                <label htmlFor="value_max">Max:</label>
                <input 
                    type="number" 
                    id="value_max" 
                    name="value_max" 
                    min="0" 
                    step="100" 
                    value={valueMax} 
                    onChange={(e) => setValueMax(parseFloat(e.target.value))} 
                />
                <br /><br />

                <label>Installation Date Range:</label>
                <br />
                <label htmlFor="start_date">From:</label>
                <input 
                    type="date" 
                    id="start_date" 
                    name="start_date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                />
                
                <label htmlFor="end_date">To:</label>
                <input 
                    type="date" 
                    id="end_date" 
                    name="end_date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <br /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AssetQueryForm;
