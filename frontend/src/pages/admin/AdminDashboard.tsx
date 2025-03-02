import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import "../../styles/Dashboard.css";
import manImage from "../../images/man.png";
import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container-fluid dashboard-container">
      {/* Navbar */}
      <nav className="navbar d-flex justify-content-between">
        <div className="goto">
          <span>
            Admin
          </span>
          <button className="btn" onClick={() => navigate("/it-dashboard")}>Goto IT</button>
          <button className="btn" onClick={() => navigate("/census-dashboard")}>Goto Census</button>
          <button className="btn" onClick={() => navigate("/welfare-dashboard")}>Goto Welfare</button>
        </div>
        <div className="nav-buttons">
          <button className="btn btn-danger" onClick={() => navigate("/admin-dashboard")}>Home</button>
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
                manImage
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover", border: "3px solid #ddd" }}
            />
          </div>

          <ul className="list-group">
            <li className="list-group-item">Admin</li>
          </ul>
        </div>

        {/* Right Panel: Record Cards */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
