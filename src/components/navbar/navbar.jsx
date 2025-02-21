import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <button
        className="btn btn-danger"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Navbar;
