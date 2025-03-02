import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertWelfareScheme: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestBody = {
            name,
            description,
        };

        try {
            const response = await fetch("http://localhost:8000/welfare-schemes/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert welfare scheme");
            }

            setSuccess("Welfare scheme successfully added!");
            setName("");
            setDescription("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert New Welfare Scheme</h3>

            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Scheme Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="insert-form-textarea"
                    required
                />

                <button type="submit" className="insert-form-submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default InsertWelfareScheme;
