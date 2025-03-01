import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/IncomeQuery.css";

interface IncomeRecord {
  citizen_id: number;
  name: string;
  gender: string;
  age: number;
  educational_qualification: string;
  income: number;
  household_income: number;
  land_area: number;
}

function IncomeQueryForm() {
  const [incomeMin, setIncomeMin] = useState(0);
  const [incomeMax, setIncomeMax] = useState(100000);
  const [householdIncomeMin, setHouseholdIncomeMin] = useState(0);
  const [householdIncomeMax, setHouseholdIncomeMax] = useState(200000);
  const [gender, setGender] = useState("");
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(100);
  const [education, setEducation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      incomeMin > incomeMax ||
      householdIncomeMin > householdIncomeMax ||
      ageMin > ageMax
    ) {
      setError("Invalid range values.");
      return;
    }
    try {
      const requestBody = {
        income_min: incomeMin,
        income_max: incomeMax,
        household_income_min: householdIncomeMin,
        household_income_max: householdIncomeMax,
        gender,
        age_min: ageMin,
        age_max: ageMax,
        educational_qualification: education,
      };

      const response = await fetch("http://localhost:8000/income-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      const data: IncomeRecord[] = await response.json();
      setIncomeRecords(data);
      navigate("/success");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="income-query-container col card-holder">
      <div className="header">
        <div className="income-query-title">Income Query</div>
        <button
          className="back-button"
          onClick={() => navigate("/it-dashboard")}
        >
          Back
        </button>
      </div>

      {error && <div className="income-query-error">{error}</div>}

      <form className="income-query-form" onSubmit={handleSubmit}>
        <div className="income-query-range">
          <label className="income-query-label">Individual Income Range:</label>
          <div className="income-query-input-group">
            <input
              className="income-query-input"
              type="number"
              value={incomeMin}
              onChange={(e) => setIncomeMin(parseFloat(e.target.value))}
            />
            <span className="income-query-separator">to</span>
            <input
              className="income-query-input"
              type="number"
              value={incomeMax}
              onChange={(e) => setIncomeMax(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div className="income-query-range">
          <label className="income-query-label">Household Income Range:</label>
          <div className="income-query-input-group">
            <input
              className="income-query-input"
              type="number"
              value={householdIncomeMin}
              onChange={(e) =>
                setHouseholdIncomeMin(parseFloat(e.target.value))
              }
            />
            <span className="income-query-separator">to</span>
            <input
              className="income-query-input"
              type="number"
              value={householdIncomeMax}
              onChange={(e) =>
                setHouseholdIncomeMax(parseFloat(e.target.value))
              }
            />
          </div>
        </div>

        <label className="income-query-label">Gender:</label>
        <select
          className="income-query-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <div className="income-query-range">
          <label className="income-query-label">Age Range:</label>
          <div className="income-query-input-group">
            <input
              className="income-query-input"
              type="number"
              value={ageMin}
              onChange={(e) => setAgeMin(parseInt(e.target.value))}
            />
            <span className="income-query-separator">to</span>
            <input
              className="income-query-input"
              type="number"
              value={ageMax}
              onChange={(e) => setAgeMax(parseInt(e.target.value))}
            />
          </div>
        </div>

        <label className="income-query-label">Educational Qualification:</label>
        <select
          className="income-query-input"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        >
          <option value="">Select Qualification</option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="Higher Secondary">Higher Secondary</option>
          <option value="Graduate">Graduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>
        <input className="tax-query-submit" type="submit" value="Submit" />
      </form>

      {incomeRecords.length > 0 && (
        <div className="income-records-container">
          <table className="income-records-table">
            <thead>
              <tr>
                <th>Citizen ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Education</th>
                <th>Income</th>
                <th>Household Income</th>
                <th>Land Area</th>
              </tr>
            </thead>
            <tbody>
              {incomeRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.citizen_id}</td>
                  <td>{record.name}</td>
                  <td>{record.age}</td>
                  <td>{record.gender}</td>
                  <td>{record.educational_qualification}</td>
                  <td>{record.income}</td>
                  <td>{record.household_income}</td>
                  <td>{record.land_area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default IncomeQueryForm;
