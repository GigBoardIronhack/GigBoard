/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import ArtistCard from "../Cards/ArtistCard"
import PurposalCard from "../Cards/PurposalCard"
import WideArtistCard from "../Cards/WideArtistCard"
import WidePurposalCard from "../Cards/WidePurposalCard"

const CardGrid = ({ cards, type, setNeedRefresh }) => {
  console.log("Cards recibidos en CardGrid:", cards);

  return (
    <div className="overflow-y-auto max-h-[600px] flex flex-col gap-4 p-4 mt-10 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
    

      {type === "artists" &&
        cards.map((card, index) => (
            <>
            <h1>Artists</h1>
          <div key={index} className="flex-shrink-0">
            <ArtistCard card={card} />
          </div>
            </>
        ))
      }
      {type === "purposals" &&
        cards.map((card, index) => (
          <div key={index} className="flex-shrink-0">
            <PurposalCard card={card} setNeedRefresh={setNeedRefresh} />
          </div>
        ))
      }
      {type === "wideArtists" &&
        cards.map((card, index) => (
          <Link to={`/artists/${card.id}`} key={index} className="flex-shrink-0">
            <div className="flex md:min-w-[120px] md:flex-row md:w-full lg:w-full">
              <WideArtistCard card={card} />
            </div>
          </Link>
        ))
      }
      {type === "widePurposals" &&
        cards.map((card, index) => (
          <div key={index} className="flex-shrink-0">
            <WidePurposalCard card={card} />
          </div>
        ))
      }
    </div>
  )
}

export default CardGrid