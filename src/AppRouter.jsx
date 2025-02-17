import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AgencyApp from "./apps/AgencyApp";
import PromoterApp from "./apps/PromoterApp";
import Navbar from "./components/navbar/navbar";

function App() {
  const { currentUser, isAuthLoaded } = useContext(AuthContext);

  if (!isAuthLoaded) return <p>Cargando...</p>;

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
