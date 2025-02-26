import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CitizensTable from "./table";

interface Citizen {
  citizen_id: number;
  name: string;
  gender: string;
  dob: string;
  educational_qualification: string;
  income: number;
  household_id: number;
}

const CitizensByHousehold: React.FC = () => {
  const { citizenId } = useParams<{ citizenId: string }>();
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [filteredCitizens, setFilteredCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [educationFilter, setEducationFilter] = useState<string>("");
  const [dobRange, setDobRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [incomeRange, setIncomeRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });

  useEffect(() => {
    if (!citizenId) return;

    const fetchCitizens = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5000/citizens");
        const data: Citizen[] = await response.json();

        const citizen = data.find((c) => c.citizen_id === parseInt(citizenId));

        if (!citizen) {
          setError("Citizen not found");
          setCitizens([]);
        } else {
          const householdCitizens = data.filter(
            (c) => c.household_id === citizen.household_id
          );
          setCitizens(householdCitizens);
        }
      } catch (err) {
        console.error(err);
        setError("Error loading citizens data");
      }

      setLoading(false);
    };

    fetchCitizens();
  }, [citizenId]);

  useEffect(() => {
    const filtered = citizens.filter((citizen) => {
      const matchesName = citizen.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesGender = genderFilter ? citizen.gender === genderFilter : true;
      const matchesEducation = citizen.educational_qualification
        .toLowerCase()
        .includes(educationFilter.toLowerCase());

      const matchesDob =
        (!dobRange.start || new Date(citizen.dob) >= new Date(dobRange.start)) &&
        (!dobRange.end || new Date(citizen.dob) <= new Date(dobRange.end));

      const matchesIncome =
        citizen.income >= incomeRange.min && citizen.income <= incomeRange.max;

      return matchesName && matchesGender && matchesEducation && matchesDob && matchesIncome;
    });

    setFilteredCitizens(filtered);
  }, [nameFilter, genderFilter, educationFilter, dobRange, incomeRange, citizens]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find Citizens by Household</h2>

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={inputStyle}
        />
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} style={inputStyle}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Education"
          value={educationFilter}
          onChange={(e) => setEducationFilter(e.target.value)}
          style={inputStyle}
        />

        {/* DOB Range */}
        <div>
          <label style={labelStyle}>DOB Range:</label>
          <input
            type="date"
            value={dobRange.start}
            onChange={(e) => setDobRange((prev) => ({ ...prev, start: e.target.value }))}
            style={inputStyle}
          />
          <input
            type="date"
            value={dobRange.end}
            onChange={(e) => setDobRange((prev) => ({ ...prev, end: e.target.value }))}
            style={inputStyle}
          />
        </div>

        {/* Income Range */}
        <div>
          <label style={labelStyle}>Income Range:</label>
          <input
            type="number"
            placeholder="Min Income"
            value={incomeRange.min}
            onChange={(e) =>
              setIncomeRange((prev) => ({ ...prev, min: parseInt(e.target.value) || 0 }))
            }
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Max Income"
            value={incomeRange.max}
            onChange={(e) =>
              setIncomeRange((prev) => ({ ...prev, max: parseInt(e.target.value) || 1000000 }))
            }
            style={inputStyle}
          />
        </div>
      </div>

      {/* Display Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <CitizensTable citizens={filteredCitizens} />
      )}
    </div>
  );
};

// Styles
const inputStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "180px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "bold",
  marginRight: "5px",
};

export default CitizensByHousehold;
