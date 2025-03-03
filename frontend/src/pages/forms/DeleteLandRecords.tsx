import React, { useState } from "react";
import "../../styles/InsertForm.css";

const DeleteLandRecords: React.FC = () => {
    const [landRecordId, setLandRecordId] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const requestBody = { id: landRecordId };

            const response = await fetch("http://localhost:8000/delete/land-record", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to delete land record");
            }

            setSuccess(data.message);
            setLandRecordId("");
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
                <label className="insert-form-label">Land Record ID:</label>
                <input
                    type="number"
                    value={landRecordId}
                    onChange={(e) => setLandRecordId(e.target.value === "" ? "" : parseInt(e.target.value))}
                    className="insert-form-input"
                    required
                />

                <button type="submit" className="insert-form-submit" disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </form>
        </div>
    );
};

export default DeleteLandRecords;
