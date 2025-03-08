import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RecommendedArtists from "../../components/RecommendedArtists/RecommendedArtists";
import CardGrid from "../../components/CardGrid/CardGrid";
import { AuthContext } from "../../contexts/AuthContext";
import { getPurposals } from "../../services/purposal.service";
import DashboardSkeleton from "../../components/Skeleton/DashboardSkeleton";

const PromoterDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [purposals, setPurposals] = useState([]);
  const [needRefresh, setNeedRefresh] = useState(true);
  const [isLoading, setIsLoading]=useState(true)

  useEffect(() => {
    const fetchPurposals = async () => {
      try {
        const purposals = await getPurposals();
        setPurposals(Array.isArray(purposals) ? purposals : []);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };

    if (needRefresh) {
      fetchPurposals();
      setNeedRefresh(false);
    }
  }, [needRefresh]);
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 grid-rows-[50px_1/2fr_1fr_1fr] lg:grid-rows-[auto_1fr_1fr_1fr] lg:grid-cols-5 gap-2 lg:gap-4 w-full h-screen mx-auto p-4 ">

      <div className="text-center border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-span-5 bg-opacity-60">
        <h1 className="text-2xl lg:text-4xl font-bold uppercase dark:text-white mb-1">
          Promoter Dashboard
        </h1>
      </div>

      <motion.div
        key={location.key}
        initial={{ opacity: 1, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className="w-full h-full lg:col-span-2 row-start-3 lg:row-span-3 lg:row-start-2"
      >
        <div className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 w-full h-full bg-opacity-60">
          <CardGrid type="widePurposals" cards={purposals} setNeedRefresh={setNeedRefresh} />
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-2 border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-start-3 lg:row-span-2 row-start-2 lg:row-start-2 bg-opacity-60">
  <h2 className="text-lg lg:text-xl font-semibold dark:text-black-300 mb-1">
    {currentUser.name}
  </h2>

  <img
    src={currentUser.imageUrl || "/default-user.png"}
    alt="User profile"
    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm"
  />

  <p className="text-xs lg:text-sm text-black-500 ">
    CIF: <span className="font-semibold">{currentUser.cif}</span>
  </p>

  {currentUser.promoterRole && (
    <p className="text-xs lg:text-sm text-black-500  text-center">
      Your venue is a{" "}
      <span className="font-semibold capitalize">{currentUser.promoterRole}</span>
      {currentUser.promoterCapacity && (
        <>
          {" "}with a capacity for{" "}
          <span className="font-semibold">{currentUser.promoterCapacity}</span>{" "}
          persons.
        </>
      )}
    </p>
  )}

  <Link to="/edit">
    <div className="bg-[#7c3aed] text-white text-center mb-2 mt-2 px-4 py-4 w-full max-w-xs lg:w-full rounded-full font-medium shadow-md hover:bg-[#936ed4] hover:text-black transition cursor-pointer">
      Edit Profile
    </div>
  </Link>
</div>



      <motion.div
        key={location.key}
        initial={{ opacity: 1, x: 50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className="w-full h-full min-h-[calc(100%)] lg:col-span-2 lg:row-span-3 lg:row-start-2 flex"
      >
        <div className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 w-full h-full bg-opacity-60">
          <RecommendedArtists />
        </div>
      </motion.div>
    </div>
  );
};

export default PromoterDashboard;
