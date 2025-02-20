import { Route, Routes } from "react-router-dom";
import AgencyDashboard from "../pages/AgencyPages/AgencyDashboard";
import AgencyArtists from "../pages/AgencyPages/AgencyArtists";
import ArtistDetail from "../pages/ArtistPages/ArtistDetail";
import ArtistForm from "../pages/ArtistPages/ArtistForm";
import Edit from "../pages/Edit";
import EditArtist from "../pages/ArtistPages/EditArtist";
import PurposalList from "../pages/PurposalPages/PurposalList";
import PurposalDetail from "../pages/PurposalPages/PurposalDetail";
import PurposalEditAgency from "../pages/AgencyPages/PurposalEditAgency";

const AgencyApp = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AgencyDashboard />} />
      <Route path="/edit" element={<Edit /> } />
      <Route path="/artists" element={<AgencyArtists />} />
      <Route path="/artists/:id" element={<ArtistDetail />} />
      <Route path="/create/artist" element={<ArtistForm/>} />
      <Route path="/artists/edit/:id" element={<EditArtist  /> } />
      <Route path="/purposals" element={<PurposalList/>} />
      <Route path="/purposals/:id" element={<PurposalDetail/>} />
      <Route path="/edit/purposals/:id" element={<PurposalEditAgency/>} />
    </Routes>
  );
};

export default AgencyApp;
