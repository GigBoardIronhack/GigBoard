/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import PurposalEditAgency from "../../pages/AgencyPages/PurposalEditAgency"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"


const PurposalCard = ({card}) => {
  const {currentUser} = useContext(AuthContext)
  console.log("LA TARHETITTTTTAAA", card)
  
  return (
  <div>
      <h2>{card?.artist?.name}</h2>
      <img src={card.artist.imageUrl} alt={card.artist.name} />
      
      <Link to={`/purposals/${card.id}/${card.purposalChat}`}>
        <button>Chat</button>
      </Link>
       {currentUser.role === "agency" ?
      <PurposalEditAgency id={card.id}/>
      :
      <Link to={`/edit/purposals/${card.id}`}>
        <button>Editar</button>
      </Link>
       }
  </div>

  )
}

export default PurposalCard