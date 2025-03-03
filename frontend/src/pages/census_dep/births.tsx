import { useState } from "react";
import "../../styles/BirthQuery.css";
import { useNavigate } from "react-router-dom";

interface BirthRecord {
  citizen_id: number;
  name: string;
  dob: string;
  gender: string;
  household_id: string;
}

function BirthQueryForm() {
  const [gender, setGender] = useState("Both");
  const [householdId, setHouseholdId] = useState<number | null>(null);
  const [yearMin, setYearMin] = useState<number>(2020);
  const [yearMax, setYearMax] = useState<number>(2025);
  const [error, setError] = useState<string | null>(null);
  const [birthRecords, setBirthRecords] = useState<BirthRecord[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestBody = {
        gender,
        household_id: householdId,
        min_year: yearMin,
        max_year: yearMax,
      };

      const response = await fetch("http://localhost:8000/census/birth-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      const data = await response.json();
      setBirthRecords(data.births);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="birth-query-container col card-holder">
      <div className="header">
        <div className="birth-query-title">Birth Query</div>
      </div>
      {error && <div className="birth-query-error">{error}</div>}

      <form className="birth-query-form" onSubmit={handleSubmit}>
        {/* Gender Dropdown */}
        <label className="birth-query-label">Gender:</label>
        <select
          className="birth-query-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Both">Both</option>
        </select>

        {/* Household ID */}
        <label className="birth-query-label">Household ID:</label>
        <input
          className="birth-query-input"
          type="number"
          value={householdId === null ? "" : householdId}
          onChange={(e) =>
            setHouseholdId(e.target.value === "" ? null : parseInt(e.target.value))
          }
        />

        {/* Year Range */}
        <div className="query-group">
          <div className="birth-query-input-group">
            <label className="birth-query-label">Year Range:</label>
            <input
              className="birth-query-input"
              type="number"
              value={yearMin}
              onChange={(e) => setYearMin(parseInt(e.target.value))}
            />
            <span className="birth-query-separator">to</span>
            <input
              className="birth-query-input"
              type="number"
              value={yearMax}
              onChange={(e) => setYearMax(parseInt(e.target.value))}
            />
          </div>
        </div>

        <button className="birth-query-submit" type="submit">
          Submit
        </button>
      </form>


      {/* Birth Records Table */}
      {birthRecords.length > 0 && (
        <div className="birth-records-container">
          <table className="birth-records-table">
            <thead>
              <tr>
                <th>Citizen ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Household ID</th>
              </tr>
            </thead>
            <tbody>
              {birthRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.citizen_id}</td>
                  <td>{record.name}</td>
                  <td>{record.gender}</td>
                  <td>{record.dob}</td>
                  <td>{record.household_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BirthQueryForm;
