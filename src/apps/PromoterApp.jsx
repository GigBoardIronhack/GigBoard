import { Route, Routes } from "react-router-dom";
import PromoterDashboard from "../pages/PromoterPages/PromoterDashboard";
import ArtistDetail from "../pages/ArtistPages/ArtistDetail";
import FilterArtists from "../pages/FilterArtists/FilterArtists";
import Edit from "../pages/Edit";
import PurposalList from "../pages/PurposalPages/PurposalList";
import PurposalDetail from "../pages/PurposalPages/PurposalDetail";
import PurposalEdit from "../pages/PurposalPages/PurposalEdit";
import PurposalCreate from "../pages/PurposalPages/PurposalCreate";
import FavoriteArtists from "../pages/PromoterPages/FavoriteArtists"
import { AnimatePresence, motion } from "framer-motion";

const PromoterApp = () => {
  return (
    <>
    <AnimatePresence mode="wait">
        <motion.div
          className="bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b] "
          key={location.pathname}
          initial={{ opacity: 1, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
    <Routes>
      <Route path="/dashboard" element={<PromoterDashboard />} />
      <Route path="/artists" element={<FilterArtists />} />
      <Route path="/artists/favorites" element={<FavoriteArtists />} />
      <Route path="/artists/:id" element={<ArtistDetail />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/purposals" element={<PurposalList />} />
      <Route path="/artists/:id/purposal" element={<PurposalCreate />} />
      <Route path="/purposals/:id/:chatId" element={<PurposalDetail />} />
      <Route path="/edit/purposals/:id" element={<PurposalEdit />} />

    </Routes>
    </motion.div>
    </AnimatePresence>

    </>
  );
};

export default PromoterApp;
