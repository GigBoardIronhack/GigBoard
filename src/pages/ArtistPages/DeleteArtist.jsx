/* eslint-disable react/prop-types */

import { useContext } from "react";
import { deleteArtist } from "../../services/agency.service"
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteArtist = ({id}) => {
  const { getCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteArtist(id);
      await getCurrentUser();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al eliminar artista:", error);
    }
  };
  return (
    <button onClick={handleDelete}>Eliminar</button>
  )
}

export default DeleteArtist
