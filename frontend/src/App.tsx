import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GetCitizens from './pages/GetCitizens';
import PostCitizen from './pages/PostCitizens';
import CitizensByHousehold from './pages/citizen/household';
import MedicalDataPage from './pages/citizen/medical';
import TaxRecords from './pages/citizen/tax';
import LandRecords from './pages/citizen/landRecord';
import VaccinationRecords from './pages/citizen/vaccineRecord';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import AdminRegister from './pages/AdminRegister';
import AssetPage from './pages/base/assets';
import EnvironmentStats from './pages/base/env';
import GeoPage from './pages/base/geo';
import FloraFaunaPage from './pages/base/floraFauna';
import CitizenPanchayatForm from './pages/it_dep/land_query';
import ItDashboard from './pages/it_dep/ItDasboard';
import EdDashboard from './pages/welfare_dep/WelfareDashboard';
import EducationForm from './pages/welfare_dep/ed_query';
import MedDashboard from './pages/med_dep/MedDashboard';
import TaxQueryForm from './pages/it_dep/tax_query';
import AssetQueryForm from './pages/it_dep/asset_query';
import IncomeQueryForm from './pages/it_dep/income_query';

import CitizenModal from './pages/citizen/CitizenModal';
import CitizenHouseholdModal from './pages/citizen/household';
import CitizenLandModal from './pages/citizen/landRecord';
import CitizenMedicalModal from './pages/citizen/medical';
import CitizenTaxModal from './pages/citizen/CitizenTaxModal';
import CitizenVaccineModal from './pages/citizen/CitizenVaccineModal';
import CitizenEnvModal from './pages/citizen/CitizenEnvModal';
import CitizenGeoModal from './pages/citizen/CitizenGeoModal';

import WelfareDashboard from './pages/welfare_dep/WelfareDashboard';
import WelfareModal from './pages/welfare_dep/WelfareModal';
import WelfareSGCModal from './pages/welfare_dep/WelfareSGCModal';
import WelfareEduModal from './pages/welfare_dep/WelfareEduModal';

import ITModal from './pages/it_dep/ITModal';
import FinancialGraph from './pages/it_dep/analytics';
import "./styles/App.css";
// Function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Function to get user role from localStorage
const getUserRole = () => {
  return localStorage.getItem('role') || 'citizen'; // Default to 'citizen' if no role is found
};

// Protected Route component
const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

// Role-based Landing Page
const LandingPage: React.FC = () => {
  const role = getUserRole();
  if (role === 'admin') {
    return <Navigate to="/admin-dashboard" replace />;
  } else if (role === 'it_dept') {
    return <Navigate to="/it-dashboard" replace />;
  } 
  else if(role === 'edu_dept')
  {
    return <Navigate to="/ed-dashboard" replace />;
  }
  else if(role === 'med_dept')
  {
    return <Navigate to="/med-dashboard" replace />;
  }
  else {
    return <Navigate to="/citizen-dashboard" replace />;
  }
};


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />

        {/* Citizen Dashboard */}
        <Route path="/citizen-dashboard/:citizenId" element={<ProtectedRoute element={<CitizenDashboard />} />}>
            <Route index element={<CitizenModal />} /> 
            <Route path="household" element={<CitizenHouseholdModal />} />
            <Route path="land-record" element={<CitizenLandModal />} />
            <Route path="medical" element={<CitizenMedicalModal />} />
            <Route path="tax" element={<CitizenTaxModal />} />
            <Route path="vaccine" element={<CitizenVaccineModal />} />
            <Route path="env" element={<CitizenEnvModal />} />
            <Route path="geo" element={<CitizenGeoModal />} />
        </Route>

        <Route path="/it-dashboard" element={<ProtectedRoute element={<ItDashboard />} />} >
            <Route index element={<ITModal />} /> 
            <Route path="land-query" element={<CitizenPanchayatForm />} />
            <Route path="tax-query" element={<TaxQueryForm />} />
            <Route path="asset-query" element={<AssetQueryForm />} />
            <Route path="income-query" element={<IncomeQueryForm />} />
            <Route path="analytics" element={<ProtectedRoute element={<FinancialGraph />} />} />
        </Route>

        <Route path="/welfare-dashboard" element={<ProtectedRoute element={<WelfareDashboard />} />}>
            <Route index element={<WelfareModal />} />
            <Route path ="sgc" element={<WelfareSGCModal />} />
            <Route path="edu" element={<WelfareEduModal />} />
        </Route>

        {/* Protected Routes for Citizen Data */}
        <Route path="/get-citizens" element={<ProtectedRoute element={<GetCitizens />} />} />
        <Route path="/post-citizen" element={<ProtectedRoute element={<PostCitizen />} />} />
        <Route path="/house-citizen/:citizenId" element={<ProtectedRoute element={<CitizensByHousehold />} />} />
        <Route path="/medical-citizen/:citizenId" element={<ProtectedRoute element={<MedicalDataPage />} />} />
        <Route path="/tax-citizen/:citizenId" element={<ProtectedRoute element={<TaxRecords />} />} />
        <Route path="/land-records/:citizenId" element={<ProtectedRoute element={<LandRecords />} />} />
        <Route path="/vaccination-records/:citizenId" element={<ProtectedRoute element={<VaccinationRecords />} />} />
        <Route path="/admin-register" element={<ProtectedRoute element={<AdminRegister />} />} />
        <Route path="/assets" element={<AssetPage />} />
        <Route path="/env" element={<EnvironmentStats />} />
        <Route path="/geo" element={<GeoPage />} />
        <Route path="/flora-fauna" element={<FloraFaunaPage />} />
        <Route path="/ed-dept/ed-query" element={<ProtectedRoute element={<EducationForm />} />} />

      </Routes>
    </Router>
  );
};

export default App;
