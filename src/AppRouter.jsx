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
 
  if (!isAuthLoaded)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#27a3a9] mb-6"></div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 max-w-4xl">
          <div className="text-sm max-w-xs">
            <p className="text-lg font-semibold mb-2">Cargando Render...</p>
            <p className="text-gray-600 dark:text-gray-300">
              Esto puede tardar hasta un minuto. Gracias por esperar.
            </p>
            <p className="mt-4">
              Siéntete libre de crear nuevos perfiles, pero si quieres algo rápido, aquí tienes dos perfiles de prueba:
            </p>
            <ul className="mt-1">
              <li><strong>Agencia:</strong> agency@agency.com</li>
              <li><strong>Promotor:</strong> promotor@promotor.com</li>
              <li><strong>Contraseña común:</strong> aA1</li>
            </ul>
          </div>
          <div className="text-sm max-w-xs">
            <p className="text-lg font-semibold mb-2">Loading Render...</p>
            <p className="text-gray-600 dark:text-gray-300">
              This may take up to a minute. Thank you for your patience.
            </p>
            <p className="mt-4">
              Feel free to create new profiles, but if you want something quick, here are two test accounts:
            </p>
            <ul className="mt-1">
              <li><strong>Agency:</strong> agency@agency.com</li>
              <li><strong>Promoter:</strong> promotor@promotor.com</li>
              <li><strong>Common password:</strong> aA1</li>
            </ul>
          </div>
        </div>
      </div>
    );
  

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
