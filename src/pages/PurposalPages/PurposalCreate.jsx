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

  import FormPurposalSkeleton from "../../components/Skeleton/FormPurposalSkeleton";


  const PurposalCreate = ({ purposal, isEditing }) => {
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();
    const [artist, setArtist] = useState(purposal?.artist || {});
    const [disabledDates, setDisabledDates] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    const [isLoading, setIsLoading]=useState(true)

    useEffect(() => {
      const fetchPurposals = async () => {
        try {
          let artistData;
          if (isEditing) {
        artistData = await getArtist(purposal.artist.id);
        setIsLoading(false)
      } else {
        artistData = await getArtist(id);
        setIsLoading(false)
      }
     
          if (!artistData?.purposals || !Array.isArray(artistData?.purposals)) {
            console.error("No hay purposals o no es un array.");
            return;
          }
          const bookedDates = artistData?.purposals
            .filter((p) => p.eventDate)
            .map((p) => new Date(p.eventDate));
          
          setDisabledDates(bookedDates);
        } catch (error) {
          console.error("❌ Error al obtener las purposals:", error.response?.data || error.message || error);

        }
      };
      fetchPurposals();
    }, [isEditing, purposal?.artist?.id, id]);
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
      eventDate: purposal?.eventDate ? new Date(purposal?.eventDate) : null,
      status: purposal?.status ||  "pending",
      purposalChat: purposal?.purposalChat || null,
    });
    useEffect(() => {
      const isValid =
        purposalData.eventDate;
      setIsFormValid(isValid);
    }, [purposalData, isEditing]);
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!isFormValid) return;
      
      if (!purposalData.eventDate || !(purposalData.eventDate instanceof Date)) {
        console.error("Invalid or missing eventDate");
        return;
      }
      try {
        let purposalChat;
        if (!isEditing) {
          purposalChat = await createChatService(artist.agency.id);
        
        } else {
          purposalChat = { id: purposalData.purposalChat };
        }
        const uploadData = {
          promoter: currentUser.id,
          negotiatedPrice: purposalData.negotiatedPrice,
          eventDate: purposalData.eventDate.toLocaleDateString("sv-SE"),
          purposalChat: purposalChat.id,
          status: purposalData.status
        };
        
        if (isEditing) {
          const updatePurposal = await editPurposal(purposal.id, uploadData);
          
          navigate(
            `/purposals/${updatePurposal.id}/${updatePurposal.purposalChat}`
          );
        } else {
          const newPurposal = await createPurposal(id, uploadData);
          
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
        eventDate: new Date(date),
      }));
    };
   
    const eventDate = purposalData.eventDate
      ? new Date(purposalData.eventDate)
      : null;
    const dayOfWeek = eventDate ? eventDate.getDay() : null;
    const monthOfYear = eventDate ? eventDate.getMonth() : null;
    let weekendBoost = dayOfWeek === 5 || dayOfWeek === 6;
    let summerBoost = monthOfYear === 5 || monthOfYear === 6 || monthOfYear === 7;
    
    const handlePriceChange = (newPrice) => {
     
      setPurposalData((prevState) => ({
        ...prevState,
        negotiatedPrice: newPrice,
      }));
    };

    
if (isLoading) {
  return <FormPurposalSkeleton />;
} 


    return (
      <div className="flex justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 h-auto gap-6 bg-white shadow-lg rounded-lg w-full max-w-5xl p-6 bg-opacity-60"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center bg-gray-100 shadow-md rounded-lg overflow-hidden">
              <div className="flex flex-row  items-center p-4">
              <div>
                <img src={artist?.imageUrl} alt="" className="max-w-[100px] rounded mr-4" />
              </div>
              <div>
                <h2 className=" text-ellipsis text-lg font-semibold text-black-900">
                  Purposar for</h2>
                  <h2 className="text-black-700 dark:text-black-300 font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[100%] text-center">{artist?.name}</h2>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-100 flex justify-center content-center rounded-lg shadow-md">
              <Calendar
                onChange={handleDateChange}
                value={purposalData.eventDate ? purposalData?.eventDate : purposal?.eventDate}
                minDate={new Date()}
                className="styled-calendar"
                tileDisabled={isTileDisabled}
                tileClassName={({ date, view }) =>
                  isTileDisabled({ date, view })
                    ? "bg-red-500 text-white opacity-50 rounded-md"
                    : ""
                    
                }
                locale="en-US"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md flex">
            {artist && (
              <Calculator
              isEditing={isEditing}
                artist={artist}
                key={artist.id}
                negotiatedPrice={purposalData.negotiatedPrice}
                weekendBoost={weekendBoost}
                summerBoost={summerBoost}
                onPriceChange={handlePriceChange}
              />
            )}
          </div>
          <div className="flex flex-col  gap-4">
            <button
              type="submit"
              className={`w-full p-2 rounded text-white ${isFormValid ? "bg-[#7c3aed] hover:bg-[#936ed4] hover:text-black" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!isFormValid}
            >
              {isEditing ? "Editar" : "Enviar"}
            </button>
          </div>
          </div>
        </form>
      </div>
    );
  };
  export default PurposalCreate;