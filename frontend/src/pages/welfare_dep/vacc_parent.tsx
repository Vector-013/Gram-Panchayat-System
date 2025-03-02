import React, { useState } from "react";
import "../../styles/VaccineDataQuery.css";

interface VaccineRecord {
    vaccination_id: number;
    citizen_id: number;
    name: string;
    age: number;
    vaccination_type: string;
    date_administered: string;
    mother_name: string;
    father_name: string;
    mother_qualification: string;
    father_qualification: string;
}

const VaccineDataModal: React.FC = () => {
    const [vaccineType, setVaccineType] = useState("Covid-19");
    const [startDate, setStartDate] = useState("2020-01-01");
    const [endDate, setEndDate] = useState("2023-12-31");
    const [parentQualification, setParentQualification] = useState("All");
    const [records, setRecords] = useState<VaccineRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const requestBody = {
                vaccine_type: vaccineType,
                start_date: startDate,
                end_date: endDate,
                parent_qualification: parentQualification,
            };

            const response = await fetch("http://127.0.0.1:8000/welfare/vaccines", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            const data = await response.json();
            setRecords(data);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div id="vaccine-query-container" className="vaccine-query-container card-holder">
            <h2 className="vaccine-query-title">Vaccine Data Query</h2>
            {error && <div className="vaccine-query-error">{error}</div>}
            
            <form className="vaccine-query-form" onSubmit={handleSubmit}>
                <label className="vaccine-query-label">Vaccine Type:</label>
                <input type="text" value={vaccineType} onChange={(e) => setVaccineType(e.target.value)} className="vaccine-query-input" />
                
                <label className="vaccine-query-label">Date Range:</label>
                <div className="vaccine-query-range">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="vaccine-query-input" />
                    <span className="vaccine-query-separator">to</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="vaccine-query-input" />
                </div>
                
                <label className="vaccine-query-label">Parent Qualification:</label>
                <select className="vaccine-query-input" value={parentQualification} onChange={(e) => setParentQualification(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Illiterate">Illiterate</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                </select>
                
                <button className="vaccine-query-submit" type="submit">Submit</button>
            </form>
            
            {loading && <p className="vaccine-query-loading">Loading...</p>}
            
            {!loading && (
                <div className="vaccine-records-container">
                    <table className="vaccine-records-table">
                        <thead>
                            <tr>
                                <th>Vaccination ID</th>
                                <th>Citizen ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Vaccine Type</th>
                                <th>Date Administered</th>
                                <th>Mother's Name</th>
                                <th>Father's Name</th>
                                <th>Mother's Qualification</th>
                                <th>Father's Qualification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.length > 0 ? (
                                records.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.vaccination_id}</td>
                                        <td>{record.citizen_id}</td>
                                        <td>{record.name}</td>
                                        <td>{record.age}</td>
                                        <td>{record.vaccination_type}</td>
                                        <td>{record.date_administered}</td>
                                        <td>{record.mother_name}</td>
                                        <td>{record.father_name}</td>
                                        <td>{record.mother_qualification}</td>
                                        <td>{record.father_qualification}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="no-data">No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VaccineDataModal;
