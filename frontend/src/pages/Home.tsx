import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Gram Panchayat Management System</h1>
      <div style={{ margin: '20px' }}>
        <button 
          onClick={() => navigate('/get-citizens')}
          style={{ marginRight: '10px' }}
        >
          Get Citizens
        </button>
        <button onClick={() => navigate('/post-citizen')}>
          Post Citizen
        </button>
      </div>
    </div>
  );
};

export default Home;
