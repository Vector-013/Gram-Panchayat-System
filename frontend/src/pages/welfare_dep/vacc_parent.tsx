import React, { useState , useEffect} from "react";
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
    const [parentQualification, setParentQualification] = useState("");
    const [records, setRecords] = useState<VaccineRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<VaccineRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    //additional filters on name, age and date administered, citizen id, mother's name, father's name
    const [nameFilter, setNameFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState<number>(0);
    const [dateFilter, setDateFilter] = useState<string>("");
    const [citizenIdFilter, setCitizenIdFilter] = useState<number>(0);
    const [motherNameFilter, setMotherNameFilter] = useState("");
    const [fatherNameFilter, setFatherNameFilter] = useState("");

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

            console.log(requestBody);

            const response = await fetch("http://localhost:8000/welfare/vaccines", {
                method: "POST",
                headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${localStorage.getItem("token")}`},
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            const data = await response.json();
            setRecords(data.data);
            setFilteredRecords(data.data);
            console.log(data);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    //useEffect to filter records based on additional filters
    useEffect(() => {
        const filtered = records.filter((record) => {
            const matchesName =
                nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase());

            const matchesAge = ageFilter === 0 || record.age === ageFilter;

            const matchesDate =
                dateFilter === "" || record.date_administered === dateFilter;

            const matchesCitizenId =
                citizenIdFilter === 0 || record.citizen_id === citizenIdFilter;

            const matchesMotherName =
                motherNameFilter === "" ||
                record.mother_name.toLowerCase().includes(motherNameFilter.toLowerCase());

            const matchesFatherName =
                fatherNameFilter === "" ||
                record.father_name.toLowerCase().includes(fatherNameFilter.toLowerCase());

            return (
                matchesName &&
                matchesAge &&
                matchesDate &&
                matchesCitizenId &&
                matchesMotherName &&
                matchesFatherName
            );
        });

        setFilteredRecords(filtered);
    }, [
        records,
        nameFilter,
        ageFilter,
        dateFilter,
        citizenIdFilter,
        motherNameFilter,
        fatherNameFilter,
    ]);

    return (
        <div id="vaccine-query-container" className="vaccine-query-container card-holder">
            <h2 className="vaccine-query-title">Vaccine Data Query</h2>
            {error && <div className="vaccine-query-error">{error}</div>}
            
            <form className="vaccine-query-form" onSubmit={handleSubmit}>
                <label className="vaccine-query-label">Vaccine Type:</label>
                <select className="vaccine-query-input" value={vaccineType} onChange={(e) => setVaccineType(e.target.value)}>
                    <option value="Covid-19">Covid-19</option>
                    <option value="Polio">Polio</option>
                    <option value="HepatitisA">Hepatitis A</option>
                    <option value="HepatitisB">Hepatitis B</option>
                    <option value="Flu">Flu</option>
                    <option value="Rubella">Rubella</option>
                    <option value="Mumps">Mumps</option>
                    <option value="Small Pox">Small Pox</option>
                </select>
                
                <label className="vaccine-query-label">Date Range:</label>
                <div className="vaccine-query-range">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="vaccine-query-input" />
                    <span className="vaccine-query-separator">to</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="vaccine-query-input" />
                </div>
                
                <label className="vaccine-query-label">Parent Qualification:</label>
                <select className="vaccine-query-input" value={parentQualification} onChange={(e) => setParentQualification(e.target.value)}>
                    <option value="">All</option>
                    <option value="Illiterate">Illiterate</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                </select>
                
                <button className="vaccine-query-submit" type="submit">Submit</button>
            </form>

            {/* filters section */}

            <div className="medical-query-filter">
                <div className="medical-subfilter">
                    <label className="medical-query-label">Name:</label>
                    <input
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="medical-query-input"
                    />
                </div>
                
                <div className="medical-subfilter">
                    <label className="medical-query-label">Age:</label>
                    <input
                        type="number"
                        value={ageFilter}
                        onChange={(e) => setAgeFilter(Number(e.target.value))}
                        className="medical-query-input"
                    />
                </div>

                <div className="medical-subfilter">
                    <label className="medical-query-label">Date Administered:</label>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="medical-query-input"
                    />
                </div>

                <div className="medical-subfilter">
                    <label className="medical-query-label">Citizen ID:</label>
                    <input
                        type="number"
                        value={citizenIdFilter}
                        onChange={(e) => setCitizenIdFilter(Number(e.target.value))}
                        className="medical-query-input"
                    />
                </div>

                <div className="medical-subfilter">
                    <label className="medical-query-label">Mother's Name:</label>
                    <input
                        type="text"
                        value={motherNameFilter}
                        onChange={(e) => setMotherNameFilter(e.target.value)}
                        className="medical-query-input"
                    />
                </div>

                <div className="medical-subfilter">
                    <label className="medical-query-label">Father's Name:</label>
                    <input
                        type="text"
                        value={fatherNameFilter}
                        onChange={(e) => setFatherNameFilter(e.target.value)}
                        className="medical-query-input"
                    />
                </div>
            </div>
            
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
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((record, index) => (
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
