import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AgencyDashboard from "../pages/AgencyPages/AgencyDashboard";

const AgencyApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<AgencyDashboard />} />
    </Routes>
  );
};

export default AgencyApp;
