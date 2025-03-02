import React, { useState } from "react";
import "../../styles/MGNREGAQuery.css";

interface MGNREGARecord {
    citizen_id: number;
    name: string;
    age: number;
    household_id: number;
    address: string;
    personal_income: number;
    household_income: number;
}

const MGNREGAQuery: React.FC = () => {
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(60);
    const [minHouseholdIncome, setMinHouseholdIncome] = useState(0);
    const [maxHouseholdIncome, setMaxHouseholdIncome] = useState(50000);
    const [personalIncome, setPersonalIncome] = useState(100000);
    const [enrolled, setEnrolled] = useState<MGNREGARecord[]>([]);
    const [notEnrolled, setNotEnrolled] = useState<MGNREGARecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const requestBody = {
                min_age: minAge,
                max_age: maxAge,
                min_household_income: minHouseholdIncome,
                max_household_income: maxHouseholdIncome,
                personal_income: personalIncome,
            };

            const response = await fetch("http://localhost:8000/welfare/mgnrega/", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxQHBhbmNoYXlhdC5jb20iLCJyb2xlIjoicHJhZGhhbiIsImV4cCI6MTc0MDg4MDE5Mn0.DUZz-sER0CLGW13Qwr8LyekP4mtcViEUbHMhRYIIlLU"
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            const data = await response.json();
            setEnrolled(data.eligible_and_enrolled);
            setNotEnrolled(data.eligible_but_not_enrolled);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div id="mgnrega-query-container" className="mgnrega-query-container card-holder">
            <h2 className="mgnrega-query-title">MGNREGA Data Query</h2>
            {error && <div className="mgnrega-query-error">{error}</div>}
            
            <form className="mgnrega-query-form" onSubmit={handleSubmit}>
                <label className="mgnrega-query-label">Age Range:</label>
                <div className="mgnrega-query-range">
                    <input type="number" value={minAge} onChange={(e) => setMinAge(parseInt(e.target.value))} className="mgnrega-query-input" />
                    <span className="mgnrega-query-separator">to</span>
                    <input type="number" value={maxAge} onChange={(e) => setMaxAge(parseInt(e.target.value))} className="mgnrega-query-input" />
                </div>
                
                <label className="mgnrega-query-label">Household Income Range:</label>
                <div className="mgnrega-query-range">
                    <input type="number" value={minHouseholdIncome} onChange={(e) => setMinHouseholdIncome(parseInt(e.target.value))} className="mgnrega-query-input" />
                    <span className="mgnrega-query-separator">to</span>
                    <input type="number" value={maxHouseholdIncome} onChange={(e) => setMaxHouseholdIncome(parseInt(e.target.value))} className="mgnrega-query-input" />
                </div>
                
                <label className="mgnrega-query-label">Personal Income:</label>
                <input type="number" value={personalIncome} onChange={(e) => setPersonalIncome(parseInt(e.target.value))} className="mgnrega-query-input" />
                
                <button className="mgnrega-query-submit" type="submit">Submit</button>
                <br/>
            </form>
            
            {loading && <p className="mgnrega-query-loading">Loading...</p>}
            
            {!loading && (
                <>
                    <h4 className = "mgnrega-subtitle">Enrolled in MGNREGA</h4>
                    <div className="mgnrega-records-container">
                        <table className="mgnrega-records-table">
                            <thead>
                                <tr>
                                    <th>Citizen ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Household ID</th>
                                    <th>Address</th>
                                    <th>Personal Income</th>
                                    <th>Household Income</th>
                                </tr>
                            </thead>
                            <tbody>
                            {enrolled.length > 0 ? (
                                        enrolled.map((record) => (
                                            <tr key={record.citizen_id}>
                                                <td>{record.citizen_id}</td>
                                                <td>{record.name}</td>
                                                <td>{record.age}</td>
                                                <td>{record.household_income}</td>
                                                <td>{record.address}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="no-data">No enrolled records found</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                    <h4 className = "mgnrega-subtitle">Eligible but Not Enrolled</h4>
                    <div className="mgnrega-records-container">
                        <table className="mgnrega-records-table">
                            <thead>
                                <tr>
                                    <th>Citizen ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Household ID</th>
                                    <th>Address</th>
                                    <th>Personal Income</th>
                                    <th>Household Income</th>
                                </tr>
                            </thead>
                            <tbody>
                            {notEnrolled.length > 0 ? (
                                        notEnrolled.map((record) => (
                                            <tr key={record.citizen_id}>
                                                <td>{record.citizen_id}</td>
                                                <td>{record.name}</td>
                                                <td>{record.age}</td>
                                                <td>{record.household_income}</td>
                                                <td>{record.address}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="no-data">No not enrolled records found</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default MGNREGAQuery;
