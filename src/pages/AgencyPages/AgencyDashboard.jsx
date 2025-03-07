import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import LinkCreateArtist from "../../components/LinkCreateArtist/LinkCreateArtist";
import CardGrid from "../../components/CardGrid/CardGrid";
import { listAgencyPurposals } from "../../services/agency.service";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardSkeleton from "../../components/Skeleton/DashboardSkeleton"

const AgencyDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [agencyPurposals, setAgencyPurposals] = useState([]);
  const [needRefresh, setNeedRefresh] = useState(true);
  const [isLoading, setIsLoading]=useState(true)


  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const agencyPurposals = await listAgencyPurposals();
        setAgencyPurposals(
          Array.isArray(agencyPurposals) ? agencyPurposals : []
        );
        setIsLoading(false)
        console.log("PURPOSALS AGENCY", agencyPurposals);
      } catch (err) {
        console.log(err);
      }
    };
    if (needRefresh) {
      fetchPurposal();
      
      setNeedRefresh(false);
    }
  }, [currentUser, needRefresh]);

  if (isLoading) {

    return <div className="h-screen bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b]">  <DashboardSkeleton /> </div>;
  }
  return (
    
    <div className="grid grid-cols-1 grid-rows-[50px_1/2fr_1fr_1fr] lg:grid-rows-[auto_1fr_1fr_1fr] lg:grid-cols-5 gap-2 lg:gap-4 w-full h-full mx-auto p-4 bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b]">
  
          
      <div className="text-center border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-span-5 bg-opacity-60">
        <h1 className="text-2xl lg:text-4xl font-bold uppercase  dark:text-white mb-1">
          Agency Dashboard
        </h1>
      </div>

      <div className="flex flex-col items-center gap-2 border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-start-3 lg:row-span-2 lg:row-start-2 bg-opacity-60">
        <h2 className="text-lg lg:text-xl font-semibold dark:text-gray-300 mb-1">
          {currentUser.name }
        </h2>

        <img
          src={currentUser.imageUrl || "/default-user.png"}
          alt="User profile"
          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm"
        />

        <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
          CIF: {currentUser.cif}
        </p>
        {currentUser.artists.length === 0 ? (
          <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
            Aún no has añadido artistas, añade tu primer Artista!!
          </p>
        ) : (
          <p className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300">
            Actualmente tienes{" "}
            <span className="font-bold">{currentUser.artists.length}</span>{" "}
            artistas
          </p>
        )}

        <LinkCreateArtist className="w-full max-w-xs" />


        <Link to="/edit">
          <div className="bg-[#7c3aed] text-white text-center mb-2 mt-2 px-4 py-4 w-full max-w-xs lg:w-full rounded-full font-medium shadow-md hover:bg-[#936ed4] hover:text-black transition cursor-pointer">
            Editar Perfil
          </div>
        </Link>

      </div>
        


      <motion.div
        key={location.key}
        initial={{ opacity: 1, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className="w-full h-full lg:col-span-2 lg:row-span-3 lg:row-start-2"
      >
        <div className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 w-full h-full bg-opacity-60">
          <CardGrid type="wideArtists" cards={currentUser.artists} />
        </div>
      </motion.div>


        
     
      <motion.div
        key={location.key}
        initial={{ opacity: 1, x: 50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className="w-full h-full min-h-[calc(100%)] lg:col-span-2 lg:row-span-3 lg:row-start-2 flex"
      >
        <div className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 w-full h-full bg-opacity-60">
          <CardGrid
            type="widePurposals"
            cards={agencyPurposals}
            setNeedRefresh={setNeedRefresh}
          />
        </div>
      </motion.div>
    </div>

  );
};

export default AgencyDashboard;
