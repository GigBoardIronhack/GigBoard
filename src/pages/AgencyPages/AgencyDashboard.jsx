import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import LinkCreateArtist from "../../components/LinkCreateArtist/LinkCreateArtist";
import CardGrid from "../../components/CardGrid/CardGrid";
import { listAgencyPurposals } from "../../services/agency.service";
import { Link } from "react-router-dom";

const AgencyDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [agencyPurposals, setAgencyPurposals] = useState([]);

  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const agencyPurposals = await listAgencyPurposals();
        setAgencyPurposals(Array.isArray(agencyPurposals) ? agencyPurposals : []);
        console.log("PURPOSALS AGENCY", agencyPurposals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPurposal();
  }, []);

  return (
    <div className="grid grid-cols-1 grid-rows-[50px_1/2fr_1fr_1fr] lg:grid-rows-[auto_1fr_1fr_1fr] lg:grid-cols-5 gap-2 lg:gap-4 w-full h-full mx-auto p-4">

      <div className="text-center border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-span-5">
        <h1 className="text-2xl lg:text-4xl font-bold uppercase dark:text-white mb-1">Agency Dashboard</h1>
      </div>
  
      <div className="flex flex-col items-center gap-2 border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-start-3 lg:row-span-2 lg:row-start-2">
        
        <h2 className="text-lg lg:text-xl font-semibold dark:text-gray-300 mb-1">{currentUser.name}</h2>
  
        <img 
          src={currentUser.imageUrl || "/default-user.png"} 
          alt="User profile"
          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm"
        />
  
        <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">CIF: {currentUser.cif}</p>
  
        <p className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300">
          Actualmente tienes <span className="font-bold">{currentUser.artists.length}</span> artistas
        </p>
  
        <LinkCreateArtist className="w-full max-w-xs" />
  
        <Link to={"/edit"} className="text-blue-500 hover:underline">Editar Usuario</Link>
      </div>
      <Link to={"/artists"} className="lg:col-span-2 lg:row-span-3 lg:row-start-2">

      <div className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-span-2 lg:row-span-3 lg:row-start-2">
        <CardGrid type="wideArtists" cards={currentUser.artists} />
      </div>
      </Link>
      <Link to={"/purposals"} className="lg:col-span-2 lg:row-span-3 lg:row-start-2">

      <div className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-span-2 lg:row-span-3 lg:col-start-4 lg:row-start-2">
        <CardGrid type="widePurposals" cards={agencyPurposals} />
      </div>
      </Link>
  
    </div>
  );
  
  
  
  
  
  
};

export default AgencyDashboard;
