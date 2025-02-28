import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import "../../styles/Dashboard.css";
import manImage from "../../images/man.png";
import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";
import { useParams } from "react-router-dom";

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
  const { citizenId } = useParams<{ citizenId: string }>();
  const [citizen, setCitizen] = useState<CitizenElement[]>([]);
  const [loading, setLoading] = useState(true); // To handle initial loading state
  const navigate = useNavigate();
  useEffect(() => {
    const storedCitizen = localStorage.getItem("citizenData");
    if (storedCitizen) {
      setCitizen(JSON.parse(storedCitizen));
    }
    setLoading(false);
  }, []);

  return (
    <div className="container-fluid dashboard-container">
      {/* Navbar */}
      <nav className="navbar d-flex justify-content-between">
        <span>
          {loading ? "Loading..." : citizen.length > 0 ? citizen[0].name : "No Citizen Data"}
        </span>
        <button className="btn btn-danger" onClick={() => navigate("/logout")}>Logout</button>
      </nav>

      {/* Dashboard Content */}
      <div className="row main-container">
        {/* Left Panel: Citizen Dashboards List */}
        <div className="panel col">
          {/* Profile Image */}
          <div className="profileImage">
            <img
              src={
                loading ? "placeholder.jpg" :
                  citizen.length > 0 ?
                    (citizen[0].gender === "Male" ? manImage :
                      citizen[0].gender === "Female" ? womanImage :
                        "default-avatar.png")
                    : "default-avatar.png"
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover", border: "3px solid #ddd" }}
            />
          </div>

          <ul className="list-group">
            <li className="list-group-item">Gender : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].gender : "No Citizen Data"}</li>
            <li className="list-group-item">DOB : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].dob : "No Citizen Data"}</li>
            <li className="list-group-item">Educational Qualification : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].educational_qualification : "No Citizen Data"}</li>
            <li className="list-group-item">Email : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].email : "No Citizen Data"}</li>
            <li className="list-group-item">Household ID : {loading ? "Loading..." : citizen.length > 0 ? citizen[0].household_id : "No Citizen Data"}</li>
          </ul>
        </div>

        {/* Right Panel: Record Cards */}
        <Outlet />
      </div>
    </div>
  );
};

export default CitizenDashboard;
