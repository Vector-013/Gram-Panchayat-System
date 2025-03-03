import React, { useState } from "react";
import "../../styles/MGNREGAQuery.css";
import { useEffect } from "react";

interface MGNREGARecord {
  citizen_id: number;
  name: string;
  age: number;
  household_id: number;
  address: string;
  personal_income: number;
  household_income: number;
}

const MGNREGAQuery: React.FC = () => {
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(60);
  const [minHouseholdIncome, setMinHouseholdIncome] = useState(0);
  const [maxHouseholdIncome, setMaxHouseholdIncome] = useState(200000);
  const [personalIncome, setPersonalIncome] = useState(100000);
  const [enrolled, setEnrolled] = useState<MGNREGARecord[]>([]);
  const [notEnrolled, setNotEnrolled] = useState<MGNREGARecord[]>([]);
  const [filteredEnrolled, setFilteredEnrolled] = useState<MGNREGARecord[]>([]);
  const [filteredNotEnrolled, setFilteredNotEnrolled] = useState<
    MGNREGARecord[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //addditional filters on citizen id, name , household id and address
  const [citizenIdFilter, setCitizenIdFilter] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [householdIdFilter, setHouseholdIdFilter] = useState<string>("");
  const [addressFilter, setAddressFilter] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        min_age: minAge,
        max_age: maxAge,
        min_household_income: minHouseholdIncome,
        max_household_income: maxHouseholdIncome,
        personal_income: personalIncome,
      };

      const response = await fetch("http://localhost:8000/welfare/mgnrega/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(requestBody),
      });

      

      if (!response.ok) {
        throw new Error("Submission failed");
      }


      const data = await response.json();
      console.log(data);
      const transformedData1 = data["eligible_and_enrolled"].map((record: any) => ({
        citizen_id: record["Citizen ID"],  // Backend: "Citizen ID"
        name: record["Name"],  
        age: record["Age"],
        household_id: record["Household ID"],  
        address: record["Address"],
        personal_income: record["Personal Income"],  
        household_income: record["Household Income"],  
    }));

    const transformedData2 = data["eligible_but_not_enrolled"].map((record: any) => ({
      citizen_id: record["Citizen ID"],  // Backend: "Citizen ID"
      name: record["Name"],  
      age: record["Age"],
      household_id: record["Household ID"],  
      address: record["Address"],
      personal_income: record["Personal Income"],  
      household_income: record["Household Income"],  
  }));
      setEnrolled(transformedData1);
      setNotEnrolled(transformedData2);
      console.log(transformedData1);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    const filtered = enrolled.filter(
      (record) =>
        (citizenIdFilter === 0 || record.citizen_id === citizenIdFilter) &&
        (nameFilter === "" ||
          record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (householdIdFilter === "" ||
          record.household_id.toString().includes(householdIdFilter)) &&
        (addressFilter === "" ||
          record.address.toLowerCase().includes(addressFilter.toLowerCase()))
    );
    setFilteredEnrolled(filtered);
  }, [enrolled, citizenIdFilter, nameFilter, householdIdFilter, addressFilter]);

  useEffect(() => {
    const filtered = notEnrolled.filter(
      (record) =>
        (citizenIdFilter === 0 || record.citizen_id === citizenIdFilter) &&
        (nameFilter === "" ||
          record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (householdIdFilter === "" ||
          record.household_id.toString().includes(householdIdFilter)) &&
        (addressFilter === "" ||
          record.address.toLowerCase().includes(addressFilter.toLowerCase()))
    );
    setFilteredNotEnrolled(filtered);
  }, [
    notEnrolled,
    citizenIdFilter,
    nameFilter,
    householdIdFilter,
    addressFilter,
  ]);

  return (
    <div
      id="mgnrega-query-container"
      className="mgnrega-query-container card-holder"
    >
      <h2 className="mgnrega-query-title">MGNREGA Data Query</h2>
      {error && <div className="mgnrega-query-error">{error}</div>}

      <form className="mgnrega-query-form" onSubmit={handleSubmit}>
        <div className="mgnrega-group">
          <div className="mgnrega-subgroup">
            <label className="mgnrega-query-label">Age Range:</label>
            <div className="mgnrega-query-range">
              <input
                type="number"
                value={minAge}
                onChange={(e) => setMinAge(parseInt(e.target.value))}
                className="mgnrega-query-input"
              />
              <span className="mgnrega-query-separator">to</span>
              <input
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(parseInt(e.target.value))}
                className="mgnrega-query-input"
              />
            </div>
          </div>

          <div className="mgnrega-subgroup">
            <label className="mgnrega-query-label">Personal Income:</label>
            <input
              type="number"
              value={personalIncome}
              onChange={(e) => setPersonalIncome(parseInt(e.target.value))}
              className="mgnrega-query-input"
            />
          </div>

          <div className="mgnrega-subgroup">
            <label className="mgnrega-query-label">
              Household Income Range:
            </label>
            <div className="mgnrega-query-range">
              <input
                type="number"
                value={minHouseholdIncome}
                onChange={(e) =>
                  setMinHouseholdIncome(parseInt(e.target.value))
                }
                className="mgnrega-query-input"
              />
              <span className="mgnrega-query-separator">to</span>
              <input
                type="number"
                value={maxHouseholdIncome}
                onChange={(e) =>
                  setMaxHouseholdIncome(parseInt(e.target.value))
                }
                className="mgnrega-query-input"
              />
            </div>
          </div>
        </div>

        <button className="mgnrega-query-submit" type="submit">
          Submit
        </button>
        <br />
      </form>

      {/* filters */}

      <div className="mgnrega-query-filters">
        <div className="mgnrega-subfilter">
          <label className="mgnrega-query-label">Citizen ID:</label>
          <input
            type="number"
            value={citizenIdFilter}
            onChange={(e) => setCitizenIdFilter(parseInt(e.target.value))}
            className="mgnrega-query-input"
          />
        </div>

        <div className="mgnrega-subfilter">
          <label className="mgnrega-query-label">Name:</label>
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="mgnrega-query-input"
          />
        </div>

        <div className="mgnrega-subfilter">
          <label className="mgnrega-query-label">Household ID:</label>
          <input
            type="text"
            value={householdIdFilter}
            onChange={(e) => setHouseholdIdFilter(e.target.value)}
            className="mgnrega-query-input"
          />
        </div>

        <div className="mgnrega-subfilter">
          <label className="mgnrega-query-label">Address:</label>
          <input
            type="text"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            className="mgnrega-query-input"
          />
        </div>
      </div>

      {loading && <p className="mgnrega-query-loading">Loading...</p>}

      {!loading && (
        <>
          <h4 className="mgnrega-subtitle">Enrolled in MGNREGA</h4>
          <div className="mgnrega-records-container">
            <table className="mgnrega-records-table">
              <thead>
                <tr>
                  <th>Citizen ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Household ID</th>
                  <th>Address</th>
                  <th>Personal Income</th>
                  <th>Household Income</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrolled.length > 0 ? (
                  filteredEnrolled.map((record) => (
                    <tr key={record.citizen_id}>
                      <td>{record.citizen_id}</td>
                      <td>{record.name}</td>
                      <td>{record.age}</td>
                      <td>{record.household_id}</td>
                      <td>{record.address}</td>
                      <td>{record.personal_income}</td>
                      <td>{record.household_id}</td>
                      <td>{record.address}</td>
                      <td>{record.personal_income}</td>
                      <td>{record.household_income}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="no-data">
                      No enrolled records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <h4 className="mgnrega-subtitle">Eligible but Not Enrolled</h4>
          <div className="mgnrega-records-container">
            <table className="mgnrega-records-table">
              <thead>
                <tr>
                  <th>Citizen ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Household ID</th>
                  <th>Address</th>
                  <th>Personal Income</th>
                  <th>Household Income</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotEnrolled.length > 0 ? (
                  filteredNotEnrolled.map((record) => (
                    <tr key={record.citizen_id}>
                      <td>{record.citizen_id}</td>
                      <td>{record.name}</td>
                      <td>{record.age}</td>
                      <td>{record.household_id}</td>
                      <td>{record.address}</td>
                      <td>{record.personal_income}</td>
                      <td>{record.household_income}</td>
          
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="no-data">
                      No not enrolled records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MGNREGAQuery;
