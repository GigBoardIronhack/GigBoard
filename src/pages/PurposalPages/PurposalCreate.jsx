/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { editPurposal } from "../../services/purposal.service";
import { createPurposal } from "../../services/promoter.service";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Calculator from "../../components/Calculator/Calculator";
import { getArtist } from "../../services/artist.service";
import { createChatService } from "../../services/chat.service";

const PurposalCreate = ({ purposal, isEditing }) => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [artist, setArtist] = useState(purposal?.artist || {});


useEffect(() => {
  if (purposal?.artist) {
    setArtist(purposal.artist);
  } else {
    const fetchArtist = async () => {
      try {
        const artistData = await getArtist(id);
        setArtist(artistData);
      } catch (error) {
        console.error("Error al obtener el artista:", error);
      }
    };
    fetchArtist();
  }
}, [purposal, id]);

  const [purposalData, setPurposalData] = useState({
    negotiatedPrice: purposal?.negotiatedPrice || null,
    eventDate: purposal?.eventDate || null,
    status: purposal?.status || "pending",
    purposalChat: purposal?.purposalChat || null,
    notes: purposal?.notes || [],
  });

  console.log("Estado inicial purposalData:", purposalData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", purposalData);
  
    if (!purposalData.eventDate || !(purposalData.eventDate instanceof Date)) {
      console.error("Invalid or missing eventDate");
      return;
    }
  
    try {
      let purposalChat;
      if (!isEditing) {
        purposalChat = await createChatService(artist.agency.id);
        console.log("Chat creado con ID:", purposalChat.id);
      } else {
        purposalChat = { id: purposalData.purposalChat };
      }
  
      const uploadData = {
        promoter: currentUser.id,
        negotiatedPrice: purposalData.negotiatedPrice,
        eventDate: purposalData.eventDate.toLocaleDateString("sv-SE"),
        purposalChat: purposalChat.id,
        status: purposalData.status,
        notes: purposalData.notes,
      };
  
      console.log("Enviando datos a createPurposal:", uploadData);
  
      if (isEditing) {
        const updatePurposal = await editPurposal(purposal.id, uploadData);
        console.log("Purposal editada:", updatePurposal);
        navigate(`/purposals/${updatePurposal.id}/${updatePurposal.purposalChat}`);
      } else {
        const newPurposal = await createPurposal(id, uploadData);
        console.log("Purposal creada con éxito:", newPurposal);
        navigate(`/purposals/${newPurposal.id}/${purposalChat.id}`);
        setPurposalData((prevState) => ({
          ...prevState,
          artist: newPurposal.artist,
          purposalChat: purposalChat.id,
        }));
      }
    } catch (error) {
      console.error("Error al crear la purposal:", error.response?.data || error.message);
    }
  };
  
 
  const handleDateChange = (date) => {
    setPurposalData((prevState) => ({
      ...prevState,
      eventDate: date,
    }));
  };
  console.log("eventDate en estado:", purposalData.eventDate);

  const eventDate = purposalData.eventDate ? new Date(purposalData.eventDate) : null;

  const dayOfWeek = eventDate ? eventDate.getDay() : null;
  const monthOfYear = eventDate ? eventDate.getMonth() : null;

  let weekendBoost = dayOfWeek === 5 || dayOfWeek === 6;
  let summerBoost = monthOfYear === 5 || monthOfYear === 6 || monthOfYear === 7

   


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Cambiando ${name}:`, value);
    setPurposalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePriceChange = (newPrice) => {
    console.log("Nuevo negotiatedPrice recibido en PurposalCreate:", newPrice); 
    setPurposalData((prevState) => ({
      ...prevState,
      negotiatedPrice: newPrice,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
          <div>
            <Calendar
              onChange={handleDateChange}
              value={purposalData.eventDate}
            />
            {artist && (
              <Calculator 
                artist={artist} 
                key={artist.id} 
                weekendBoost={weekendBoost} 
                summerBoost={summerBoost} 
                onPriceChange={handlePriceChange}
              />
            )}
          
          </div>
          {!isEditing && 
          <label htmlFor="notes">
            <textarea
              placeholder="Añadir notas..."
              name="notes"
              id="notes"
              onChange={handleChange}
              value={purposalData.notes || ""}
              rows={4}
              cols={50}
            />
          </label>
        }
        </div>
      

        <button type="submit">{isEditing ? "Edit" : "Enviar"}</button>
      </form>
    </div>
  );
};

export default PurposalCreate;
