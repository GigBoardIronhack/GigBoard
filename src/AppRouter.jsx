import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AgencyApp from "./apps/AgencyApp";
import PromoterApp from "./apps/PromoterApp";
import Navbar from "./components/navbar/navbar";
import useDarkMode from "./hook/useDarkMode";
import { AnimatePresence,motion } from "framer-motion";



function App() {
  const { currentUser, isAuthLoaded } = useContext(AuthContext);

  useDarkMode()
 
  if (!isAuthLoaded) return <p>Cargando...</p>;

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
      <motion.div
  key={location.pathname}
  initial={{ opacity: 0, y: -60, scale: 0.95 }} // Inicia un poco más arriba y con leve reducción de tamaño
  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } }} // Transición más fluida
  exit={{ opacity: 0, y: 60, scale: 0.95, transition: { duration: 0.4, ease: "easeInOut" } }} // Salida más armoniosa
>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {currentUser ? (
          currentUser.role === "agency" ? (
            <Route path="/*" element={<AgencyApp />} />
          ) : (
            <Route path="/*" element={<PromoterApp />} />
          )
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
      </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
