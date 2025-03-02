import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertDeath: React.FC = () => {
    const [citizenId, setCitizenId] = useState<number | "">("");
    const [dateOfDeath, setDateOfDeath] = useState<string>("");
    const [cause, setCause] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestBody = {
            citizen_id: citizenId === "" ? null : citizenId,
            date_of_death: dateOfDeath,
            cause,
            password,
        };

        try {
            const response = await fetch("http://localhost:8000/api/death/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert death record");
            }

            setSuccess("Death record successfully added!");
            setCitizenId("");
            setDateOfDeath("");
            setCause("");
            setPassword("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
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

                <label className="insert-form-label">Date of Death:</label>
                <input 
                    type="date" 
                    value={dateOfDeath} 
                    onChange={(e) => setDateOfDeath(e.target.value)} 
                    className="insert-form-input" 
                    required 
                />

                <label className="insert-form-label">Cause of Death:</label>
                <input 
                    type="text" 
                    value={cause} 
                    onChange={(e) => setCause(e.target.value)} 
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

export default InsertDeath;
