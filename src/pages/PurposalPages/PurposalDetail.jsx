import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPurposal } from "../../services/purposal.service";
import { Link } from "react-router-dom";

const PurposalDetail = () => {
  const [purposal, setPurposal] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getPurposalId = async () => {
      try {
        const purposal = await getPurposal(id);
        console.log(purposal)
        setPurposal(purposal);
      } catch (err) {
        console.log(err);
      }
    };
    getPurposalId();
  }, [id]);
  return (
    <div key={purposal.id}>
      <h1>Detalle purposal</h1>
      <p>Event Date: {purposal.eventDate} </p>
      <p>Nota: {purposal.notes} </p>
      <p>negociated price: {purposal.negotiatedPrice} </p>
      
      {purposal.promoter &&
      <p>promotor:  {purposal.promoter.name}</p>
      }
      {purposal.artist && 
        <p>artist:  {purposal.artist.name}</p>
      }
      
      {purposal?.id && (
        <Link to={`/edit/purposals/${purposal.id}`}>
          <button>Editar</button>
        </Link>
      )}
    </div>
  );
};

export default PurposalDetail;
