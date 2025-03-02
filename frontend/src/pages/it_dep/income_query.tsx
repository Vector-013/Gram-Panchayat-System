import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/IncomeQuery.css";

interface IncomeRecord {
  citizen_id: number;
  name: string;
  gender: string;
  age: number;
  educational_qualification: string;
  income: number;
  household_id: number;
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
  const [filteredRecords, setFilteredRecords] = useState<IncomeRecord[]>([]);

  // Additional filters
  const [nameFilter, setNameFilter] = useState("");
  const [householdIdFilter, setHouseholdIdFilter] = useState<string>("");

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

      const response = await fetch(
        "http://localhost:8000/it-dept/income-query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      const res = await response.json();
      const data: IncomeRecord[] = res.citizens;
      setIncomeRecords(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Apply filters dynamically using useEffect
  useEffect(() => {
    const filtered = incomeRecords.filter((record) => {
      const matchesName =
        nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase());

      const matchesGender = gender === "" || record.gender === gender;

      const matchesAgeRange = record.age >= ageMin && record.age <= ageMax;

      const matchesEducation =
        education === "" ||
        record.educational_qualification.toLowerCase().includes(education.toLowerCase());

      const matchesIncomeRange = record.income >= incomeMin && record.income <= incomeMax;

      const matchesHouseholdId =
        householdIdFilter === "" || record.household_id.toString() === householdIdFilter;

      return (
        matchesName &&
        matchesGender &&
        matchesAgeRange &&
        matchesEducation &&
        matchesIncomeRange &&
        matchesHouseholdId
      );
    });

    setFilteredRecords(filtered);
  }, [nameFilter, gender, ageMin, ageMax, education, incomeMin, incomeMax, householdIdFilter, incomeRecords]);

  return (
    <div className="income-query-container col card-holder">
      <div className="income-query-title">Income Query</div>

      {error && <div className="income-query-error">{error}</div>}

      <form className="income-query-form" onSubmit={handleSubmit}>
        <div className="gender-query">
          <div className="gender-subquery">
            <label className="income-query-label">Individual Income:</label>
            <div className="income-query-input-group">
              <input className="income-query-input" type="number" value={incomeMin} onChange={(e) => setIncomeMin(parseFloat(e.target.value))} />
              <span className="income-query-separator">to</span>
              <input className="income-query-input" type="number" value={incomeMax} onChange={(e) => setIncomeMax(parseFloat(e.target.value))} />
            </div>
          </div>

          <div className="gender-subquery">
            <label className="income-query-label">Household Income:</label>
            <div className="income-query-input-group">
              <input className="income-query-input" type="number" value={householdIncomeMin} onChange={(e) => setHouseholdIncomeMin(parseFloat(e.target.value))} />
              <span className="income-query-separator">to</span>
              <input className="income-query-input" type="number" value={householdIncomeMax} onChange={(e) => setHouseholdIncomeMax(parseFloat(e.target.value))} />
            </div>
          </div>

          <input className="income-query-submit" type="submit" value="Submit" />
        </div>
      </form>

      {/* Filters Section */}
      <div className="income-filter-container">
        <input type="text" placeholder="Filter by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className="income-filter-input" />

        <select className="income-filter-input" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        Age :
        <input type="number" placeholder="Min Age" value={ageMin} onChange={(e) => setAgeMin(parseInt(e.target.value))} className="income-filter-input" />
        <input type="number" placeholder="Max Age" value={ageMax} onChange={(e) => setAgeMax(parseInt(e.target.value))} className="income-filter-input" />

        <select className="income-filter-input" value={education} onChange={(e) => setEducation(e.target.value)}>
          <option value="">All Qualifications</option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="Higher Secondary">Higher Secondary</option>
          <option value="Graduate">Graduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>

        Household ID:
        <input type="number" placeholder="Household ID" value={householdIdFilter} onChange={(e) => setHouseholdIdFilter(e.target.value)} className="income-filter-input" />
      </div>

      {filteredRecords.length > 0 && (
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
                <th>Household ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.citizen_id}</td>
                  <td>{record.name}</td>
                  <td>{record.age}</td>
                  <td>{record.gender}</td>
                  <td>{record.educational_qualification}</td>
                  <td>{record.income}</td>
                  <td>{record.household_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncomeQueryForm;
