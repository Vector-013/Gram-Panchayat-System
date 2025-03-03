import { useState } from "react";
import "../../styles/MarriageQuery.css";
import { useNavigate } from "react-router-dom";

interface MarriageRecord {
    husband_id: number;
    wife_id: number;
    marriage_date: string;
    husband_name: string;
    wife_name: string;
    husband_household: number;
    wife_household: number;
    husband_address: string;
    wife_address: string;
}

interface MarriageRecords{
    marriages: MarriageRecord[];
}

function MarriageQueryForm() {
    const [householdId, setHouseholdId] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [marriageRecords, setMarriageRecords] = useState<MarriageRecord[]>([]);
    const [error, setError] = useState<string | null>(null);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (parseInt(startYear) > parseInt(endYear)) {
            setError("Start year cannot be greater than end year.");
            return;
        }
        try {
            const requestBody = {
                household_id: householdId ? parseInt(householdId) : null,
                year_min: startYear ? parseInt(startYear) : null,
                year_max: endYear ? parseInt(endYear) : null,
            };
            
            
            const response = await fetch("http://localhost:8000/census/marriage-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" , "Authorization": "Bearer " + localStorage.getItem("token")},
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Submission failed");
            }
            
            const data: MarriageRecords = await response.json();
            setMarriageRecords(data.marriages);
            console.log(data);
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
                                <th>Husband ID</th>
                                <th>Husband Name</th>
                                <th>Wife ID</th>
                                <th>Wife Name</th>
                                <th>Marriage Date</th>
                                <th>Husband Household ID</th>
                                <th>Wife Household ID</th>
                                <th>Husband Address</th>
                                <th>Wife Address</th>
                
                            </tr>
                        </thead>
                        <tbody>
                            {marriageRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.husband_id}</td>
                                    <td>{record.husband_name}</td>
                                    <td>{record.wife_id}</td>
                                    <td>{record.wife_name}</td>
                                    <td>{record.marriage_date}</td>
                                    <td>{record.husband_household}</td>
                                    <td>{record.wife_household}</td>
                                    <td>{record.husband_address}</td>
                                    <td>{record.wife_address}</td>
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
