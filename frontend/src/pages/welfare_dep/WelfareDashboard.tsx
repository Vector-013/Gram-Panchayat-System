import React, { useEffect, } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import manImage from "../../images/man.png";
import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";
import "../../styles/Dashboard.css";

const WelfareDashboard: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  // Redirect to admin login if no token is found
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || (role !== 'welfare' && role !== 'admin')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container-fluid dashboard-container">
      {/* Navbar */}
      <nav className="navbar d-flex justify-content-between">
        <div className="goto">
          <span>
            Welfare Department
          </span>
          {role === 'admin' && <button className="btn" onClick={() => navigate("/admin-dashboard")}>Goto Admin</button>}
        </div>
        <div className="nav-buttons">
          <button className="btn btn-danger" onClick={() => navigate("/welfare-dashboard")}>Home</button>
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
            <li className="list-group-item">Welfare Department</li>
          </ul>
        </div>

        {/* Right Panel: Record Cards */}
        <Outlet />
      </div>
    </div>
  );
};

export default WelfareDashboard;
