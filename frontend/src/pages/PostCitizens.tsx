import React, { useState } from 'react';
import axios from 'axios';

interface CitizenForm {
  name: string;
  gender: string;
  dob: string;
  household_id: number;
  educational_qualification: string;
}

const PostCitizen: React.FC = () => {
  const [formData, setFormData] = useState<CitizenForm>({
    name: '',
    gender: '',
    dob: '',
    household_id: 0,
    educational_qualification: '',
  });
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'household_id' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post('/api/citizens/', formData);
      setMessage('Citizen added successfully!');
      // Reset the form after submission
      setFormData({
        name: '',
        gender: '',
        dob: '',
        household_id: 0,
        educational_qualification: '',
      });
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(`Error: ${err.response.data.detail}`);
      } else {
        setError('Error adding citizen');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add a New Citizen</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="nameInput">Name:</label>
          <input
            id="nameInput"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="genderSelect">Gender:</label>
          <select
            id="genderSelect"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="dobInput">Date of Birth:</label>
          <input
            id="dobInput"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="householdIdInput">Household ID:</label>
          <input
            id="householdIdInput"
            type="number"
            name="household_id"
            value={formData.household_id}
            onChange={handleChange}
            required
            placeholder="Enter household ID"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="eduQualInput">Educational Qualification:</label>
          <input
            id="eduQualInput"
            type="text"
            name="educational_qualification"
            value={formData.educational_qualification}
            onChange={handleChange}
            required
            placeholder="Enter qualification"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PostCitizen;
