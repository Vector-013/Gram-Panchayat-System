import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-fluid dashboard-container">
      {/* Navbar */}
      <nav className="navbar d-flex justify-content-between">
        <span>
          IT Department 
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
                womanImage
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover", border: "3px solid #ddd" }}
            />
          </div>

          <ul className="list-group">
            <li className="list-group-item">IT Department</li>
          </ul>
        </div>

        {/* Right Panel: Record Cards */}
        <div className="card-holder col">
          <div className="imgCont"><img src={bgImage} alt="bg" className="bg-image" /></div>
          <div className="cardHolders">
            <div className="row">
              <div className="col">
                <RecordCard title="Land Record" onRedirect={() => alert("Redirecting to Landlord Record")} />
              </div>
              <div className="col">
                <RecordCard title="Tax Record" onRedirect={() => alert("Redirecting to Medical Record")} />
              </div>
              
            </div>
            <div className="row">
              <div className="col">
                <RecordCard title="Income Record" onRedirect={() => alert("Redirecting to Landlord Record")} />
              </div>
              <div className="col">
                <RecordCard title="Asset Record" onRedirect={() => alert("Redirecting to Medical Record")} />
              </div>              
            </div>
            
          </div>
        </div>
      </div>
       <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/it-dept/tax-query")}>Tax Query</button>
      </div>
         <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/it-dept/asset-query")}>Asset Query</button>
      </div>
         <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/it-dept/income-query")}>Income Query</button>
      </div>
    </div>
  );
};

export default CitizenDashboard;
