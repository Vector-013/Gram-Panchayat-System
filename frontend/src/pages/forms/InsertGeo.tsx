import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertGeo: React.FC = () => {
  const [featureType, setFeatureType] = useState("Mountain");
  const [name, setName] = useState("");
  const [area, setArea] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const requestBody = {
      feature_type: featureType,
      name,
      area: area === "" ? null : area,
    };

    try {
      console.log(requestBody);
      const response = await fetch("http://localhost:8000/geo-features", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to insert geographic feature record");
      }

      setSuccess("Geographic feature successfully added!");

      setFeatureType("Mountain");
      setName("");
      setArea("");
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
        <label className="insert-form-label">Feature Type:</label>
        <select
          className="insert-form-input"
          value={featureType}
          onChange={(e) => setFeatureType(e.target.value)}
        >
          <option value="Mountain">Mountain</option>
          <option value="River">River</option>
          <option value="Lake">Lake</option>
          <option value="Forest">Forest</option>
          <option value="Desert">Desert</option>
        </select>

        <label className="insert-form-label">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="insert-form-input"
          required
        />

        <label className="insert-form-label">Area (sq km):</label>
        <input
          type="number"
          value={area}
          onChange={(e) =>
            setArea(e.target.value === "" ? "" : parseFloat(e.target.value))
          }
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

export default InsertGeo;
