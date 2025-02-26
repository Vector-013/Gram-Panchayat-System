import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetCitizens from './pages/GetCitizens';
import PostCitizen from './pages/PostCitizens';
import CitizensByHousehold from './pages/citizen/household';
import MedicalDataPage from './pages/citizen/medical';
import TaxRecords from './pages/citizen/tax';
import LandRecords from './pages/citizen/landRecord';
import VaccinationRecords from './pages/citizen/vaccineRecord';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-citizens" element={<GetCitizens />} />
        <Route path="/post-citizen" element={<PostCitizen />} />
        <Route path="/house-citizen/:citizenId" element={<CitizensByHousehold/>} />
        <Route path="/medical-citizen/:citizenId" element={<MedicalDataPage/>} />
        <Route path="/tax-citizen/:citizenId" element={<TaxRecords/>} />
        <Route path="/land-records/:citizenId" element={<LandRecords/>} />
        <Route path="/vaccination-records/:citizenId" element={<VaccinationRecords/>} />
      </Routes>
    </Router>
  );
};

export default App;
