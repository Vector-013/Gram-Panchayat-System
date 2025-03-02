import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertAsset: React.FC = () => {
    const [type, setType] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [installationDate, setInstallationDate] = useState<string>("");
    const [value, setValue] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestBody = {
            type,
            location,
            installation_date: installationDate,
            value: value === "" ? 0 : value,
        };

        try {
            const response = await fetch("http://localhost:8000/assets/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert asset record");
            }

            setSuccess("Asset record successfully added!");
            setType("");
            setLocation("");
            setInstallationDate("");
            setValue("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert New Asset</h3>

            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Asset Type:</label>
                <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    className="insert-form-input" 
                    required
                >
                    <option value="">Select Asset Type</option>
                    <option value="Street Light">Street Light</option>
                    <option value="School">School</option>
                    <option value="Road">Road</option>
                    <option value="Library">Library</option>
                    <option value="Public Toilet">Public Toilet</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Water Pump">Water Pump</option>
                    <option value="Well">Well</option>
                </select>

                <label className="insert-form-label">Location:</label>
                <select 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className="insert-form-input" 
                    required
                >
                    <option value="">Select Location</option>
                    <option value="Main Bazaar, Phulera">Main Bazaar, Phulera</option>
                    <option value="Gandhi Chowk, Phulera">Gandhi Chowk, Phulera</option>
                    <option value="Subhash Marg, Phulera">Subhash Marg, Phulera</option>
                    <option value="Rajput Mohalla, Phulera">Rajput Mohalla, Phulera</option>
                    <option value="Station Road, Phulera">Station Road, Phulera</option>
                </select>

                <label className="insert-form-label">Installation Date:</label>
                <input 
                    type="date" 
                    value={installationDate} 
                    onChange={(e) => setInstallationDate(e.target.value)} 
                    className="insert-form-input" 
                    required 
                />

                <label className="insert-form-label">Value (₹):</label>
                <input 
                    type="number" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value === "" ? "" : parseFloat(e.target.value))} 
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

export default InsertAsset;
