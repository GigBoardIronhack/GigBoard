import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPurposal } from "../../services/purposal.service";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import DeletePurposal from "./DeletePurposal";

const PurposalDetail = () => {
  const [purposal, setPurposal] = useState({});
  const { id } = useParams();
  const { chatId } =useParams();
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
      <div>
        <Link to={`/edit/purposals/${purposal.id}`} isEditing>
          <button>Editar</button>
        </Link>
        <Chat chatId={chatId} />
        <DeletePurposal id={id} chatId={chatId}/>
      </div>
      )}
    </div>
  );
};

export default PurposalDetail;
