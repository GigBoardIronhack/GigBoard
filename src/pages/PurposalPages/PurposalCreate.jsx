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

const PurposalCreate = ({ purposal, isEditing }) => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [artist, setArtist] = useState(purposal?.artist || {});

useEffect(() => {
  if (purposal?.artist) {
    setArtist(purposal.artist);
  }
}, [purposal]);
  console.log("Prop purposal en PurposalCreate:", purposal);

  const [purposalData, setPurposalData] = useState({
    negotiatedPrice: purposal?.negotiatedPrice || null,
    eventDate: purposal?.eventDate || null,
    status: purposal?.status || "pending",
    notes: purposal?.notes || [],
  });

  console.log("Estado inicial purposalData:", purposalData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!purposalData.eventDate || !(purposalData.eventDate instanceof Date)) {
      console.error("Invalid or missing eventDate");
      return;
    }

    const uploadData = {
      negotiatedPrice: purposalData.negotiatedPrice,
      eventDate: purposalData.eventDate.toLocaleDateString("sv-SE"),
      status: purposalData.status,
      notes: purposalData.notes,
    };

    try {
      if (isEditing) {
        const updatePurposal = await editPurposal(purposal.id, uploadData);
        navigate(`/purposals/${updatePurposal.id}`);
        return;
      }
      const newPurposal = await createPurposal(id, uploadData);
      navigate(`/purposals/${newPurposal.id}`);
      setPurposalData((prevState) => ({
        ...prevState,
        artist: newPurposal.artist,  
      }));
    } catch (error) {
      console.log(error);
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
    setPurposalData((prevState) => ({
      ...prevState,
      [name]: value,
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
            <Calculator artist={artist} key={artist.id} weekendBoost={weekendBoost} summerBoost={summerBoost}
            />
          </div>
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
        </div>
      

        <button type="submit">{isEditing ? "Edit" : "Enviar"}</button>
      </form>
    </div>
  );
};

export default PurposalCreate;
