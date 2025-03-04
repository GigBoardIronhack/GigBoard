/* eslint-disable react/prop-types */
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
