import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertBirth: React.FC = () => {
    const [childId, setChildId] = useState<number | "">("");
    const [motherId, setMotherId] = useState<number | "">("");
    const [fatherId, setFatherId] = useState<number | "">("");
    const [birthDate, setBirthDate] = useState<string>("");
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
            child_id: childId === "" ? null : childId,
            mother_id: motherId === "" ? null : motherId,
            father_id: fatherId === "" ? null : fatherId,
            birth_date: birthDate,
        };

        try {
            const response = await fetch("http://localhost:8000/api/birth/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert birth record");
            }

            setSuccess("Birth record successfully added!");
            setChildId("");
            setMotherId("");
            setFatherId("");
            setBirthDate("");
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
                <label className="insert-form-label">Child ID:</label>
                <input 
                    type="number" 
                    value={childId} 
                    onChange={(e) => setChildId(e.target.value === "" ? "" : parseInt(e.target.value))} 
                    className="insert-form-input" 
                    required 
                />

                <label className="insert-form-label">Mother ID:</label>
                <input 
                    type="number" 
                    value={motherId} 
                    onChange={(e) => setMotherId(e.target.value === "" ? "" : parseInt(e.target.value))} 
                    className="insert-form-input" 
                    required 
                />

                <label className="insert-form-label">Father ID:</label>
                <input 
                    type="number" 
                    value={fatherId} 
                    onChange={(e) => setFatherId(e.target.value === "" ? "" : parseInt(e.target.value))} 
                    className="insert-form-input" 
                    required 
                />

                <label className="insert-form-label">Birth Date:</label>
                <input 
                    type="date" 
                    value={birthDate} 
                    onChange={(e) => setBirthDate(e.target.value)} 
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

export default InsertBirth;