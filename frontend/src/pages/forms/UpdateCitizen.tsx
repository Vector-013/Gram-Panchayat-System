import React, { useState } from "react";
import "../../styles/UpdateForm.css";

const UpdateCitizen: React.FC = () => {
  const [citizenId, setCitizenId] = useState("");
  const [formData, setFormData] = useState({
    qualification: "",
    income: "",
    householdId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIdSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/citizens/${citizenId}`);
      if (!response.ok) throw new Error("Citizen not found");

      const data = await response.json();
      setFormData({
        qualification: data.qualification || "",
        income: data.income || "",
        householdId: data.householdId || "",
        password: "",
      });
    } catch (err) {
      setError("Error fetching citizen data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/citizens/${citizenId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");
      alert("Citizen updated successfully!");
    } catch (err) {
      setError("Error updating citizen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <div className="id-input-section">
        <input
          type="text"
          placeholder="Enter Citizen ID"
          value={citizenId}
          onChange={(e) => setCitizenId(e.target.value)}
        />
        <button onClick={handleIdSubmit} disabled={loading}>
          {loading ? "Fetching..." : "Submit"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="update-form">

        <div className="update-wrapper">
          <label>Educational Qualification:</label>
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
        </div>

        <div className="update-wrapper">
          <label>Income:</label>
          <input type="number" name="income" value={formData.income} onChange={handleChange} required />
        </div>

        <div className="update-wrapper">
          <label>Household ID:</label>
          <input type="text" name="householdId" value={formData.householdId} onChange={handleChange} required />
        </div>

        <div className="update-wrapper">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default UpdateCitizen;
