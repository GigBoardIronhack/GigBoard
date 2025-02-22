import ArtistCard from "../Cards/ArtistCard"
import PurposalCard from "../Cards/PurposalCard"
import WideArtistCard from "../Cards/WideArtistCard"
import WidePurposalCard from "../Cards/WidePurposalCard"

const CardGrid = ( {cards, type} ) => {


  return (
    <div>
    {type === "artists" && 
        cards.map((card, index)=>(
            <div key={index}>
            {console.log("carddddddddddddddd",card)}
                <ArtistCard  card={card}/>
            </div>
        ))
    }{type === "purposals" && 
        cards.map((card, index)=>(
            <div key={index}>
            
                <PurposalCard card={card}/>
            </div>
        ))
    }
    {type === "wideArtists" && 
        cards.map((card, index)=>(
            <div key={index}>
            
                <WideArtistCard card={card}/>
            </div>
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
