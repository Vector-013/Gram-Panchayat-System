import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import "../../styles/Dashboard.css";
import manImage from "../../images/man.png";
import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";
import CitizenPanchayatForm from "./land_query";

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

const CensusDashboard: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token || (role !== 'census_dept' && role !== 'admin')) {
        navigate('/login');
      }
    }, [navigate]);

  return (
    <div className="container-fluid dashboard-container">
      {/* Navbar */}
      <nav className="navbar d-flex justify-content-between">
      <div className="goto">
          <span>
            Census Department
          </span>
          {role === 'admin' && <button className="btn" onClick={() => navigate("/admin-dashboard")}>Goto Admin</button>}
        </div>
        <div className="nav-buttons">
          <button className="btn btn-danger" onClick={() => navigate("/census-dashboard")}>Home</button>
          <button className="btn btn-danger ms-2" onClick={() => navigate("/logout")}>Logout</button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="row main-container">
        {/* Left Panel: Citizen Dashboards List */}
        <div className="panel col">
          {/* Profile Image */}
          <div className="profileImage">
            <img
              src={
                womanImage
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover", border: "3px solid #ddd" }}
            />
          </div>

          <ul className="list-group">
            <li className="list-group-item">Census Department</li>
          </ul>
        </div>

        {/* Right Panel: Record Cards */}
        <Outlet />
      </div>
    </div>
  );
};

export default CensusDashboard;
