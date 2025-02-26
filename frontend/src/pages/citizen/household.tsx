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
  const [search, setSearch] = useState<string>("");

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
    const filtered = citizens.filter(
      (citizen) =>
        citizen.name.toLowerCase().includes(search.toLowerCase()) ||
        citizen.educational_qualification.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCitizens(filtered);
  }, [search, citizens]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find Citizens by Household</h2>

      <input
        type="text"
        placeholder="Filter by name or education"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "100%", maxWidth: "300px" }}
      />

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

export default CitizensByHousehold;
