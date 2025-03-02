import { useState } from "react";
import "../../styles/BirthQuery.css";
import { useNavigate } from "react-router-dom";

interface BirthRecord {
  citizen_id: number;
  name: string;
  date_of_birth: string;
  gender: string;
  household_id: string;
  birth_count: number;
}

function BirthQueryForm() {
  const [gender, setGender] = useState("both");
  const [householdId, setHouseholdId] = useState("");
  const [yearMin, setYearMin] = useState(1000);
  const [yearMax, setYearMax] = useState(2025);
  const [error, setError] = useState<string | null>(null);
  const [birthRecords, setBirthRecords] = useState<BirthRecord[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestBody:{ } = {
        gender,
        household_id: householdId,
        year_min: yearMin,
        year_max: yearMax,
      };

      const response = await fetch("http://localhost:8000/birth-query", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
         },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      const data: BirthRecord[] = await response.json();
      setBirthRecords(data);
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
        <label className="birth-query-label">Gender:</label>
        <select
          className="birth-query-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="both">Both</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label className="birth-query-label">Household ID:</label>
        <input
          className="birth-query-input"
          type="text"
          value={householdId}
          onChange={(e) => setHouseholdId(e.target.value)}
        />

        <label className="death-query-label">Year Range:</label>
        <div className="death-query-input-group">
          <input
            className="death-query-input"
            type="number"
            value={yearMin}
            onChange={(e) => setYearMin(parseInt(e.target.value))}
          />
          <span className="death-query-separator">to</span>
          <input
            className="death-query-input"
            type="number"
            value={yearMax}
            onChange={(e) => setYearMax(parseInt(e.target.value))}
          />
        </div>

        <button className="birth-query-submit" type="submit">
          Submit
        </button>
      </form>

      {birthRecords.length > 0 && (
        <div className="birth-records-summary">
          <p>Total Births: {birthRecords.length}</p>
        </div>
      )}

      {birthRecords.length > 0 && (
        <div className="birth-records-container">
          <table className="birth-records-table">
            <thead>
              <tr>
                <th>Citizen ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Household Income</th>
              </tr>
            </thead>
            <tbody>
              {birthRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.citizen_id}</td>
                  <td>{record.name}</td>
                  <td>{record.gender}</td>
                  <td>{record.date_of_birth}</td>
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
