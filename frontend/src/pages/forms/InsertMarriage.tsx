import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertMarriage: React.FC = () => {
    const [husbandId, setHusbandId] = useState<number | "">("");
    const [wifeId, setWifeId] = useState<number | "">("");
    const [marriageDate, setMarriageDate] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestBody = {
            husband_id: husbandId === "" ? null : husbandId,
            wife_id: wifeId === "" ? null : wifeId,
            marriage_date: marriageDate,
        };

        try {
            const response = await fetch("http://localhost:8000/marriages/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert marriage record");
            }

            setSuccess("Marriage record successfully added!");
            setHusbandId("");
            setWifeId("");
            setMarriageDate("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert Marriage Record</h3>

            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Husband ID:</label>
                <input 
                    type="number" 
                    value={husbandId} 
                    onChange={(e) => setHusbandId(e.target.value === "" ? "" : parseInt(e.target.value))} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Wife ID:</label>
                <input 
                    type="number" 
                    value={wifeId} 
                    onChange={(e) => setWifeId(e.target.value === "" ? "" : parseInt(e.target.value))} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Marriage Date:</label>
                <input 
                    type="date" 
                    value={marriageDate} 
                    onChange={(e) => setMarriageDate(e.target.value)} 
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

export default InsertMarriage;
