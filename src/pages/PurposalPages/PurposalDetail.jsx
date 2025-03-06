import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPurposal } from "../../services/purposal.service";
import Chat from "../../components/Chat/Chat";
import DeletePurposal from "./DeletePurposal";
import { AuthContext } from "../../contexts/AuthContext";

const PurposalDetail = () => {
  const [purposal, setPurposal] = useState({});
  const { id } = useParams();
  const { chatId } = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getPurposalId = async () => {
      try {
        const purposal = await getPurposal(id);
        console.log(purposal);
        setPurposal(purposal);
      } catch (err) {
        console.log(err);
      }
    };
    getPurposalId();
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Contenedor principal con 80% de la altura y ancho */}
      <div className="w-4/5 h-[80vh] grid grid-cols-1 lg:grid-cols-2 grid-rows-5 gap-4">

        {/* 📌 Sección de detalles de la propuesta */}
        <div className="row-span-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Purposal Details
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Event Date:</strong> {purposal.eventDate}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Notes:</strong> {purposal.notes}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Offer:</strong> {purposal.negotiatedPrice} €
          </p>

          {purposal.promoter && (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Promoter:</strong> {purposal.promoter.name}
            </p>
          )}
          {purposal.artist && (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Artist:</strong> {purposal.artist.name}
            </p>
          )}

          {/* ⚙️ Acciones */}
          {purposal?.id && (
            <div className="flex flex-col items-center gap-4 mt-4">
              {currentUser.role === "promoter" && (
                <Link to={`/edit/purposals/${purposal.id}`} isEditing>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all">
                    Editar
                  </button>
                </Link>
              )}
              <DeletePurposal id={id} chatId={chatId} />
            </div>
          )}
        </div>

          <Chat chatId={chatId} />
       

      </div>
    </div>
  );
};

export default PurposalDetail;
