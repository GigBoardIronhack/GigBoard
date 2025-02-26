/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteArtist from "../../pages/ArtistPages/DeleteArtist";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const WideArtistCard = ({ card }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.agency === currentUser.id;

  return (
    <div className="max-w-4xl w-full bg-white dark:bg-[#002846] shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
      {/* Imagen */}
      <Link to={`/artists/${card.id}`} className="w-full md:w-1/3">
        <img 
          src={card.imageUrl} 
          alt={card.name} 
          className="w-full h-48 md:h-auto object-cover"
        />
      </Link>

      {/* Contenido */}
      <div className="p-6 flex flex-col justify-between flex-1">
        {/* Nombre del artista */}
        <Link to={`/artists/${card.id}`} className="text-2xl font-semibold text-[#8E44AD] dark:text-[#F1C40F] hover:underline">
          {card.name}
        </Link>

        {/* Estilos */}
        <p className="text-gray-600 dark:text-[#1ABC9C] mt-2">
          {card.style.toString().split(",").join(" | ")}
        </p>

        {/* Botones para dueños */}
        {isOwner && (
          <div className="mt-4 flex gap-4">
            <Link to={`/artists/edit/${card.id}`}>
              <button className="bg-[#1ABC9C] text-white dark:bg-[#F1C40F] dark:text-black px-4 py-2 rounded-lg font-medium shadow-md hover:bg-[#8E44AD] dark:hover:bg-[#8E44AD] transition">
                Editar
              </button>
            </Link>
            <DeleteArtist id={card.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WideArtistCard;
