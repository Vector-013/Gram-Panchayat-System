import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertCitizen: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [education, setEducation] = useState<string>("");
    const [income, setIncome] = useState<number | "">("");
    const [householdId, setHouseholdId] = useState<number | "">("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const getToken = () => {
        // Retrieve the token from local storage or any other secure place
        return localStorage.getItem("token");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestBody = {
            name,
            gender,
            dob,
            household_id: householdId === "" ? null : householdId,
            income: income === "" ? 0 : income,
            educational_qualification: education,
            password,
        };

        try {
            const response = await fetch("http://localhost:8000/citizen-creator/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to insert citizen record");
            }

            setSuccess("Citizen record successfully added!");
            setName("");
            setGender("");
            setDob("");
            setEducation("");
            setIncome("");
            setHouseholdId("");
            setPassword("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert New Citizen</h3>

            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="insert-form-input" 
                    required 
                />

                <label className="insert-form-label">Gender:</label>
                <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    className="insert-form-input" 
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label className="insert-form-label">Date of Birth:</label>
                <input 
                    type="date" 
                    value={dob} 
                    onChange={(e) => setDob(e.target.value)} 
                    className="insert-form-input" 
                    required 
                />

                <label className="insert-form-label">Educational Qualification:</label>
                <select 
                    value={education} 
                    onChange={(e) => setEducation(e.target.value)} 
                    className="insert-form-input" 
                    required
                >
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Higher Secondary">Higher Secondary</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                </select>

                <label className="insert-form-label">Income:</label>
                <input 
                    type="number" 
                    value={income} 
                    onChange={(e) => setIncome(e.target.value === "" ? "" : parseFloat(e.target.value))} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Household ID:</label>
                <input 
                    type="number" 
                    value={householdId} 
                    onChange={(e) => setHouseholdId(e.target.value === "" ? "" : parseInt(e.target.value))} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="insert-form-input" 
                    required 
                />

                <button type="submit" className="insert-form-submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default InsertCitizen;
