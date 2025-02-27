import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear stored token and role, then redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h3>Logging out...</h3>
    </div>
  );
};

export default Logout;
