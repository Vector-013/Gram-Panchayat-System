import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertEmployee: React.FC = () => {
    const [role, setRole] = useState<string>("");
    const [citizenId, setCitizenId] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestBody = {
            role,
            citizen_id: citizenId === "" ? null : citizenId,
        };

        try {
            const response = await fetch("http://localhost:8000/employee-create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert employee record");
            }

            setSuccess("Employee record successfully added!");
            setRole("");
            setCitizenId("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert New Employee</h3>

            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Role:</label>
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="insert-form-input" 
                    required
                >
                    <option value="">Select Role</option>
                    <option value="Member">Member</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Clerk">Clerk</option>
                    <option value="Engineer">Engineer</option>
                </select>

                <label className="insert-form-label">Citizen ID:</label>
                <input 
                    type="number" 
                    value={citizenId} 
                    onChange={(e) => setCitizenId(e.target.value === "" ? "" : parseInt(e.target.value))} 
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

export default InsertEmployee;
