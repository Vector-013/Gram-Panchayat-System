import React, { useState } from "react";
import "../../styles/UpdateForm.css";

const UpdateHousehold: React.FC = () => {
  const [householdId, setHouseholdId] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIdSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/households/${householdId}`);
      if (!response.ok) throw new Error("Household not found");

      const data = await response.json();
      setAddress(data.address || "");
    } catch (err) {
      setError("Error fetching household data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/households/${householdId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) throw new Error("Update failed");
      alert("Household address updated successfully!");
    } catch (err) {
      setError("Error updating household address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <div className="id-input-section">
        <input
          type="text"
          placeholder="Enter Household ID"
          value={householdId}
          onChange={(e) => setHouseholdId(e.target.value)}
        />
        <button onClick={handleIdSubmit} disabled={loading}>
          {loading ? "Fetching..." : "Submit"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="update-form">
        <div className="update-wrapper">
          <label>Household Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default UpdateHousehold;
