import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertEnv: React.FC = () => {
    const [aqi, setAqi] = useState<number | "">("");
    const [temperature, setTemperature] = useState<number | "">("");
    const [humidity, setHumidity] = useState<number | "">("");
    const [rainfall, setRainfall] = useState<number | "">("");
    const [dateRecorded, setDateRecorded] = useState<string>("");
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
            aqi: aqi === "" ? null : aqi,
            temperature: temperature === "" ? null : temperature,
            humidity: humidity === "" ? null : humidity,
            rainfall: rainfall === "" ? null : rainfall,
            date_recorded: dateRecorded,
            password,
        };

        try {
            const response = await fetch("http://localhost:8000/api/environment/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Failed to insert environmental record");
            }

            setSuccess("Environmental record successfully added!");
            setAqi("");
            setTemperature("");
            setHumidity("");
            setRainfall("");
            setDateRecorded("");
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

                <label className="insert-form-label">AQI:</label>
                <input 
                    type="number" 
                    value={aqi} 
                    onChange={(e) => setAqi(e.target.value === "" ? "" : parseFloat(e.target.value))} 
                    className="insert-form-input" 
                    required 
                />
                
                <label className="insert-form-label">Temperature (°C):</label>
                <input 
                    type="number" 
                    value={temperature} 
                    onChange={(e) => setTemperature(e.target.value === "" ? "" : parseFloat(e.target.value))} 
                    className="insert-form-input" 
                    required 
                />
                
                <label className="insert-form-label">Humidity (%):</label>
                <input 
                    type="number" 
                    value={humidity} 
                    onChange={(e) => setHumidity(e.target.value === "" ? "" : parseFloat(e.target.value))} 
                    className="insert-form-input" 
                    required 
                />
                
                <label className="insert-form-label">Rainfall (mm):</label>
                <input 
                    type="number" 
                    value={rainfall} 
                    onChange={(e) => setRainfall(e.target.value === "" ? "" : parseFloat(e.target.value))} 
                    className="insert-form-input" 
                    required 
                />
                
                <label className="insert-form-label">Date Recorded:</label>
                <input 
                    type="date" 
                    value={dateRecorded} 
                    onChange={(e) => setDateRecorded(e.target.value)} 
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

export default InsertEnv;