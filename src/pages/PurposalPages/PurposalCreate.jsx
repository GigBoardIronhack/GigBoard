import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { editPurposal } from "../../services/purposal.service";
import { createPurposal } from "../../services/promoter.service";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PurposalCreate = ({ purposal, isEditing }) => {
  const { currentUser } = useContext(AuthContext);
  const { artistId } = useParams();
  console.log(artistId)

  const [purposalData, setPurposalData] = useState({
    negotiatedPrice: purposal?.negotiatedPrice || 0,
    eventDate: purposal?.eventDate || null,
    status: purposal?.status || "pending",
    notes: purposal?.notes || [],
  });
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
      notes: purposalData.notes
    };
   
    console.log("📅 Final Event Date being sent:", purposalData.eventDate.toLocaleDateString("sv-SE"));
    
    
    try {
      if (isEditing) {
        const updatePurposal = await editPurposal(purposalData.id, uploadData);
        navigate(`/purposals/${updatePurposal.id}`);
        return;
      }
      const newPurposal = await createPurposal(artistId, uploadData);
      navigate(`/purposals/${newPurposal.id}`);
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
        <Calendar onChange={handleDateChange} value={purposalData.eventDate} />
       

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
        <button type="submit">{isEditing ? "Edit" : "Enviar"}</button>
      </form>
    </div>
  );
};

export default PurposalCreate;
