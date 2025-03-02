import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import bgImage from "../../images/login-bg.jpg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();

      // data is a JWT token

      // so we should convert it to a 

      // Save token and role in localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("citizen_id", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
      localStorage.setItem("dob", data.dob);
      localStorage.setItem("educational_qualification", data.educational_qualification);
      localStorage.setItem("income", data.income);
      localStorage.setItem("household_id", data.household_id);
      localStorage.setItem("address", data.address);
      localStorage.setItem("gender", data.gender);
      if (data.role === "employee") {
        localStorage.setItem("employee_id", data.eid);
        localStorage.setItem("erole", data.erole);
      }

      console.log(data.role);
      // Redirect to the landing page
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      }
      else if (data.role === "it_dept") {
        navigate("/it-dashboard");
      }
      else if (data.role === "edu_dept") {
        navigate("/ed-dashboard");
      }
      else if (data.role === "med_dept") {
        navigate("/med-dashboard");
      }
      else if (data.role === "welfare") {
        navigate("/welfare-dashboard");
      }
      else if (data.role === "census_dept") {
        navigate("/census-dashboard");
      }
      else if (data.role === "employee" || data.role === "pradhan") {
        navigate(`/employee-dashboard/${data.eid}`);
      }
      else if(data.role === 'citizen'){
        navigate(`/citizen-dashboard/${data.id}`);
      }
      else {
        navigate("/login"); 
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="bgHolder"><img src={bgImage} alt="bgImage" className="bgImage" /></div>
      <div className="login-container">
        <div className="glass-card">
          <h2 className="login-title">Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="formHolder">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="btnHolder"><button type="submit" className="login-button">Login</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
