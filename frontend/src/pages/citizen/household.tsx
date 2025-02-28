import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CitizensTable from "./table";
import "../../styles/CitizenHousehold.css"; // Import CSS

interface Citizen {
  citizen_id: number;
  name: string;
  gender: string;
  dob: string;
  educational_qualification: string;
  income: number;
  household_id: number;
}

const CitizenHouseholdModal: React.FC = () => {
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
        const response = await fetch(`http://localhost:8000/${citizenId}/fam-data`);
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
    <div className="citizen-container col card-holder">
      <h2 className="citizen-title">Find Citizens by Household</h2>

      {/* Filters */}
      <div className="citizen-filter-container">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="citizen-input"
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="citizen-input"
        >
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
          className="citizen-input"
        />

        {/* DOB Range */}
        <div className="citizen-range">
          <label className="citizen-label">DOB Range:</label>
          <input
            type="date"
            value={dobRange.start}
            onChange={(e) => setDobRange((prev) => ({ ...prev, start: e.target.value }))}
            className="citizen-input"
          />
          <input
            type="date"
            value={dobRange.end}
            onChange={(e) => setDobRange((prev) => ({ ...prev, end: e.target.value }))}
            className="citizen-input"
          />
        </div>

        {/* Income Range */}
        <div className="citizen-range">
          <label className="citizen-label">Income Range:</label>
          <input
            type="number"
            placeholder="Min Income"
            value={incomeRange.min}
            onChange={(e) =>
              setIncomeRange((prev) => ({ ...prev, min: parseInt(e.target.value) || 0 }))
            }
            className="citizen-input"
          />
          to
          <input
            type="number"
            placeholder="Max Income"
            value={incomeRange.max}
            onChange={(e) =>
              setIncomeRange((prev) => ({ ...prev, max: parseInt(e.target.value) || 1000000 }))
            }
            className="citizen-input"
          />
        </div>
      </div>

      {/* Display Table */}
      {loading ? (
        <p className="citizen-loading">Loading...</p>
      ) : error ? (
        <p className="citizen-error">{error}</p>
      ) : (
        <CitizensTable citizens={filteredCitizens} />
      )}
    </div>
  );
};

export default CitizenHouseholdModal;
