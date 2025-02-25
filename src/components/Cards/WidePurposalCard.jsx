/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import DeletePurposal from "../../pages/PurposalPages/DeletePurposal";

const WidePurposalCard = ({ card }) => {
    const { currentUser } = useContext(AuthContext);
    const isOwner = currentUser && card.promoter === currentUser.id;
  console.log(card);
  return (
    <div>
      <h1>Purposals</h1>
    <Link to={`/purposals/${card.id}/${card.purposalChat}`}>
      <p>Propuesta para {card?.artist?.name}</p>
    </Link>
    {isOwner && (
      <>
        <Link to={`/edit/purposals/${card.id}/${card.purposalChat}`}>
          <button>Editar</button>
        </Link>
        <DeletePurposal id={card.id} />
      </>
    )}
    </div>
  );
};

export default WidePurposalCard;
