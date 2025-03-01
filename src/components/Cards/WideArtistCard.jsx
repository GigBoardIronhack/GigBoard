/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteArtist from "../../pages/ArtistPages/DeleteArtist";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const WideArtistCard = ({ card }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.agency === currentUser.id;

  return (
    <div className="max-w-4xl w-full bg-[#004E64] shadow-lg rounded-2xl overflow-hidden grid gap-2
      grid-cols-1 grid-rows-4 
      md:grid-cols-2 md:grid-rows-2 
      lg:grid-cols-3 lg:grid-rows-2">
      
      <Link to={`/artists/${card.id}`} className="row-span-2 md:row-span-2 lg:row-span-2">
        <img 
          src={card.imageUrl} 
          alt={card.name} 
          className="w-full h-48 md:h-auto md:aspect-square object-cover rounded-lg"
        />
      </Link>

      <div className="p-6 text-white row-start-3 md:row-auto lg:row-span-2 justify-center text-center lg:text-left lg:col-span-2">

        <Link to={`/artists/${card.id}`} className="text-2xl font-semibold text-[#E3B505] hover:underline">
          {card.name}
        </Link>

        <p className="mt-2">
          {card.style.toString().split(",").join(" | ")}
        </p>
      </div>

      {isOwner && (
        <div className="flex flex-col md:flex-row gap-4 row-start-4 md:col-start-2 lg:row-span-2">
          <div className="w-full flex justify-around md:justify-start lg:justify-end">
            <Link to={`/artists/edit/${card.id}`}>
              <button className="bg-[#D76A03] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-[#E3B505] hover:text-black transition">
                Editar
              </button>
            </Link>
            <DeleteArtist id={card.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WideArtistCard;
