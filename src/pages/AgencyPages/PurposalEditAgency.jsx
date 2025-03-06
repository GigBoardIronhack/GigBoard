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
    <form onSubmit={handleSubmit} className="flex flex-col w-full space lg:flex-row">
  <label htmlFor="status" className="text-lg font-medium text-gray-700"></label>

  <div className="relative flex items-center">
    <select
      name="status"
      value={purposalData.status}
      onChange={handleChange}
      className="block w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="pending">Pendiente</option>
      <option value="accepted">Aceptado</option>
      <option value="rejected">Rechazado</option>
    </select>
    
    
    <div className="absolute inset-y-0  right-0  flex items-center pr-1 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
  <button className="sm:hidden lg:block">
  <svg
  style={{ width: "57px" }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="custom-svg hidden lg:block"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
      fill="#1C274C"
    />
  </svg>
  </button>

  <button
    type="submit"
    className="sm:block lg:hidden rounded-full px-4 mb-2 sm:w-full lg:w-auto py-3 mt-4 bg-blue-700 text-white font-semibold  hover:bg-blue-300 hover:text-black  focus:ring-2 focus:ring-blue-500 transition duration-300 lg:px-3 lg:py-2"
  >
    Actualizar
  </button>
</form>

  );
};

export default PurposalEditAgency;
