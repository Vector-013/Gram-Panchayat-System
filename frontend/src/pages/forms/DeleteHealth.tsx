import React, { useState } from "react";
import "../../styles/InsertForm.css";

const DeleteBirth: React.FC = () => {
    const [childId, setChildId] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`http://localhost:8000/birth-event/${childId}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete birth record");
            }

            setSuccess("Health record successfully deleted!");
            setChildId("");
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
                <label className="insert-form-label">Health ID:</label>
                <input
                    type="number"
                    value={childId}
                    onChange={(e) => setChildId(e.target.value === "" ? "" : parseInt(e.target.value))}
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

export default DeleteBirth;
