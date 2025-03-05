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
  return (
    <>
    <div>
      <div className="flex flex-col p-4  lg:min-h-[120px] lg:row-span-2 lg:flex-row justify-around shadow-medium rounded-small">
        <div className="flex flex-col py-4 items-center justify-center p-2">
          <div className="flex flex-col lg:flex-row ">
            <div >
            {currentUser.role === "promoter" && (
                <p>propuesta para</p>
              )}
              <p className="w-20 lg:w-20   overflow-hidden text-ellipsis whitespace-nowrap">{card?.promoter?.name}</p>
              
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path d="M10 17l5-5-5-5v10z" />
              </svg>
            </div>
            <div className="text-center ">
              <p className="w-60 lg:w-40  overflow-hidden text-ellipsis whitespace-nowrap">{card?.artist?.name}</p>
            </div>
          </div>

          <div>
            <p>{fecha}</p>
          </div>
        </div>

        <div className="flex flex-col  lg-flex-row lg:flex-row justify-around  items-center">
          <div className="w-full">
          
            <Link to={`/purposals/${card.id}/${card.purposalChat}`}></Link>


            {currentUser.role === "agency" ? (
              <div className=" flex items-center">

              <PurposalEditAgency
                id={card.id}
                setNeedRefresh={setNeedRefresh}
              />
              </div>
            ) : isOwner ? (
              <div className="flex flex-col lg:flex-row justify-around">
              <div>
                <Link to={`/edit/purposals/${card.id}`}>
                  <button
                    className="bg-[#D76A03]  text-white mb-2 px-4 py-4 w-full rounded-full font-medium shadow-md hover:bg-[#E3B505] hover:text-black transition 
                    lg:mb-0"
                  >
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
                    

                    <p className="lg:hidden  ">Editar</p>
                  </button>
                </Link>
                </div>
                <div>

                        <DeletePurposal id={card.id} />
                </div>
              </div>
            ): null}
          </div>
          <div className=" flex flex-col lg:flex-row w-full lg:w-auto justify-around p-0">
            <Link to={`/purposals/${card.id}/${card.purposalChat}`}>
            <div>
              <button
                className="bg-[#15d703] text-white mb-2 px-3 py-3 lg:px-4 lg:py-4 w-full rounded-full font-medium shadow-md hover:bg-[#69e305] hover:text-black transition 
                    lg:mb-0"
              >
                <svg
                  className="w-4 hidden lg:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 12H8.009M11.991 12H12M15.991 12H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <p className="lg:hidden w-full">Chat</p>
              </button>
                </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
</>
  );
};


export default WidePurposalCard;
