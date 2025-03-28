
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { listPromoterPurposals } from "../../services/promoter.service";
import { listAgencyPurposals } from "../../services/agency.service";
import CardGrid from "../../components/CardGrid/CardGrid";
import MyArtistSkeleton from "../../components/Skeleton/MyArtistSkeleton";

const PurposalList = () => {
  const {currentUser} = useContext(AuthContext)
    
  const [promoterPurposals, setPromoterPurposals] = useState([]);
  const [agencyPurposals, setAgencyPurposals]= useState([]);
  const [needRefresh, setNeedRefresh] = useState(true);
  const [isLoading, setIsLoading]=useState(true)

  

      useEffect(() => {
        if (!currentUser) return;
        
        const fetchPurposals = async () => {
          try {
            if (currentUser.role === "agency") {
              const agencyPurposals = await listAgencyPurposals();
              setAgencyPurposals(Array.isArray(agencyPurposals) ? agencyPurposals : []);
              setIsLoading(false)
            } else if (currentUser.role === "promoter") {
              const promoterPurposals = await listPromoterPurposals();
              setPromoterPurposals(Array.isArray(promoterPurposals) ? promoterPurposals : []);
              setIsLoading(false)
              
            }
          } catch (err) {
            console.log(err);
          }
        };
        if(needRefresh) {
          fetchPurposals();
          setNeedRefresh(false);
        }
      }, [currentUser, needRefresh]);
      
      if (isLoading) {

        return (
        <div className=" bg-white min-h-screen  grid grid-cols-1 lg:grid-cols-4 gap-4 justify-items-center max-h-screen p-4  mt-10 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          <MyArtistSkeleton />
        </div>
        )
          
      }
  return (
    <div className="min-h-screen" >
    {currentUser.role === "promoter" ? ( 
      promoterPurposals &&
      <CardGrid type="purposals" cards={promoterPurposals} setNeedRefresh={setNeedRefresh}/>
        ) 
        : 
        (
      <CardGrid type="purposals" cards={agencyPurposals} setNeedRefresh={setNeedRefresh}/>
        )
    } 
    </div>
  );
};


export default PurposalList
