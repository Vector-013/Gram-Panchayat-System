import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertHealth: React.FC = () => {
    const [citizenId, setCitizenId] = useState<number | "">("");
    const [healthStatus, setHealthStatus] = useState<string>("");
    const [medicalCondition, setMedicalCondition] = useState<string>("");
    const [dateRecorded, setDateRecorded] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const getToken = () => {
        return localStorage.getItem("token"); // Retrieve token securely
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestBody = {
            citizen_id: citizenId === "" ? null : citizenId,
            health_status: healthStatus,
            medical_condition: medicalCondition,
            date_recorded: dateRecorded,
        };

        try {
            const response = await fetch("http://localhost:8000/health-records/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to insert health record");
            }

            setSuccess("Health record successfully added!");
            setCitizenId("");
            setHealthStatus("");
            setMedicalCondition("");
            setDateRecorded("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert Health Record</h3>

            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Citizen ID:</label>
                <input
                    type="number"
                    value={citizenId}
                    onChange={(e) => setCitizenId(e.target.value === "" ? "" : parseInt(e.target.value))}
                    className="insert-form-input"
                    required
                />

                <label className="insert-form-label">Health Status:</label>
                <select
                    value={healthStatus}
                    onChange={(e) => setHealthStatus(e.target.value)}
                    className="insert-form-input"
                    required
                >
                    <option value="">Select Health Status</option>
                    <option value="Critical">Critical</option>
                    <option value="Poor">Poor</option>
                    <option value="Fair">Fair</option>
                    <option value="Good">Good</option>
                    <option value="Excellent">Excellent</option>
                </select>

                <label className="insert-form-label">Medical Condition:</label>
                <textarea
                    value={medicalCondition}
                    onChange={(e) => setMedicalCondition(e.target.value)}
                    className="insert-form-textarea"
                    required
                />

                <label className="insert-form-label">Date Recorded:</label>
                <input
                    type="date"
                    value={dateRecorded}
                    onChange={(e) => setDateRecorded(e.target.value)}
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

export default InsertHealth;
