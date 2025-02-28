import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";

interface CitizenElement {
  citizen_id: number;
  name: string;
  gender: string;
  dob: string;
  educational_qualification: string;
  email: string;
  income: number;
  household_id: number;
}

const CitizenDashboard: React.FC = () => {
  const [citizen, setCitizen] = useState<CitizenElement[]>([]);
  const [loading, setLoading] = useState(true); // To handle initial loading state
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCitizen = async () => {
      try {
        const response = await fetch("http://localhost:5000/citizen");
        const data: CitizenElement[] = await response.json();
        console.log(data);
        setCitizen(data);
      } catch (err) {
        console.error("Error fetching citizen data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCitizen();
  }, []);

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light d-flex justify-content-between px-4">
        <span className="navbar-brand">
          {loading ? "Loading..." : citizen.length > 0 ? citizen[0].name : "No Citizen Data"}
        </span>
        <button className="btn btn-danger" onClick={() => navigate("/logout")}>Logout</button>
      </nav>

      {/* Dashboard Content */}
      <div className="row mt-4">
        {/* Left Panel: Citizen Dashboards List */}
        <div className="col-md-4">
          <h4>Profile</h4>
          <ul className="list-group">
            <li className="list-group-item">Name : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].name : "No Citizen Data"}</li>
            <li className="list-group-item">Gender : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].gender : "No Citizen Data"}</li>
            <li className="list-group-item">DOB : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].dob : "No Citizen Data"}</li>
            <li className="list-group-item">Educational Qualification : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].educational_qualification : "No Citizen Data"}</li>
            <li className="list-group-item">Email : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].email : "No Citizen Data"}</li>
            <li className="list-group-item">Household ID : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].household_id : "No Citizen Data"}</li>
          </ul>
        </div>

        {/* Right Panel: Record Cards */}
        <div className="col-md-8">
          <h4>Records</h4>
          <div className="row">
            <div className="col-md-6">
              <RecordCard title="Landlord Record" onRedirect={() => alert("Redirecting to Landlord Record")} />
            </div>
            <div className="col-md-6">
              <RecordCard title="Medical Record" onRedirect={() => alert("Redirecting to Medical Record")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
