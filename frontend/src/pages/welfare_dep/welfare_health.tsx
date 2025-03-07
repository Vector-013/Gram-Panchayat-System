import React, { useState, useEffect } from "react";
import "../../styles/MedicalDataQuery.css";

interface MedicalRecord {
  address_id: string;
  age: number;
  citizen_id: number;
  health_status: string;
  household_id: number;
  medical_condition: string;
  name: string;
}

const MedicalDataQueryForm: React.FC = () => {
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [minIncome, setMinIncome] = useState(0);
  const [maxIncome, setMaxIncome] = useState(1000000);
  const [medicalCondition, setMedicalCondition] = useState("Healthy");
  const [healthStatus, setHealthStatus] = useState("Excellent");
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //additional filters on name, household id and address id
  const [nameFilter, setNameFilter] = useState("");
  const [householdIdFilter, setHouseholdIdFilter] = useState<string>("");
  const [addressIdFilter, setAddressIdFilter] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        min_age: minAge,
        max_age: maxAge,
        min_income: minIncome,
        max_income: maxIncome,
        medical_condition: medicalCondition,
        health_status: healthStatus,
      };

      console.log(requestBody);
      const response = await fetch(
        "http://localhost:8000/welfare/medical-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Health condition and medical status do not match");
        } else {
          throw new Error("Submission failed");
        }
      }

      const data = await response.json();
      const transformedData = data.map((record: any) => ({
        address_id: record.Address,
        age: record.Age,
        citizen_id: record["Citizen ID"],
        health_status: record["Health Status"],
        household_id: record["Household ID"],
        medical_condition: record["Medical Condition"],
        name: record.Name,
      }));
      setRecords(transformedData);
      setFilteredRecords(transformedData);
      console.log(transformedData);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    const filtered = records.filter((record) => {
      const matchesName =
        nameFilter === "" ||
        record.name.toLowerCase().includes(nameFilter.toLowerCase());

      const matchesHouseholdId =
        householdIdFilter === "" ||
        record.household_id === parseInt(householdIdFilter);

      const matchesAddressId =
        addressIdFilter === "" || record.address_id === addressIdFilter;

      return matchesName && matchesHouseholdId && matchesAddressId;
    });

    setFilteredRecords(filtered);
  }, [records, nameFilter, householdIdFilter, addressIdFilter]);

  console.log(filteredRecords.map((record) => record.name));

  return (
    <div
      id="medical-query-container"
      className="medical-query-container card-holder"
    >
      <h2 className="medical-query-title">Medical Data Query</h2>
      {error && <div className="medical-query-error">{error}</div>}

      <form className="medical-query-form" onSubmit={handleSubmit}>
        <div className="medical-query-group">
          <div className="medical-query-subgroup">
            <label className="medical-query-label">Age Range:</label>
            <div className="medical-query-range">
              <input
                type="number"
                value={minAge}
                onChange={(e) => setMinAge(parseInt(e.target.value))}
                className="medical-query-input"
              />
              <span className="medical-query-separator">to</span>
              <input
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(parseInt(e.target.value))}
                className="medical-query-input"
              />
            </div>
          </div>

          <div className="medical-query-subgroup">
            <label className="medical-query-label">Income Range:</label>
            <div className="medical-query-range">
              <input
                type="number"
                value={minIncome}
                onChange={(e) => setMinIncome(parseInt(e.target.value))}
                className="medical-query-input"
              />
              <span className="medical-query-separator">to</span>
              <input
                type="number"
                value={maxIncome}
                onChange={(e) => setMaxIncome(parseInt(e.target.value))}
                className="medical-query-input"
              />
            </div>
          </div>
        </div>

        <div className="medical-query-group">
          <div className="medical-query-subgroup">
            <label className="medical-query-label">Medical Condition:</label>
            <select
              className="medical-query-input"
              value={medicalCondition}
              onChange={(e) => setMedicalCondition(e.target.value)}
            >
              <option value="Healthy">Healthy</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Low Blood Pressure">Low Blood Pressure</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Arthritis">Arthritis</option>
              <option value="Asthma">Asthma</option>
              <option value="Allergies">Allergies</option>
              <option value="Kidney Disease">Kidney Disease</option>
              <option value="Liver Disease">Liver Disease</option>
            </select>
          </div>

          <div className="medical-query-subgroup">
            <label className="medical-query-label">Health Status:</label>
            <select
              className="medical-query-input"
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
            >
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
              <option value="Good">Good</option>
              <option value="Excellent">Excellent</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <button className="medical-query-submit" type="submit">
          Submit
        </button>
      </form>

      {/* filters Section */}

      <div className="medical-query-filter">
        <div className="medical-subfilter">
          <label className="medical-query-label">Name:</label>
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="medical-query-input"
          />
        </div>

        <div className="medical-subfilter">
          <label className="medical-query-label">Household ID:</label>
          <input
            type="text"
            value={householdIdFilter}
            onChange={(e) => setHouseholdIdFilter(e.target.value)}
            className="medical-query-input"
          />
        </div>

        <div className="medical-subfilter">
          <label className="medical-query-label">Address:</label>
          <input
            type="text"
            value={addressIdFilter}
            onChange={(e) => setAddressIdFilter(e.target.value)}
            className="medical-query-input"
          />
        </div>
      </div>

      {loading && <p className="medical-query-loading">Loading...</p>}

      {!loading && (
        <div className="medical-records-container">
          <table className="medical-records-table">
            <thead>
              <tr>
                <th>Citizen ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Household ID</th>
                <th>Address</th>
                <th>Medical Condition</th>
                <th>Health Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.citizen_id}</td>
                    <td>{record.name}</td>
                    <td>{record.age}</td>
                    <td>{record.household_id}</td>
                    <td>{record.address_id}</td>
                    <td>{record.medical_condition}</td>
                    <td>{record.health_status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-data">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MedicalDataQueryForm;
