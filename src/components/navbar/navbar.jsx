import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import giglogo from "../../assets/giglogo.png"

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownMobile, setShowDropdownMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {pathname} = useLocation();



  useEffect(() => {
    setIsOpen(false);
    setShowDropdownMobile(false);
  }, [pathname]);

  return (
    <nav className="relative z-50 bg-gray-200 p-4">
     <div className="absolute top-1/2 left-[60%] lg:left-[54%]  -translate-x-1/2 -translate-y-1/2">
          <img src={giglogo} alt="gigboard logo" className="object-cover w-1/2" />
        </div>
      <div className="flex justify-between items-center w-full">
        {/* Botón de hamburguesa para móviles */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
            />
          </svg>
        </button>

        {/* Menú de escritorio */}
        <div className="hidden md:flex space-x-6">
          {currentUser ? (
            <>
              <NavLink to="/dashboard" className="hover:text-gray-600">
                Dashboard
              </NavLink>

              {/* Dropdown de Artists para versión de escritorio */}
              <div 
                className="relative" 
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
              <NavLink to="/artists" >
                <button className="hover:text-gray-600">Artists</button>
                </NavLink>
                {showDropdown && (
                  <div className="absolute top-full bg-white border border-gray-300 rounded shadow-md min-w-[150px]">
                    {currentUser.role === "agency" ? (
                      <>
                        <NavLink to="/artists" className="block px-4 py-2 hover:bg-gray-100">Mis Artistas</NavLink>
                        <NavLink to="/artists/all" className="block px-4 py-2 hover:bg-gray-100">Todos los Artistas</NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to="/artists" className="block px-4 py-2 hover:bg-gray-100">Todos los Artistas</NavLink>
                        <NavLink to="/artists/favorites" className="block px-4 py-2 hover:bg-gray-100">Artistas Favoritos</NavLink>
                      </>
                    )}
                  </div>
                )}
              </div>

              <NavLink to="/purposals" className="hover:text-gray-600">Purposals</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/register" className="hover:text-gray-600">Register</NavLink>
              <NavLink to="/login" className="hover:text-gray-600">Login</NavLink>
            </>
          )}
        </div>
       

        {/* Botón de logout */}
        {currentUser && (
          <button className="hidden md:block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={logout}>
            Logout
          </button>
        )}
      </div>

      {/* Menú móvil (se muestra cuando `isOpen` es `true`) */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col items-center py-4 space-y-4">
          {currentUser ? (
            <>
              <NavLink to="/dashboard" className="hover:text-gray-600">Dashboard</NavLink>

              {/* Dropdown de Artists para móviles */}
              <div className="w-full text-center">
                <button 
                  className="hover:text-gray-600 w-full" 
                  onClick={() => setShowDropdownMobile(!showDropdownMobile)}
                >
                  Artists {showDropdownMobile ? "▲" : "▼"}
                </button>
                {showDropdownMobile && (
                  <div className="bg-gray-100 p-2 rounded mt-2">
                    {currentUser.role === "agency" ? (
                      <>
                        <NavLink to="/artists" className="block px-4 py-2 hover:bg-gray-200">Mis Artistas</NavLink>
                        <NavLink to="/artists/all" className="block px-4 py-2 hover:bg-gray-200">Todos los Artistas</NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to="/artists" className="block px-4 py-2 hover:bg-gray-200">Todos los Artistas</NavLink>
                        <NavLink to="/artists/favorites" className="block px-4 py-2 hover:bg-gray-200">Artistas Favoritos</NavLink>
                      </>
                    )}
                  </div>
                )}
              </div>

              <NavLink to="/purposals" className="hover:text-gray-600">Purposals</NavLink>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/register" className="hover:text-gray-600">Register</NavLink>
              <NavLink to="/login" className="hover:text-gray-600">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
