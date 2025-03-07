/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import DeletePurposal from "../../pages/PurposalPages/DeletePurposal";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const PurposalCard = ({ card, setNeedRefresh }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.promoter === currentUser.id;
  const [isHovered, setIsHovered] = useState(false);
  const fecha = card.eventDate.split("T")[0];

  // Estilos según el estado de la propuesta
  const statusStyles = {
    pending: "border-yellow-500 bg-yellow-100",
    accepted: "border-green-500 bg-green-100",
    rejected: "border-red-500 bg-red-100",
  };

  return (
    <div
      className={`relative group w-64 rounded-lg overflow-hidden shadow-lg border-2 ${statusStyles[card.status] || "border-gray-300 bg-white"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <Link to={`/purposals/${card.id}/${card.purposalChat}`} className="block relative">
        <div className="overflow-hidden">
          <img
            src={card.artist?.imageUrl || "/default-placeholder.png"}
            alt={card.artist?.name || "Unknown Artist"}
            className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="p-4 text-center">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
            {card.artist?.name || "Unknown Artist"}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{fecha}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-1">
            Negotiated Price:{" "}
            <span className="font-bold">
              {card.negotiatedPrice ? `$${card.negotiatedPrice}` : "Not Defined"}
            </span>
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

          >
            <Link to={`/edit/purposals/${card.id}`}>
              <button className="bg-[#036AD7] text-white px-3 py-2 rounded-full font-medium shadow-md hover:bg-[#0593E3] hover:text-black transition flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <DeletePurposal id={card.id} setNeedRefresh={setNeedRefresh} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PurposalCard;
