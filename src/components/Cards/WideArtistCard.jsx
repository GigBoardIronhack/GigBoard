/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteArtist from "../../pages/ArtistPages/DeleteArtist";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const WideArtistCard = ({ card }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.agency === currentUser.id;

  return (
    <div>
      <Link to={`/artists/${card.id}`}>
        <h1>{card.name}</h1>
        <img src={card.imageUrl} alt={card.name} />
      </Link>
      {console.log(card.style)}
      <p>{card.style.toString().split(",").join(" | ")}</p>
      
      {isOwner && (
        <>
          <Link to={`/artists/edit/${card.id}`}>
            <button>Editar</button>
          </Link>
          <DeleteArtist id={card.id} />
        </>
      )}
    </div>
  );
};

export default WideArtistCard;
