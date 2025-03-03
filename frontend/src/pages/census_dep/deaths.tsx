import { useState } from "react";
import "../../styles/DeathQuery.css";
import { useNavigate } from "react-router-dom";

interface DeathRecord {
  citizen_id: number;
  name: string;
  gender: string;
  dob: string;
  death_date: string;
  cause: string;
  household_id: number;
  age_at_death: number;
}

interface DeathRecords {
  deaths: DeathRecord[];
}

function DeathQueryForm() {
  const [gender, setGender] = useState("both");
  const [householdId, setHouseholdId] = useState("");
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(100);
  const [yearMin, setYearMin] = useState(1000);
  const [yearMax, setYearMax] = useState(2025);
  const [error, setError] = useState<string | null>(null);
  const [deathRecords, setDeathRecords] = useState<DeathRecord[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestBody = {
        gender: gender === "both" ? "" : gender, // Fix "both" issue
        household_id: householdId.trim() ? parseInt(householdId) : null, // Convert to null if empty
        year_min: yearMin > 1000 ? yearMin : null, // Ensure null instead of 1000
        year_max: yearMax < 2025 ? yearMax : null, // Ensure null if default
        age_min: ageMin > 0 ? ageMin : null, // Ensure null for default 0
        age_max: ageMax < 100 ? ageMax : null, // Ensure null for default 100
      };

      const response = await fetch("http://localhost:8000/census/death-query", {
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

      const data: DeathRecords = await response.json();
      setDeathRecords(data.deaths);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="death-query-container col card-holder">
      <div className="header">
        <div className="death-query-title">Death Query</div>
      </div>
      {error && <div className="death-query-error">{error}</div>}

      <form className="death-query-form" onSubmit={handleSubmit}>
        <div className="death-group">
          <div className="death-subgroup">
            <label className="death-query-label">Gender:</label>
            <select
              className="death-query-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="both">Both</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="death-subgroup">
            <label className="death-query-label">Household ID:</label>
            <input
              className="death-query-input"
              type="text"
              value={householdId}
              onChange={(e) => setHouseholdId(e.target.value)}
            />
          </div>
        </div>

        <div className="death-group">
          <div className="death-subgroup">
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
          </div>

          <div className="death-subgroup">
            <label className="death-query-label">Age Range:</label>
            <div className="death-query-input-group">
              <input
                className="death-query-input"
                type="number"
                value={ageMin}
                onChange={(e) => setAgeMin(parseInt(e.target.value))}
              />
              <span className="death-query-separator">to</span>
              <input
                className="death-query-input"
                type="number"
                value={ageMax}
                onChange={(e) => setAgeMax(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <button className="death-query-submit" type="submit">
          Submit
        </button>
      </form>

      {deathRecords.length > 0 && (
        <div className="death-count">
          <p>Total Deaths: {deathRecords.length}</p>
        </div>
      )}
      {deathRecords.length > 0 && (
        <div className="death-records-container">
          <table className="death-records-table">
            <thead>
              <tr>
                <th>Citizen ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Date of Death</th>
                <th>Cause of Death</th>
                <th>Household ID</th>
                <th>Age at Death</th>
              </tr>
            </thead>
            <tbody>
              {deathRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.citizen_id}</td>
                  <td>{record.name}</td>
                  <td>{record.gender}</td>
                  <td>{record.dob}</td>
                  <td>{record.death_date}</td>
                  <td>{record.cause}</td>
                  <td>{record.household_id}</td>
                  <td>{record.age_at_death}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DeathQueryForm;
