import { Route, Routes } from "react-router-dom";
import PromoterDashboard from "../pages/PromoterPages/PromoterDashboard";
import ArtistDetail from "../pages/ArtistPages/ArtistDetail";
import PromoterArtists from "../pages/PromoterPages/PromoterArtists";
import Edit from "../pages/Edit";
import PurposalList from "../pages/PurposalPages/PurposalList";
import PurposalDetail from "../pages/PurposalPages/PurposalDetail";
import PurposalEdit from "../pages/PurposalPages/PurposalEdit";
import PurposalCreate from "../pages/PurposalPages/PurposalCreate";

const PromoterApp = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<PromoterDashboard />} />
      <Route path="/artists" element={<PromoterArtists />} />
      <Route path="/artists/:id" element={<ArtistDetail />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/purposals" element={<PurposalList />} />
      <Route path="/artists/:id/purposal" element={<PurposalCreate />} />
      <Route path="/purposals/:id/:chatId" element={<PurposalDetail />} />
      <Route path="/edit/purposals/:id" element={<PurposalEdit />} />
    </Routes>
  );
};

export default PromoterApp;
