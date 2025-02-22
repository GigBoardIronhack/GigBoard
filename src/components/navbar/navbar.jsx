import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {

  const { logout, currentUser } = useContext(AuthContext);

  return (
    <>
    {!currentUser &&
    <>
    <NavLink to={"/register"}>
    <button>Register </button>
    </NavLink>
    <NavLink to={"/login"}>
    <button>Login </button>
    </NavLink>
    </>
  } {currentUser && 
      <>
      <NavLink to={"/dashboard"}>
      <button>Dashboard</button>
      </NavLink>
      <NavLink to={"/artists"}>
      <button>Artists </button>
      </NavLink>
      <NavLink to={"/purposals"}>
      <button>Purposals </button>
      </NavLink>
      <NavLink to={"/chats"}>
      <button>Chats </button>
      </NavLink>


      
      <button
        className="btn btn-danger"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      </>
    }
    </>
  );
};

export default Navbar;
