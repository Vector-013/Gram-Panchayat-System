import React, { useEffect, useState } from "react";
import axios from "axios";

interface Citizen {
  citizen_id: number;
  name: string;
  gender: string;
  dob: string;
  household_id: number;
  educational_qualification: string;
}

const GetCitizens: React.FC = () => {
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("/api/citizens/")
      .then((response) => {
        // Backend returns a list of citizens directly.
        setCitizens(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching citizens");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Citizens List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {citizens.map((citizen) => (
            <li key={citizen.citizen_id}>
              {citizen.name} - {citizen.gender} - {citizen.dob} -{" "}
              {citizen.household_id} - {citizen.educational_qualification}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetCitizens;
