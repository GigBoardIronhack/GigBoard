import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      {!currentUser && (
        <>
          <NavLink to="/register">
            <button>Register</button>
          </NavLink>
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        </>
      )}
      {currentUser && (
        <>
          <NavLink to="/dashboard">
            <button>Dashboard</button>
          </NavLink>
          
          <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button>Artists</button>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  background: "white",
                  border: "1px solid #ccc",
                  zIndex: 1000,
                  minWidth: "150px"
                }}
              >
                {currentUser.role === "agency" ? (
                  <>
                    <Link to="/artists">
                      <div style={{ padding: "5px 10px", cursor: "pointer" }}>
                        Mis Artistas
                      </div>
                    </Link>
                    <Link to="/artists/all">
                      <div style={{ padding: "5px 10px", cursor: "pointer" }}>
                        Todos los Artistas
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/artists">
                      <div style={{ padding: "5px 10px", cursor: "pointer" }}>
                        Todos los Artistas
                      </div>
                    </Link>
                    <Link to="/artists/favorites">
                      <div style={{ padding: "5px 10px", cursor: "pointer" }}>
                        Artistas Favoritos
                      </div>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <NavLink to="/purposals">
            <button>Purposals</button>
          </NavLink>
          <NavLink to="/chats">
            <button>Chats</button>
          </NavLink>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </>
  );
};

export default Navbar;
