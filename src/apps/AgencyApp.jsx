import { Route, Routes } from "react-router-dom";
import AgencyDashboard from "../pages/AgencyPages/AgencyDashboard";
import AgencyArtists from "../pages/AgencyPages/AgencyArtists";
import ArtistDetail from "../pages/ArtistPages/ArtistDetail";

const AgencyApp = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AgencyDashboard />} />
      <Route path="/artists" element={<AgencyArtists />} />
      <Route path="/artists/:id" element={<ArtistDetail />} />
      
      
    </Routes>
  );
};

export default AgencyApp;
