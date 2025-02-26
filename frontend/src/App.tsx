import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetCitizens from './pages/GetCitizens';
import PostCitizen from './pages/PostCitizens';
import CitizensByHousehold from './pages/citizen/household';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-citizens" element={<GetCitizens />} />
        <Route path="/post-citizen" element={<PostCitizen />} />
        <Route path="/house-citizen/:citizenId" element={<CitizensByHousehold/>} />
      </Routes>
    </Router>
  );
};

export default App;
