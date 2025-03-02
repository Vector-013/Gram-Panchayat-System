import React, { useState } from "react";
import "../../styles/UpdateForm.css";

const UpdateWelfareScheme: React.FC = () => {
  const [schemeId, setSchemeId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIdSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/schemes/${schemeId}`);
      if (!response.ok) throw new Error("Scheme not found");

      const data = await response.json();
      setFormData({
        name: data.name || "",
        description: data.description || "",
      });
    } catch (err) {
      setError("Error fetching scheme data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/schemes/${schemeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");
      alert("Scheme updated successfully!");
    } catch (err) {
      setError("Error updating scheme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Scheme</h2>

      <div className="id-input-section">
        <input
          type="text"
          placeholder="Enter Scheme ID"
          value={schemeId}
          onChange={(e) => setSchemeId(e.target.value)}
        />
        <button onClick={handleIdSubmit} disabled={loading}>
          {loading ? "Fetching..." : "Submit"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="update-form">
        <div className="update-wrapper">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="update-wrapper">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default UpdateWelfareScheme;
