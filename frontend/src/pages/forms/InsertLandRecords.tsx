import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertLandRecord: React.FC = () => {
    const [areaAcres, setAreaAcres] = useState<number | "">("");
    const [cropType, setCropType] = useState<string>("");
    const [citizenId, setCitizenId] = useState<number | "">("");
    const [weight, setWeight] = useState<number | "">("");
    const [yearRecorded, setYearRecorded] = useState<number | "">("");
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

        const requestBody = {
            area_acres: areaAcres === "" ? 0 : areaAcres,
            weight: weight === "" ? 0 : weight,
            crop_type: cropType,
            year_recorded: yearRecorded === "" ? new Date().getFullYear() : yearRecorded,
            citizen_id: citizenId === "" ? null : citizenId,
        };

        try {
            const response = await fetch("http://localhost:8000/land-records/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert land record");
            }

            setSuccess("Land record successfully added!");
            setAreaAcres("");
            setCropType("");
            setCitizenId("");
            setWeight("");
            setYearRecorded("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert New Land Record</h3>

            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Area (Acres):</label>
                <input 
                    type="number" 
                    value={areaAcres} 
                    onChange={(e) => setAreaAcres(e.target.value === "" ? "" : parseFloat(e.target.value))} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Crop Type:</label>
                <input 
                    type="text" 
                    value={cropType} 
                    onChange={(e) => setCropType(e.target.value)} 
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

                <label className="insert-form-label">Weight (kg):</label>
                <input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value === "" ? "" : parseFloat(e.target.value))} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Year Recorded:</label>
                <input 
                    type="number" 
                    value={yearRecorded} 
                    onChange={(e) => setYearRecorded(e.target.value === "" ? "" : parseInt(e.target.value))} 
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

export default InsertLandRecord;
