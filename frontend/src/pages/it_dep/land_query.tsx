import { useState } from "react";
import "../../styles/LandQuery.css";
import { useNavigate } from "react-router-dom";

interface LandRecord {
    citizen_id: number;
    name: string;
    total_area: number;
    address: string;
    age: number;
    income: number;
}

function CitizenPanchayatForm() {
    const [role, setRole] = useState("citizen");
    const [landMin, setLandMin] = useState(0);
    const [landMax, setLandMax] = useState(100);
    const [cropType, setCropType] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [landRecords, setLandRecords] = useState<LandRecord[]>([]);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (landMin > landMax) {
            setError("Minimum land value cannot be greater than maximum land value.");
            return;
        }
        try {
            const requestBody: { role: string; lower_limit: number; upper_limit: number; crop_type?: string } = {
                role,
                lower_limit: landMin,
                upper_limit: landMax,
            };
            if (cropType.trim() !== "") {
                requestBody.crop_type = cropType;
            }
            
            const response = await fetch("http://localhost:8000/it-dept/land-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error("Submission failed");
            }
            const data: LandRecord[] = await response.json();
            setLandRecords(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div id="land-query-container" className="land-query-container col card-holder">
            <div className="header">
                <div className="land-query-title">Citizen/Panchayat Land Query</div>
                <button className="back-button" onClick={() => navigate("/it-dashboard")}>Back</button>
            </div>
            {error && <div className="land-query-error">{error}</div>}
            
            <form className="land-query-form" onSubmit={handleSubmit}>
                <label className="land-query-label">Role:</label>
                <select 
                    className="land-query-input"
                    required 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="citizen">Citizen</option>
                    <option value="panchayat">Panchayat Employee</option>
                </select>
                
                <div className="land-query-range">
                    <label className="land-query-label">Land Owned (in acres):</label>
                    <div className="land-query-input-group">
                        <input 
                            className="land-query-input"
                            type="number" 
                            min="0" 
                            max="100" 
                            step="0.1" 
                            value={landMin} 
                            onChange={(e) => setLandMin(parseFloat(e.target.value))} 
                        />
                        <span className="land-query-separator">to</span>
                        <input 
                            className="land-query-input"
                            type="number" 
                            min="0" 
                            max="100" 
                            step="0.1" 
                            value={landMax} 
                            onChange={(e) => setLandMax(parseFloat(e.target.value))} 
                        />
                    </div>
                </div>
                
                <label className="land-query-label">Crop Type:</label>
                <input 
                    className="land-query-input"
                    type="text" 
                    value={cropType} 
                    onChange={(e) => setCropType(e.target.value)}
                />
                
                <button className="land-query-submit" type="submit">Submit</button>
            </form>

            {landRecords.length > 0 && (
                <div className="land-records-container">
                    <table className="land-records-table">
                        <thead>
                            <tr>
                                <th>Citizen ID</th>
                                <th>Name</th>
                                <th>Total Area (Acres)</th>
                                <th>Address</th>
                                <th>Age</th>
                                <th>Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {landRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.citizen_id}</td>
                                    <td>{record.name}</td>
                                    <td>{record.total_area}</td>
                                    <td>{record.address}</td>
                                    <td>{record.age}</td>
                                    <td>{record.income}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CitizenPanchayatForm;
