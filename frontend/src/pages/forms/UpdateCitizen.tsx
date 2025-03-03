import React, { useState } from "react";
import "../../styles/UpdateForm.css";

const UpdateCitizen: React.FC = () => {
  const [citizenId, setCitizenId] = useState("");
  const [formData, setFormData] = useState({
    citizen_id: "",
    educational_qualification: "",
    income: "",
    household_id: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIdSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:8000/update-citizen/get/${citizenId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (!response.ok) throw new Error("Citizen not found");

      const data = await response.json();
      setFormData({
        citizen_id: data.citizen_id || "",
        educational_qualification: data.educational_qualification || "",
        income: data.income || "",
        household_id: data.household_id || "",
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
      const response = await fetch(`http://localhost:8000/update-citizen/post`, {
        method: "POST",
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
          <select name="educational_qualification" value={formData.educational_qualification} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Higher Secondary">Higher Secondary</option>
            <option value="Graduate">Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
            <option value="Illiterate">Illiterate</option>
          </select>
        </div>

        <div className="update-wrapper">
          <label>Income:</label>
          <input type="number" name="income" value={formData.income} onChange={handleChange} />
        </div>

        <div className="update-wrapper">
          <label>Household ID:</label>
          <input type="text" name="householdId" value={formData.household_id} onChange={handleChange} />
        </div>

        <div className="update-wrapper">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
        </div>

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default UpdateCitizen;
