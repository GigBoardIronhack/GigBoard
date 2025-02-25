import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { listPromoterPurposals } from "../../services/promoter.service";
import { Link } from "react-router-dom";
import { listAgencyPurposals } from "../../services/agency.service";

const PurposalCard = () => {
    const {currentUser} = useContext(AuthContext)
    console.log("CURRENTUSER",currentUser)
  const [promoterPurposals, setPromoterPurposals] = useState([]);
  const [agencyPurposals, setAgencyPurposals]= useState([])

  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const agencyPurposals = await listAgencyPurposals();
        setAgencyPurposals(Array.isArray(agencyPurposals) ? agencyPurposals : []);
        console.log("PURPOSALSS AGENCY", agencyPurposals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPurposal();
  }, []);


  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const promoterPurposals = await listPromoterPurposals();
        setPromoterPurposals(Array.isArray(promoterPurposals) ? promoterPurposals : []);
        console.log("PURPOSALSS", promoterPurposals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPurposal();
  }, []);

  return (
    <div>
      <h2>Purposals</h2>
    {currentUser.role === "promoter" ? ( 
      promoterPurposals &&
        promoterPurposals.map((purposal) => (
          <div key={purposal.id}>
            <h2>{purposal.artist?.name}</h2>
            <img src={purposal.artist.imageUrl} alt={purposal.artist.name} />
            <Link to={`/edit/purposals/${purposal.id}`}>
              <button>Editar</button>
            </Link>
            <Link to={`/purposals/${purposal.id}/${purposal.purposalChat}`}>
              <button>Detalle</button>
            </Link>
          </div>
        ))
    ) : (
        agencyPurposals && (
            agencyPurposals.map((purposal)=>(
                <div key={agencyPurposals.id}>
                <h2>{purposal.artist?.name}</h2>
                <img src={purposal.artist.imageUrl} alt={purposal.artist.name} />
                <Link to={`/edit/purposals/${purposal.id}`}>
                <button>Editar</button>
                </Link>
                <Link to={`/purposals/${purposal.id}/${purposal.purposalChat}`}>
                <button>Detalle</button>
                </Link>
                </div>
            ))
        )
    )
    } 
    </div>
  );
};

export default PurposalCard;
