import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CitizenPanchayatForm() {
    const [role, setRole] = useState("citizen");
    const [landMin, setLandMin] = useState(0);
    const [landMax, setLandMax] = useState(100);
    const [cropType, setCropType] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (landMin > landMax) {
            setError("Minimum land value cannot be greater than maximum land value.");
            return;
        }
        try {
            const requestBody: { role: string; land_min: number; land_max: number; crop_type?: string } = {
                role,
                land_min: landMin,
                land_max: landMax,
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
            navigate("/success");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Citizen/Panchayat Land Query</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="role">Role:</label>
                <select id="role" name="role" required value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="citizen">Citizen</option>
                    <option value="panchayat">Panchayat Employee</option>
                </select>
                <br /><br />
                
                <label>Land Owned (in acres):</label>
                <br />
                <label htmlFor="land_min">Min:</label>
                <input 
                    type="number" 
                    id="land_min" 
                    name="land_min" 
                    min="0" 
                    max="100" 
                    step="0.1" 
                    value={landMin} 
                    onChange={(e) => setLandMin(parseFloat(e.target.value))} 
                />
                
                <label htmlFor="land_max">Max:</label>
                <input 
                    type="number" 
                    id="land_max" 
                    name="land_max" 
                    min="0" 
                    max="100" 
                    step="0.1" 
                    value={landMax} 
                    onChange={(e) => setLandMax(parseFloat(e.target.value))} 
                />
                <br /><br />
                
                <label htmlFor="crop_type">Crop Type:</label>
                <input 
                    type="text" 
                    id="crop_type" 
                    name="crop_type" 
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