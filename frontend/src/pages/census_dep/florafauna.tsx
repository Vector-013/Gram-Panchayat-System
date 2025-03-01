import { useState } from "react";
import "../../styles/CensusFloraFauna.css";
import { useNavigate } from "react-router-dom";

interface FloraFaunaRecord {
    name: string;
    type: string;
    habitat: string;
    count: number;
}

function FloraFaunaQueryForm() {
    const [name, setName] = useState("");
    const [type, setType] = useState("tree");
    const [habitat, setHabitat] = useState("land");
    const [floraFaunaRecords, setFloraFaunaRecords] = useState<FloraFaunaRecord[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const requestBody = {
                name,
                type,
                habitat,
            };
            
            const response = await fetch("http://localhost:8000/flora-fauna-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error("Submission failed");
            }
            const data: FloraFaunaRecord[] = await response.json();
            setFloraFaunaRecords(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flora-fauna-query-container col card-holder">
            <div className="header">
                <div className="flora-fauna-query-title">Flora & Fauna Query</div>
            </div>
            {error && <div className="flora-fauna-query-error">{error}</div>}
            
            <form className="flora-fauna-query-form" onSubmit={handleSubmit}>
                <label className="flora-fauna-query-label">Name:</label>
                <input 
                    className="flora-fauna-query-input"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                
                <label className="flora-fauna-query-label">Type:</label>
                <select 
                    className="flora-fauna-query-input"
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="tree">Tree</option>
                    <option value="animal">Animal</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="flower">Flower</option>
                </select>
                
                <label className="flora-fauna-query-label">Habitat:</label>
                <select 
                    className="flora-fauna-query-input"
                    value={habitat} 
                    onChange={(e) => setHabitat(e.target.value)}
                >
                    <option value="desert">Desert</option>
                    <option value="land">Land</option>
                    <option value="water">Water</option>
                    <option value="forest">Forest</option>
                    <option value="mountains">Mountains</option>
                </select>
                
                <button className="flora-fauna-query-submit" type="submit">Submit</button>
            </form>

            {floraFaunaRecords.length > 0 && (
                <div className="flora-fauna-total-count">
                    Total Count: {floraFaunaRecords.reduce((total, record) => total + record.count, 0)}
                </div>
            )}

            {floraFaunaRecords.length > 0 && (
                <div className="flora-fauna-records-container">
                    <table className="flora-fauna-records-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Habitat</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {floraFaunaRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.name}</td>
                                    <td>{record.type}</td>
                                    <td>{record.habitat}</td>
                                    <td>{record.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default FloraFaunaQueryForm;