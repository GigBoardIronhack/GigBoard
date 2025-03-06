/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteArtist from "../../pages/ArtistPages/DeleteArtist";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Button,
} from "@material-tailwind/react";

const WideArtistCard = ({ card }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.agency === currentUser.id;

  return (
    <>
      <div className="container  flex flex-col w-full shadow-medium  p-4 justify-center items-center mb-4
       lg:w-full lg:min-h-[120px]  lg:flex-row rounded-small">
        <div
          className=" bg-cover bg-center overflow-hidden rounded-lg"
        >
          <img
            className="h-auto p-2  bg-cover rounded-lg w-full object-cover"
            src={card.imageUrl}
            alt={card.name}
          />
        </div>
        <div className="text-center flex justify-center items-center flex-col w-full lg:w-1/3">
          <div  color="blue-gray" className="mb-2 m-0 w-2/3">
           <h2 className="pt-2 overflow-hidden text-ellipsis whitespace-nowrap">{card?.name}</h2> 
          </div>
          <div className="pb-2">
          <p>{card.style.toString().split(",").join(" | ")}</p>
          </div>
        </div>
        <div className="w-full p-0">
          {isOwner && (
              <div className="w-full flex flex-col lg:flex-row justify-around lg:justify-end">
                <Link to={`/artists/edit/${card.id}`}>
                  <Button
                    className="bg-[#D76A03] text-white mb-2 px-4 py-4 w-full rounded-full font-medium shadow-md hover:bg-[#E3B505] hover:text-black transition 
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
                      <div >
                        <p className="block lg:hidden w-full">editar</p>
                      </div>
                    
                  </Button>
                </Link>
                <DeleteArtist id={card.id} />
                
              </div>
            
          )}
        </div>
      </div>
    </>
  );
};

export default WideArtistCard;
