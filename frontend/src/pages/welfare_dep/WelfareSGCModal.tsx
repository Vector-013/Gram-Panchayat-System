import React, { useState } from "react";
import "../../styles/WelfareSGC.css";

interface WelfareRecord {
    citizen_id: number;
    name: string;
    age: number;
    household_income: number;
    address: string;
}

const WelfareSGCModal: React.FC = () => {
    const [minIncome, setMinIncome] = useState<number>(5);
    const [maxIncome, setMaxIncome] = useState<number>(300000);
    const [minAge, setMinAge] = useState<number>(5);
    const [maxAge, setMaxAge] = useState<number>(18);
    const [enrolled, setEnrolled] = useState<WelfareRecord[]>([]);
    const [notEnrolled, setNotEnrolled] = useState<WelfareRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const requestBody = {
                min_household_income: minIncome,
                max_household_income: maxIncome,
                min_age: minAge,
                max_age: maxAge,
            };

            const response = await fetch("http://localhost:8000/api/edu/single-girl-child", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            const data = await response.json();
            setEnrolled(data.enrolled);
            setNotEnrolled(data.not_enrolled);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div id="welfare-vaccine-container" className="welfare-container card-holder">
            <h2 className="welfare-title">Single Girl Child Welfare Enrollment</h2>

            {error && <div className="welfare-error">{error}</div>}

            {/* Form Section */}
            <form className="welfare-form" onSubmit={handleSubmit}>
                <label className="welfare-label">Household Income Range:</label>
                <div className="welfare-range">
                    <input
                        type="number"
                        value={minIncome}
                        onChange={(e) => setMinIncome(Number(e.target.value))}
                        className="welfare-input"
                    />
                    <span className="welfare-separator">to</span>
                    <input
                        type="number"
                        value={maxIncome}
                        onChange={(e) => setMaxIncome(Number(e.target.value))}
                        className="welfare-input"
                    />
                </div>

                <label className="welfare-label">Age Range:</label>
                <div className="welfare-range">
                    <input
                        type="number"
                        value={minAge}
                        onChange={(e) => setMinAge(Number(e.target.value))}
                        className="welfare-input"
                    />
                    <span className="welfare-separator">to</span>
                    <input
                        type="number"
                        value={maxAge}
                        onChange={(e) => setMaxAge(Number(e.target.value))}
                        className="welfare-input"
                    />
                </div>

                <button className="welfare-submit" type="submit">Submit</button>
            </form>

            {/* Loading State */}
            {loading && <p className="welfare-loading">Loading...</p>}

            {/* Tables for Enrolled & Not Enrolled */}
            {!loading && (
                <>
                    <h3 className="welfare-subtitle">Enrolled</h3>
                    <div className="welfare-table-container">
                        <table className="welfare-table">
                            <thead>
                                <tr>
                                    <th>Citizen ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Household Income</th>
                                    <th>Address</th>
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
                                        <td colSpan={5} className="no-data">No enrolled records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <h3 className="welfare-subtitle">Not Enrolled</h3>
                    <div className="welfare-table-container">
                        <table className="welfare-table">
                            <thead>
                                <tr>
                                    <th>Citizen ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Household Income</th>
                                    <th>Address</th>
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
                                        <td colSpan={5} className="no-data">No not enrolled records found</td>
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

export default WelfareSGCModal;
