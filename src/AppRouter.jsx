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



function App() {
  const { currentUser, isAuthLoaded } = useContext(AuthContext);

  useDarkMode()
 
  if (!isAuthLoaded) return <div className="h-screen bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b]"> <p>Cargando...</p></div>;

  return (
    <>
    <Navbar />
      
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
    </>
  );
}

export default App;
