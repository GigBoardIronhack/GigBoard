/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteArtist from "../../pages/ArtistPages/DeleteArtist";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import MyArtistSkeleton from "../Skeleton/MyArtistSkeleton";

const ArtistCard = ({ card }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.agency === currentUser.id;
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading]=useState(true)

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      setIsLoading(false);
    }
  }, [currentUser]);
  
  if (isLoading) {
    return <MyArtistSkeleton />;
  }



  return (
    <div
      className="relative group w-64 rounded-lg overflow-hidden shadow-lg bg-white bg-opacity-60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/artists/${card.id}`} className="block relative">
        <div className="overflow-hidden">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4 text-center">
          <h1 className="text-lg font-semibold">{card.name}</h1>
          <p className="text-sm text-gray-600">
            {card.style.toString().split(",").join(" | ")}
          </p>
        </div>
      </Link>

      {isOwner && (
        <div
          className="absolute top-2 right-2 flex space-x-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full lg:col-span-2 lg:row-span-3 lg:row-start-2"
          >
            <Link to={`/artists/edit/${card.id}`}>
              <Button className="bg-[#036AD7] text-white mb-2 px-4 py-4 w-full rounded-full font-medium shadow-md hover:bg-[#0593E3] hover:text-black transition lg:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 hidden lg:block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <p className="block lg:hidden w-full">Editar</p>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full lg:col-span-2 lg:row-span-3 lg:row-start-2"
          >
            <DeleteArtist id={card.id} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ArtistCard;
