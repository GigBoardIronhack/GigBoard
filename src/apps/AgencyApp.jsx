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
import DeleteArtist from "../pages/ArtistPages/DeleteArtist";
import FilterArtists from "../pages/FilterArtists/FilterArtists";
import { AnimatePresence, motion } from "framer-motion";

const AgencyApp = () => {
  return (
    <>

   
     <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
        >
    <Routes>
      <Route path="/dashboard" element={<AgencyDashboard />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/artists" element={<AgencyArtists />} />
      <Route path="/artists/:id" element={<ArtistDetail />} />
      <Route path="/create/artist" element={<ArtistForm />} />
      <Route path="/artists/edit/:id" element={<EditArtist />} />
      <Route path="/artists/delete/:id" element={<DeleteArtist />} />
      <Route path="/purposals" element={<PurposalList />} />
      <Route path="/purposals/:id/:chatId" element={<PurposalDetail />} />
      <Route path="/edit/purposals/:id" element={<PurposalEditAgency />} />
      <Route path="/artists/all" element={<FilterArtists />} />
    </Routes>
      </motion.div>
      </AnimatePresence>


    </>
    

  );
};

export default AgencyApp;
