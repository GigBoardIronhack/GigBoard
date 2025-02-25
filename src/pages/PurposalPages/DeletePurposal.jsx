/* eslint-disable react/prop-types */

import { useContext } from "react";
import { deletePurposal } from "../../services/purposal.service"
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteChat } from "../../services/chat.service";

const DeletePurposal = ({id, chatId}) => {
  const { getCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePurposal(id);
      await deleteChat(chatId)
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

export default DeletePurposal
