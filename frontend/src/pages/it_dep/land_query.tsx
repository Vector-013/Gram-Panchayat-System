import { useState } from "react";
// import { useNavigate } from "react-router-dom";

interface LandRecord {
    owner: string;
    land_size: number;
    crop_type: string;
    location: string;
}

function CitizenPanchayatForm() {
    const [role, setRole] = useState("citizen");
    const [landMin, setLandMin] = useState(0);
    const [landMax, setLandMax] = useState(100);
    const [cropType, setCropType] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [landRecords, setLandRecords] = useState<LandRecord[]>([]); // Store response data
    // const navigate = useNavigate();

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
            console.log(requestBody);
            
            const response = await fetch("http://localhost:8000/it-dept/land-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error("Submission failed");
            }
            const data: LandRecord[] = await response.json(); // Store response
            setLandRecords(data); // Update state with response data
            console.log(data);
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
                <label htmlFor="lower_limit">Min:</label>
                <input 
                    type="number" 
                    id="lower_limit" 
                    name="lower_limit" 
                    min="0" 
                    max="100" 
                    step="0.1" 
                    value={landMin} 
                    onChange={(e) => setLandMin(parseFloat(e.target.value))} 
                />
                
                <label htmlFor="upper_limit">Max:</label>
                <input 
                    type="number" 
                    id="upper_limit" 
                    name="upper_limit" 
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

            {/* Display Table Only If There Are Records */}
            {landRecords.length > 0 && (
                <div>
                    <h3>Land Records</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Owner</th>
                                <th>Land Size (acres)</th>
                                <th>Crop Type</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {landRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.name}</td>
                                    <td>{record.land_size}</td>
                                    <td>{record.crop_type}</td>
                                    <td>{record.location}</td>
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
