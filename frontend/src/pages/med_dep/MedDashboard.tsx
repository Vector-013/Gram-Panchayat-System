import React, { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';

const MedDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to admin login if no token is found
    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token || role !== 'med_dept') {
        navigate('/login');
      }
    }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Med Department Dashboard</h2>
      <p className="text-center">Welcome, Med Department!</p>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/logout")}>Logout</button>
      </div>
       <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/med-dept/vacc-query")}>Vaccination Query</button>
      </div>
    </div>
  );
};

export default MedDashboard;
