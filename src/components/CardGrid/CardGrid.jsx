/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import ArtistCard from "../Cards/ArtistCard"
import PurposalCard from "../Cards/PurposalCard"
import WideArtistCard from "../Cards/WideArtistCard"
import WidePurposalCard from "../Cards/WidePurposalCard"


const CardGrid = ( { cards, type, setNeedRefresh } ) => {
    console.log("Cards recibidos en CardGrid:", cards); 
   
  return (
    <div>
    {type === "artists" && 
        cards.map((card, index)=>(
            
            <div key={index} className="container flex mb-4">
                <ArtistCard  card={card}/>
            </div>
        ))
    }{type === "purposals" && 
        cards.map((card, index)=>(
            <div key={index}>
            
                <PurposalCard card={card} setNeedRefresh={setNeedRefresh}/>
            </div>
        ))
    }
    {type === "wideArtists" && 
        cards.slice(0,5).map((card, index)=>(
            <Link to={`/artists/${card.id}`} key={index}> 
            
            <div key={index} className="container flex mb-4 md:min-w-[120px] md:flex-row md:w-full lg:w-full">
            
                <WideArtistCard card={card}/>
            </div>
            </Link>
        ))
    }{type === "widePurposals" && 
        cards.map((card, index)=>(
            <div key={index}>
                
                <WidePurposalCard card={card}/>
            </div>
        ))
    }
    
    </div>
  )
}

export default CardGrid
