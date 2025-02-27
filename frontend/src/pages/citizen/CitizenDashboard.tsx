import React from "react";
import { useNavigate } from "react-router-dom";

const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center">Citizen Dashboard</h2>
      <p className="text-center">Welcome, Citizen! You have limited access.</p>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/logout")}>Logout</button>
      </div>
    </div>
  );
};

export default CitizenDashboard;
