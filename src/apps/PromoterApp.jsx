import { Route, Routes } from "react-router-dom";
import PromoterDashboard from "../pages/PromoterPages/PromoterDashboard";
import ArtistDetail from "../pages/ArtistPages/ArtistDetail";

const PromoterApp = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<PromoterDashboard />} />
      <Route path="/artists/:id" element={<ArtistDetail />} />
    </Routes>
  );
};

export default PromoterApp;
