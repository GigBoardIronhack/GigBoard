/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ArtistCard from "../Cards/ArtistCard";
import PurposalCard from "../Cards/PurposalCard";
import WideArtistCard from "../Cards/WideArtistCard";
import WidePurposalCard from "../Cards/WidePurposalCard";

const CardGrid = ({ cards, type, setNeedRefresh }) => {
  console.log("Cards recibidos en CardGrid:", cards);

  const getTitle = () => {
    switch (type) {
      case "artists":
        return "Artistas";
      case "purposals":
        return "Propuestas";
      case "wideArtists":
        return "Artistas";
      case "widePurposals":
        return "Propuestas";
      default:
        return "";
    }
  };

  return (
    <div>

      {cards.length > 0 && (
        <h1 className="text-2xl font-bold text-center mb-4">{getTitle()}</h1>
      )}
      
      <div className="overflow-y-auto max-h-[600px] flex flex-col gap-4 p-4 mt-10 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">

      {type === "artists" &&
        cards.map((card, index) => (
          <div key={index} className="flex-shrink-0">
            <ArtistCard card={card} />
          </div>
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
    </div>
  );
};

export default CardGrid;
