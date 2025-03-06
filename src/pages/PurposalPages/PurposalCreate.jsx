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
import "react-datepicker/dist/react-datepicker.min.css";
import "./PurposalCreate.css"

const PurposalCreate = ({ purposal, isEditing }) => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [artist, setArtist] = useState(purposal?.artist || {});
  const [disabledDates, setDisabledDates] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchPurposals = async () => {
      try {
        const artistData = await getArtist(id);
        console.log("Datos completos del artista:", artistData);

        if (!artistData.purposals || !Array.isArray(artistData.purposals)) {
          console.error("No hay purposals o no es un array.");
          return;
        }
        const bookedDates = artistData.purposals
          .filter((p) => p.eventDate)
          .map((p) => new Date(p.eventDate));

        console.log("Fechas de purposals:", bookedDates);
        setDisabledDates(bookedDates);
      } catch (error) {
        console.error("Error al obtener las purposals:", error);
      }
    };

    fetchPurposals();
  }, [id]);
  
  
  const isTileDisabled = ({ date }) => {
    return disabledDates.some((d) => d.toDateString() === date.toDateString());
  };

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
  
  useEffect(() => {
    // Comprobar si los campos requeridos están completos y válidos
    const isValid =
      purposalData.eventDate && // Verifica que la fecha del evento no esté vacía
      (typeof purposalData.notes === 'string' ? purposalData.notes.trim() !== "" : purposalData.notes.join('').trim() !== ""); // Verifica que las notas no estén vacías (eliminando espacios en blanco)
  
    setIsFormValid(isValid); // Actualiza el estado de validación
  }, [purposalData, isEditing]);
  console.log("Estado inicial purposalData:", purposalData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
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
        navigate(
          `/purposals/${updatePurposal.id}/${updatePurposal.purposalChat}`
        );
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
      console.error(
        "Error al crear la purposal:",
        error.response?.data || error.message
      );
    }
  };
  
  const handleDateChange = (date) => {
    setPurposalData((prevState) => ({
      ...prevState,
      eventDate: date,
    }));
  };
  console.log("eventDate en estado:", purposalData.eventDate);

  const eventDate = purposalData.eventDate
    ? new Date(purposalData.eventDate)
    : null;

  const dayOfWeek = eventDate ? eventDate.getDay() : null;
  const monthOfYear = eventDate ? eventDate.getMonth() : null;

  let weekendBoost = dayOfWeek === 5 || dayOfWeek === 6;
  let summerBoost = monthOfYear === 5 || monthOfYear === 6 || monthOfYear === 7;

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
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 shadow-lg rounded-lg w-full max-w-5xl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <div className="flex-1 p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {artist?.name}
              </h2>
              {console.log("ARTISTA", artist)}
              {artist?.purposals &&
                artist?.purposals.map((purposal) => (
                  <div key={purposal.id}>
                    <p>Next events</p>
                    <p>{purposal?.eventDate?.split("T")[0]}</p>
                    {console.log(purposal.eventDate)}
                  </div>
                ))}
            </div>
          </div>

          <div className="p-4 bg-gray-100 flex justify-center content-center rounded-lg shadow-md">
            <Calendar
              onChange={handleDateChange}
              value={purposalData.eventDate}
              minDate={new Date()}
              className="styled-calendar"
              tileDisabled={isTileDisabled}
              tileClassName={({ date, view }) =>
                isTileDisabled({ date, view })
                  ? `bg-red-500 text-white opacity-50 rounded-md group-hover:${artist.purposals[0].promoter}`
                  : ""
              }
            />
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg shadow-md flex">
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

        <div className="flex flex-col  gap-4">
          {!isEditing && (
            <label htmlFor="notes" className="w-full">
              <textarea
                placeholder="Añadir notas..."
                name="notes"
                id="notes"
                onChange={handleChange}
                value={purposalData.notes || ""}
                rows={6}
                className={"w-full h-[100%] p-3 border rounded-lg shadow-md"}
           
              />
            </label>
          )}

          <button
            type="submit"
            className={`w-full p-2 rounded text-white ${isFormValid ? "bg-[#d76a03] hover:bg-[#e3b505]" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!isFormValid}
          >
            {isEditing ? "Editar" : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurposalCreate;
