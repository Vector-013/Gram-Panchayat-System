import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertHousehold: React.FC = () => {
    const [address, setAddress] = useState<string>("");
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

        const requestBody = { address };

        try {
            const response = await fetch("http://localhost:8000/households/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert household record");
            }

            setSuccess("Household record successfully added!");
            setAddress("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert New Household</h3>

            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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

export default InsertHousehold;
