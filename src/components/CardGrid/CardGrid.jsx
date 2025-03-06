/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ArtistCard from "../Cards/ArtistCard";
import PurposalCard from "../Cards/PurposalCard";
import WideArtistCard from "../Cards/WideArtistCard";
import WidePurposalCard from "../Cards/WidePurposalCard";

const CardGrid = ({ cards, type, setNeedRefresh }) => {
  console.log("Cards recibidos en CardGrid:", cards);
  console.log("setNeedRefresh en CardGrid:", setNeedRefresh); 

  const getTitle = () => {
    switch (type) {
      case "artists":
      case "wideArtists":
        return { title: "Artistas", link: "/artists" };
      case "purposals":
      case "widePurposals":
        return { title: "Propuestas", link: "/purposals" };
      default:
        return { title: "", link: "#" };
    }
  };

  const { title, link } = getTitle();

  return (
    <div>
      {cards.length > 0 && (
        <h1 className="text-2xl font-bold text-center mb-4">
          <Link to={link}>{title}</Link>
        </h1>
      )}

      <div className="overflow-y-auto max-h-[600px] flex flex-col gap-4 p-4 mt-10 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {type === "artists" &&
          cards.map((card, index) => (
            <div key={index} className="flex-shrink-0">
              <ArtistCard card={card} />
            </div>
          ))}

        {type === "purposals" &&
          cards.map((card, index) => (
            <div key={index} className="flex-shrink-0">
              <PurposalCard card={card} setNeedRefresh={setNeedRefresh} />
            </div>
          ))}

        {type === "wideArtists" &&
          cards.map((card, index) => (
            <div key={index} className="flex-shrink-0">
              <WideArtistCard card={card} setNeedRefresh={setNeedRefresh} />
            </div>
          ))}

        {type === "widePurposals" &&
          cards.map((card, index) => (
            <div key={index} className="flex-shrink-0">
              <WidePurposalCard card={card} setNeedRefresh={setNeedRefresh} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardGrid;
