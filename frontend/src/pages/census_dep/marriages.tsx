import { useState } from "react";
import "../../styles/MarriageQuery.css";
import { useNavigate } from "react-router-dom";

interface MarriageRecord {
    citizen1_id: number;
    citizen1_name: string;
    citizen2_id: number;
    citizen2_name: string;
    household_id: string;
    marriage_date: string;
}

function MarriageQueryForm() {
    const [householdId, setHouseholdId] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [marriageRecords, setMarriageRecords] = useState<MarriageRecord[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (parseInt(startYear) > parseInt(endYear)) {
            setError("Start year cannot be greater than end year.");
            return;
        }
        try {
            const requestBody = {
                household_id: householdId,
                start_year: startYear,
                end_year: endYear,
            };
            
            const response = await fetch("http://localhost:8000/marriage-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error("Submission failed");
            }
            const data: MarriageRecord[] = await response.json();
            setMarriageRecords(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="marriage-query-container col card-holder">
            <div className="header">
                <div className="marriage-query-title">Marriage Query</div>
            </div>
            {error && <div className="marriage-query-error">{error}</div>}
            
            <form className="marriage-query-form" onSubmit={handleSubmit}>
                <label className="marriage-query-label">Household ID:</label>
                <input 
                    className="marriage-query-input"
                    type="text" 
                    value={householdId} 
                    onChange={(e) => setHouseholdId(e.target.value)}
                />
                
                <label className="marriage-query-label">Year Range:</label>
                <div className="marriage-query-input-group">
                    <input className="marriage-query-input" type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} />
                    <span className="marriage-query-separator">to</span>
                    <input className="marriage-query-input" type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} />
                </div>
                
                <button className="marriage-query-submit" type="submit">Submit</button>
            </form>

            {marriageRecords.length > 0 && (
                <div className="marriage-records-container">
                    <table className="marriage-records-table">
                        <thead>
                            <tr>
                                <th>Citizen 1 ID</th>
                                <th>Citizen 1 Name</th>
                                <th>Citizen 2 ID</th>
                                <th>Citizen 2 Name</th>
                                <th>Household ID</th>
                                <th>Marriage Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marriageRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.citizen1_id}</td>
                                    <td>{record.citizen1_name}</td>
                                    <td>{record.citizen2_id}</td>
                                    <td>{record.citizen2_name}</td>
                                    <td>{record.household_id}</td>
                                    <td>{record.marriage_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MarriageQueryForm;
