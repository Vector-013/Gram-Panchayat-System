import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css'

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to admin login if no token is found
    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token || role !== 'admin') {
        navigate('/login');
      }
    }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>
      <p className="text-center">Welcome, Admin! You have full access.</p>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-danger" onClick={() => navigate("/logout")}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
