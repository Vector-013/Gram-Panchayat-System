import React, { useState } from "react";
import "../../styles/UpdateForm.css";

const UpdateLandRecord: React.FC = () => {
  const [landId, setLandId] = useState("");
  const [formData, setFormData] = useState({
    area_acres: "",
    crop_type: "",
    weight: "",
    year_recorded: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIdSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/land-records/${landId}`);
      if (!response.ok) throw new Error("Land record not found");

      const data = await response.json();
      setFormData({
        area_acres: data.area_acres || "",
        crop_type: data.crop_type || "",
        weight: data.weight || "",
        year_recorded: data.year_recorded || "",
      });
    } catch (err) {
      setError("Error fetching land record data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/land-records/${landId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");
      alert("Land record updated successfully!");
    } catch (err) {
      setError("Error updating land record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <div className="id-input-section">
        <input
          type="text"
          placeholder="Enter Land ID"
          value={landId}
          onChange={(e) => setLandId(e.target.value)}
        />
        <button onClick={handleIdSubmit} disabled={loading}>
          {loading ? "Fetching..." : "Submit"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="update-form">
        <div className="update-wrapper">
          <label>Area (Acres):</label>
          <input type="number" name="area_acres" value={formData.area_acres} onChange={handleChange} required />
        </div>

        <div className="update-wrapper">
          <label>Crop Type:</label>
          <input type="text" name="crop_type" value={formData.crop_type} onChange={handleChange} required />
        </div>

        <div className="update-wrapper">
          <label>Weight (kg):</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>

        <div className="update-wrapper">
          <label>Year Recorded:</label>
          <input type="number" name="year_recorded" value={formData.year_recorded} onChange={handleChange} required />
        </div>

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default UpdateLandRecord;
