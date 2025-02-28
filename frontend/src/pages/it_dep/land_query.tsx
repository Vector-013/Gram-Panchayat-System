import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CitizenPanchayatForm() {
    const [role, setRole] = useState("citizen");
    const [landValue, setLandValue] = useState(0);
    const [cropType, setCropType] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/land-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role, land_acres: landValue, crop_type: cropType }),
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
        <div>
            <h2>Citizen/Panchayat Registration</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="role">Role:</label>
                <select id="role" name="role" required value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="citizen">Citizen</option>
                    <option value="panchayat">Panchayat Employee</option>
                </select>
                <br /><br />
                
                <label htmlFor="land_acres">Land Owned (in acres):</label>
                <input 
                    type="range" 
                    id="land_acres" 
                    name="land_acres" 
                    min="0" 
                    max="100" 
                    step="0.1" 
                    value={landValue} 
                    onChange={(e) => setLandValue(parseFloat(e.target.value))} 
                />
                <span>{landValue}</span> acres
                <br /><br />
                
                <label htmlFor="crop_type">Crop Type:</label>
                <input 
                    type="text" 
                    id="crop_type" 
                    name="crop_type" 
                    required 
                    value={cropType} 
                    onChange={(e) => setCropType(e.target.value)}
                />
                <br /><br />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CitizenPanchayatForm;