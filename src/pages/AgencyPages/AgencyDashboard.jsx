import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import LinkCreateArtist from "../../components/LinkCreateArtist/LinkCreateArtist";
import CardGrid from "../../components/CardGrid/CardGrid";
import { listAgencyPurposals } from "../../services/agency.service";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AgencyDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [agencyPurposals, setAgencyPurposals] = useState([]);

  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const agencyPurposals = await listAgencyPurposals();
        setAgencyPurposals(
          Array.isArray(agencyPurposals) ? agencyPurposals : []
        );
        console.log("PURPOSALSS AGENCY", agencyPurposals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPurposal();
  }, []);

  return (
    <>
      <div className=" container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-3 gap-4 w-3/4">
        <div className="sm:row-span-1 md:col-start-1  lg:col-start-3  dark:bg-gray-800 dark:text-white">
          <h1> Agency Dashboard</h1>
          <h2>hola {currentUser.name}</h2>
          <h3>eres {currentUser.role}</h3>
          <h4>tienes : {currentUser.artists.length} artistas</h4>
          <LinkCreateArtist className="w-full"/>



          <Link to={"/edit"}>Editar Usuario</Link>
        </div>
        <div className="row-span-1 lg:row-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-1">
          <CardGrid type="wideArtists" cards={currentUser.artists} />
        </div>
        <div className="row-span-1 lg:row-span-2 lg:col-span-2 lg:col-start-4 lg:row-start-1">
          <CardGrid type="widePurposals" cards={agencyPurposals} />
        </div>
      </div>
    </>
  );
};

export default AgencyDashboard;
