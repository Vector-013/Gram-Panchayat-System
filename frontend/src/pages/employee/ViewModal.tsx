import React, { useState } from "react";
import "../../styles/ViewModal.css";
import bgImage from "../../images/village.jpg";

interface Citizen {
  citizen_id: number;
  name: string;
  gender: string;
  dob: string;
  educational_qualification: string;
  income: number;
  household_id: number;
  email: string;
}

interface CitizensResponse {
  citizens: Citizen[];
}

const ViewModal: React.FC = () => {
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const role = localStorage.getItem("role");

  const handleViewCitizens = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8000/employees/all-citizens",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch citizens.");
      }

      const data: CitizensResponse = await response.json();
      setCitizens(data.citizens);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="insert-modal-container card-holder">
      <h2 className="insert-modal-title">View Records</h2>

      {role === "pradhan" || role === "admin" || role === 'employee' ? (
        <button
          onClick={handleViewCitizens}
          className="insert-form-submit"
          disabled={loading}
        >
          View All Citizens
        </button>
      ) : (
        <p className="insert-placeholder">
          You do not have permission to view this data.
        </p>
      )}

      {error && <div className="insert-form-error">{error}</div>}

      <div className="table-container">
        <table className="citizen-table">
          <thead>
            <tr>
              <th>Citizen ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Education</th>
              <th>Income</th>
              <th>Household ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="loading-placeholder">
                  Loading...
                </td>
              </tr>
            ) : citizens.length > 0 ? (
              citizens.map((citizen) => (
                <tr key={citizen.citizen_id}>
                  <td>{citizen.citizen_id}</td>
                  <td>{citizen.name}</td>
                  <td>{citizen.gender}</td>
                  <td>{citizen.dob}</td>
                  <td>{citizen.educational_qualification}</td>
                  <td>{citizen.income}</td>
                  <td>{citizen.household_id}</td>
                  <td>{citizen.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-records-placeholder">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewModal;
