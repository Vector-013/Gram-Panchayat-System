import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
  citizen_id: number;
  name: string;
  email: string;
  gender: string;
  dob: string;
  household_id: number;
  educational_qualification: string;
  password: string;
}

const AdminRegister: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    citizen_id: 0,
    name: '',
    email: '',
    gender: '',
    dob: '',
    household_id: 0,
    educational_qualification: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to admin login if no token is found
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'citizen_id' || name === 'household_id'
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    try {
      await axios.post('/api/admin/register', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Citizen registered successfully!');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error registering citizen');
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register a New Citizen</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="citizen_id">Citizen ID:</label>
          <input
            id="citizen_id"
            type="number"
            name="citizen_id"
            placeholder="Enter Citizen ID"
            title="Citizen ID"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter full name"
            title="Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter email address"
            title="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            title="Gender"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            id="dob"
            type="date"
            name="dob"
            title="Date of Birth"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="household_id">Household ID:</label>
          <input
            id="household_id"
            type="number"
            name="household_id"
            placeholder="Enter Household ID"
            title="Household ID"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="educational_qualification">Educational Qualification:</label>
          <input
            id="educational_qualification"
            type="text"
            name="educational_qualification"
            placeholder="Enter qualification"
            title="Educational Qualification"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            title="Password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register Citizen</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdminRegister;
