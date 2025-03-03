import React, { useState } from "react";
import "../../styles/UpdateForm.css";

const UpdateEmp: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [formData, setFormData] = useState({
    role: "",
    income: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleIdSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/employees/${employeeId}`);
      if (!response.ok) throw new Error("Employee not found");

      const data = await response.json();
      setFormData({
        role: data.role || "",
        income: data.income || "",
      });
    } catch (err) {
      setError("Error fetching employee data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");
      alert("Employee details updated successfully!");
    } catch (err) {
      setError("Error updating employee details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Employee Details</h2>

      <div className="id-input-section">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button onClick={handleIdSubmit} disabled={loading}>
          {loading ? "Fetching..." : "Submit"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="update-form">
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Member">Member</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
          <option value="Accountant">Accountant</option>
          <option value="Clerk">Clerk</option>
          <option value="Engineer">Engineer</option>
        </select>

        <label>Income:</label>
        <input type="number" name="income" value={formData.income} onChange={handleChange} required />

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default UpdateEmp;
