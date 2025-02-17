
import Register from "./Register";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Edit = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div>
      <Register user={currentUser} isEditing />
    </div>
  );
};

export default Edit;
