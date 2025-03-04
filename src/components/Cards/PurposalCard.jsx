/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import PurposalEditAgency from "../../pages/AgencyPages/PurposalEditAgency";
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

const PurposalCard = ({ card, setNeedRefresh }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("LA TARHETITTTTTAAA", card);

  return (
    <>
    <div className="container flex flex-col items-center">
      <div>
        <h2 >{card?.artist?.name}</h2>
      </div>
      <div>
        <img src={card.artist.imageUrl} alt={card.artist.name} />
      </div>
      <div className="flex flex-row">
        <div>
          <Link to={`/purposals/${card.id}/${card.purposalChat}`}>
            <button>Chat</button>
          </Link>
        </div>
        <div>
          {currentUser.role === "agency" ? (
            <PurposalEditAgency id={card.id} setNeedRefresh={setNeedRefresh} />
          ) : (
            <Link to={`/edit/purposals/${card.id}`}>
              <button>Editar</button>
            </Link>
          )}
        </div>
      </div>
    </div>
    <Card className="container flex flex-col sm:flex-row justify-center items-center">
      <CardHeader floated={false}>
        <img className="w-full h-auto sm:w-40 sm:h-40md:max-w-md"  src={card.artist.imageUrl} alt={card.artist.name} />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray"  className="mb-2 md:hidden">
        {card?.artist?.name}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href={card.artist.rrss.facebook}
            variant="lead"
            color="blue"
            target="blank"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href={card.artist.rrss.twitter}
            variant="lead"
            color="light-blue"
            target="blank"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href={card.artist.rrss.instagram}
            variant="lead"
            target="blank"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
     <CardFooter className="flex flex-col sm:flex-row justify-between">
      {currentUser.role === "agency" ? (
            <PurposalEditAgency id={card.id} setNeedRefresh={setNeedRefresh} />
          ) : (
      <CardFooter className="p-2 flex flex-row justify-center">
           <Link to={`/edit/purposals/${card.id}`}>
        <Button
          ripple={false}
          
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >Editar purosal
             
        </Button>
            </Link>
      </CardFooter>
      )}
      <CardFooter className="p-2 flex flex-row justify-center">
      <Link to={`/purposals/${card.id}/${card.purposalChat}`}>
      <Button
          ripple={false}
          
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >Chat
        </Button>
          </Link>
      </CardFooter>
      </CardFooter>
    </Card>
    </>
  );
};

export default PurposalCard;




    
