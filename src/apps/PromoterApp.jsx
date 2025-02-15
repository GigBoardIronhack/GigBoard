import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import PromoterDashboard from "../pages/PromoterPages/PromoterDashboard";

const PromoterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<PromoterDashboard />} />
    </Routes>
  );
};

export default PromoterApp;
