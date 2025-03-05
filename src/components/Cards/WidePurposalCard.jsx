/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import DeletePurposal from "../../pages/PurposalPages/DeletePurposal";

import PurposalEditAgency from "../../pages/AgencyPages/PurposalEditAgency";

const WidePurposalCard = ({ card, setNeedRefresh }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.promoter === currentUser.id;
  return (
    <div >
      <h1>Purposals</h1>
      <Link to={`/purposals/${card.id}/${card.purposalChat}`}>
        <p>Propuesta para {card?.artist?.name}</p>
      </Link>
      {isOwner && (
        <>
          <Link to={`/edit/purposals/${card.id}/${card.purposalChat}`}>
            <button>Editar</button>
          </Link>
          <Link to={`/purposals/${card.id}/${card.purposalChat}`}>
            <button>Detalle</button>
          </Link>

          <DeletePurposal id={card.id} />
        </>
      )}

      <div className="flex flex-col  lg:row-span-2 lg:flex-row shadow-medium rounded ">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div>
                music-promoter
              </div>
              <div>
                flecha
              </div>
              <div>
              artist
              </div>
            </div>



            <div>
              fecha
            </div>
          </div>





          <div>
            <div>
              gestion
            </div>
            <div>
               chat
            </div>
          </div> 
      </div>
      
    </div>
  );
};

export default WidePurposalCard;
