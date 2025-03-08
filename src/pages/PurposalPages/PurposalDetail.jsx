import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPurposal } from "../../services/purposal.service";
import Chat from "../../components/chat/Chat";
import DeletePurposal from "./DeletePurposal";
import { AuthContext } from "../../contexts/AuthContext";

const PurposalDetail = () => {
  const [purposal, setPurposal] = useState({});
  const { id, chatId } = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const response = await getPurposal(id);
        setPurposal(response);
      } catch (err) {
        console.error("Error fetching purposal:", err);
      }
    };
    fetchPurposal();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 px-4 py-6">
      <div className="w-full max-w-4xl flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden h-full bg-opacity-60">
        <div className="w-full h-56 lg:h-64 relative">
          <img
            src={purposal.artist?.imageUrl || "/default-placeholder.png"}
            alt={purposal.artist?.name || "Unknown Artist"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 h-full">
          
          <div className="flex flex-col space-y-4 justify-center">
            <h1 className="text-2xl font-bold text-black-900 dark:text-white border-b pb-2">
              Purposal Details
            </h1>

            <div className="space-y-2 text-black-700 dark:text-black-300">
              <p><strong>🎤 Artist:</strong> {purposal.artist?.name || "Unknown"}</p>
              <p><strong>🏢 Promoter:</strong> {purposal.promoter?.name || "Unknown"}</p>
              <p><strong>📅 Event Date:</strong> {formatDate(purposal.eventDate)}</p>
              <p><strong>💬 Notes:</strong> {purposal.notes || "No additional notes"}</p>
              <p><strong>💰 Offer:</strong> {purposal.negotiatedPrice ? `${purposal.negotiatedPrice} €` : "Not set"}</p>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0 mt-4">
              {currentUser.role === "promoter" && (
                <Link to={`/edit/purposals/${purposal.id}`} className="w-full lg:w-auto">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all w-full">
                    Editar
                  </button>
                </Link>
              )}
              <DeletePurposal id={id} chatId={chatId} />
            </div>
          </div>

          <div className="rounded-lg border border-gray-300 dark:border-gray-700 shadow-md overflow-hidden h-full flex items-center justify-center">
            <Chat chatId={chatId} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PurposalDetail;
