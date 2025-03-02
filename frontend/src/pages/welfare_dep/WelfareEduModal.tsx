import React, {useState } from "react";
import "../../styles/WelfareEdu.css";
import { useEffect } from "react";

interface WelfareRecord {
    citizen_id: number;
    name: string;
    gender: string;
    dob: string;
    educational_level: string;
    total_income: number;
}

const WelfareEduModal: React.FC = () => {
    const [gender, setGender] = useState<string>("All");
    const [educationalLevel, setEducationalLevel] = useState<string>("All");
    const [dobMin, setDobMin] = useState<string>("1980-01-01");
    const [dobMax, setDobMax] = useState<string>("2000-12-31");
    const [incomeMin, setIncomeMin] = useState<number>(10000);
    const [incomeMax, setIncomeMax] = useState<number>(800000);
    const [records, setRecords] = useState<WelfareRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<WelfareRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    //additional filters on citizen id, name and gender
    const [citizenIdFilter, setCitizenIdFilter] = useState(0);
    const [nameFilter, setNameFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const requestBody = {
                gender: gender,
                educational_level: educationalLevel,
                dob_min: dobMin,
                dob_max: dobMax,
                income_min: incomeMin,
                income_max: incomeMax,
            };

            console.log(requestBody);

            const response = await fetch("http://localhost:8000/edu-dept/edu-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" ,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data);
            console.log(data);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    //useEffect for filtering records based on additional filters
    
useEffect(() => {
    const filtered = records.filter((record) => {
        return (
            (citizenIdFilter === 0 || record.citizen_id === citizenIdFilter) &&
            (nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
            (genderFilter === "" || record.gender === genderFilter)
        );
    });
    setFilteredRecords(filtered);
}, [citizenIdFilter, nameFilter, genderFilter, records]);
    return (
        <div id="welfare-edu-container" className="welfare-container card-holder">
            <h2 className="welfare-title">Education Welfare Query</h2>

            {error && <div className="welfare-error">{error}</div>}

            {/* Form Section */}
            <form className="welfare-form" onSubmit={handleSubmit}>
                <div className="select-opt">
                    <div className="opt-sel">
                        <label className="welfare-label">Gender :</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="welfare-input">
                            <option value="All">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="opt-sel">
                        <label className="welfare-label">Educational Level :</label>
                        <select value={educationalLevel} onChange={(e) => setEducationalLevel(e.target.value)} className="welfare-input">
                            <option value="All">All</option>
                            <option value="Primary">Primary</option>
                            <option value="Secondary">Secondary</option>
                            <option value="Higher Secondary">Higher Secondary</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                        </select>
                    </div>
                </div>

                <label className="welfare-label">Date of Birth Range:</label>
                <div className="welfare-range">
                    <input type="date" value={dobMin} onChange={(e) => setDobMin(e.target.value)} className="welfare-input" />
                    <span className="welfare-separator">to</span>
                    <input type="date" value={dobMax} onChange={(e) => setDobMax(e.target.value)} className="welfare-input" />
                </div>

                <label className="welfare-label">Income Range:</label>
                <div className="welfare-range">
                    <input type="number" value={incomeMin} onChange={(e) => setIncomeMin(Number(e.target.value))} className="welfare-input" />
                    <span className="welfare-separator">to</span>
                    <input type="number" value={incomeMax} onChange={(e) => setIncomeMax(Number(e.target.value))} className="welfare-input" />
                </div>

                <button className="welfare-submit" type="submit">Submit</button>
                <br/>
            </form>

            <div className="welfare-query-filter">
                <div className="welfare-subfilter">
                    <label className="welfare-label">Citizen ID:</label>
                    <input
                        type="number"
                        value={citizenIdFilter}
                        onChange={(e) => setCitizenIdFilter(Number(e.target.value))}
                        className="welfare-input"
                    />
                </div>

                <div className="welfare-subfilter">
                    <label className="welfare-label">Name:</label>
                    <input
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="welfare-input"
                    />
                </div>

                <div className="welfare-subfilter">
                    <label className="welfare-label">Gender:</label>
                    <select
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="welfare-input"
                    >
                        <option value="All">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            {/* Loading State */}
            {loading && <p className="welfare-loading">Loading...</p>}

            {/* Table for Results */}
            {!loading && (
                <>
                    <div className="welfare-table-container">
                        <table className="welfare-table">
                            <thead>
                                <tr>
                                    <th>Citizen ID</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Educational Level</th>
                                    <th>Total Income</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.length > 0 ? (
                                    filteredRecords.map((record) => (
                                        <tr key={record.citizen_id}>
                                            <td>{record.citizen_id}</td>
                                            <td>{record.name}</td>
                                            <td>{record.gender}</td>
                                            <td>{record.dob}</td>
                                            <td>{record.educational_level}</td>
                                            <td>{record.total_income}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="no-data">No records found</td>
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

export default WelfareEduModal;
