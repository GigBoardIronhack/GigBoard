/* eslint-disable react/no-unescaped-entities */
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
        return { title: "Artists", link: "/artists" };
      case "purposals":
      case "widePurposals":
        return { title: "Purposals", link: "/purposals" };
      default:
        return { title: "", link: "#" };
    }
  };

  const { title, link } = getTitle();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">
        <Link to={link}>{title}</Link>
      </h1>

      {cards.length === 0 && (
        <p className="text-center text-gray-500 lg:mt-10">
          You don't have any {title.toLowerCase()} yet 😢 
        </p>
      )}

      <div
        className={`${
          type === "artists"
            ? "grid grid-cols-1 lg:grid-cols-4 gap-4 justify-items-center"
            : "flex flex-col gap-4 items-center"
        } p-4 mt-10 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200`}
      >
        {type === "artists" &&
          cards
            .slice(0, 9)
            .map((card, index) => <ArtistCard key={index} card={card} />)}

        {type === "purposals" &&
          cards.map((card, index) => (
            <PurposalCard
              key={index}
              card={card}
              setNeedRefresh={setNeedRefresh}
            />
          ))}

        {type === "wideArtists" &&
          cards.map((card, index) => (

            <WideArtistCard key={index} card={card} />

          ))}

        {type === "widePurposals" &&
          cards.map((card, index) => (

            <WidePurposalCard
              key={index}
              card={card}
              setNeedRefresh={setNeedRefresh}
            />

          ))}
      </div>
    </div>
  );
};

export default CardGrid;
