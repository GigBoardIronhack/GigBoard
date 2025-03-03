/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { getPurposal, editPurposal, deletePurposal } from "../../services/purposal.service";
import { deleteChat } from "../../services/chat.service";

const PurposalEditAgency = ({id, setNeedRefresh}) => {
 
  const navigate = useNavigate();
  const [purposalData, setPurposalData] = useState(null);

  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const purposal = await getPurposal(id);
        setPurposalData(purposal);
      } catch (error) {
        console.error("Error obteniendo purposal:", error);
      }
    };

    fetchPurposal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurposalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editedPurposal = await editPurposal(id, { status: purposalData.status });
  
      if (editedPurposal.status === "rejected") {
        console.log("ENTRO AQUI", editedPurposal.purposalChat);
  
        await deletePurposal(editedPurposal.id);
  
        if (editedPurposal.purposalChat) {
          await deleteChat(editedPurposal.purposalChat);
        }
  
        setNeedRefresh(true);
      }
  
      navigate("/purposals");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };
  

  if (!purposalData) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="status">Estado:</label>
      <select name="status" value={purposalData.status} onChange={handleChange}>
        <option value="pending">Pendiente</option>
        <option value="accepted">Aceptado</option>
        <option value="rejected">Rechazado</option>
      </select>
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default PurposalEditAgency;
