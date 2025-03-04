/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteArtist from "../../pages/ArtistPages/DeleteArtist";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";

const WideArtistCard = ({ card }) => {
  const { currentUser } = useContext(AuthContext);
  const isOwner = currentUser && card.agency === currentUser.id;

  return (
    <>
      <Card className="container flex flex-col sm:flex-row justify-center items-center sm:h-50 lg:w-full mb-4">
        <CardHeader
          className="md:w-1/3 md:h-auto bg-cover bg-center"
          floated={false}
        >
          <img
            className="h-auto sm:w-40 sm:h-20 bg-cover w-full object-cover"
            src={card.imageUrl}
            alt={card.name}
          />
        </CardHeader>
        <CardBody className="text-center flex justify-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {card?.name}
          </Typography>
        </CardBody>
        <CardBody className="w-full p-0">
          {isOwner && (
            <div className="flex flex-col w-full md:flex-row justify-around content-around">
              <div className="w-full flex flex-col md:flex-row justify-around md:justify-start lg:justify-end">
                <Link to={`/artists/edit/${card.id}`}>
                  <Button
                    fullWidth={true}
                    className="bg-[#D76A03] mb-2 text-white px-4 py-2 w-full rounded-full font-medium shadow-md hover:bg-[#E3B505] hover:text-black transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 hidden md:block"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                      <div >
                        <p className="block md:hidden w-full">editar</p>
                      </div>
                    
                  </Button>
                </Link>
                <DeleteArtist id={card.id} />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default WideArtistCard;
