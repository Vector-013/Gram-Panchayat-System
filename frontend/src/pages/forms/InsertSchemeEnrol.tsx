import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertScheme: React.FC = () => {
    const [schemeId, setSchemeId] = useState<number | "">("");
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
            scheme_id: schemeId === "" ? null : schemeId,
            citizen_id: citizenId === "" ? null : citizenId,
        };

        try {
            const response = await fetch("http://localhost:8000/api/scheme/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert scheme record");
            }

            setSuccess("Scheme record successfully added!");
            setSchemeId("");
            setCitizenId("");
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
                <label className="insert-form-label">Scheme ID:</label>
                <input 
                    type="number" 
                    value={schemeId} 
                    onChange={(e) => setSchemeId(e.target.value === "" ? "" : parseInt(e.target.value))} 
                    className="insert-form-input" 
                    required 
                />

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

export default InsertScheme;
