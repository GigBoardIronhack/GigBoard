/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import DeletePurposal from "../../pages/PurposalPages/DeletePurposal";
import PurposalEditAgency from "../../pages/AgencyPages/PurposalEditAgency";

const WidePurposalCard = ({ card, setNeedRefresh }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.promoter === currentUser.id;
  const fecha = card.eventDate.split("T")[0];

  // Determinar color de fondo/borde según el estado
  const statusStyles = {
    pending: "bg-yellow-100 border-yellow-500",
    accepted: "bg-green-100 border-green-500",
    rejected: "bg-red-100 border-red-500",
  };

  return (
    <div className={`container flex flex-col w-full shadow-medium p-4 justify-center items-center mb-4 lg:w-full lg:min-h-[120px] lg:flex-row rounded-small border-2 ${statusStyles[card.status] || "bg-white border-gray-300"}`}>
      
      <div className="w-full lg:w-1/5 flex justify-center items-center overflow-hidden rounded-lg">
        <img
          className="w-3/4 object-cover rounded-lg"
          src={card?.artist?.imageUrl}
          alt={card?.artist?.name}
        />
      </div>

      <div className="text-center flex flex-col justify-center items-center w-full lg:w-3/6">
        <div className="flex flex-wrap justify-center items-center space-x-2 w-full mt-3 lg:justify-start">
          <p className="text-gray-700 dark:text-gray-300 font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[40%] text-center">
            {card.promoter?.name || "Promotor Desconocido"}
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
          >
            <path d="M10 17l5-5-5-5v10z" />
          </svg>

          <p className="text-gray-700 dark:text-gray-300 font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[40%] text-center">
            {card.artist?.name || "Artista Desconocido"}
          </p>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{fecha}</p>
      </div>

      <div className="w-full lg:w-2/6 p-0 flex flex-col justify-between h-full">
        <div className="flex justify-center items-center lg:justify-end space-x-2 h-full w-full">
          {currentUser.role === "agency" && (
            <div className="w-full flex justify-center lg:justify-start">
              <PurposalEditAgency
                id={card.id}
                setNeedRefresh={setNeedRefresh}
              />
            </div>
          )}

          {isOwner && (
            <div className="w-full flex justify-center items-center space-x-2 mt-2 lg:mt-0">
              <div className="w-1/2 flex justify-center">
                <Link to={`/edit/purposals/${card.id}`} className="w-full">
                  <button className="bg-[#036AD7] text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-[#0593E3] hover:text-black transition flex items-center justify-center w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    <div className="block lg:hidden w-full">
                      <p>Edit Purposal</p>
                    </div>
                  </button>
                </Link>
              </div>

              <div className="w-1/2 flex justify-center">
                <DeletePurposal id={card.id} setNeedRefresh={setNeedRefresh} />
              </div>
            </div>
          )}
        </div>

        <Link
          to={`/purposals/${card.id}/${card.purposalChat}`}
          className="mt-2"
        >
          <button className="bg-[#15d703] text-white w-full px-4 py-2 rounded-full font-medium shadow-md hover:bg-[#69e305] hover:text-black transition flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12H8.009M11.991 12H12M15.991 12H16"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span className="ml-2 text-base">Chat</span>
          </button>
        </Link>
      </div>
    </div>
  );
};


export default WidePurposalCard;
