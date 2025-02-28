import React, { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';

const EdDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to admin login if no token is found
    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token || role !== 'edu_dept') {
        navigate('/login');
      }
    }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">IT Department Dashboard</h2>
      <p className="text-center">Welcome, IT Department!</p>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/logout")}>Logout</button>
      </div>
       <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/ed-dept/ed-query")}>Education Query</button>
      </div>
    </div>
  );
};

export default EdDashboard;
