
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { listPromoterPurposals } from "../../services/promoter.service";
import { listAgencyPurposals } from "../../services/agency.service";
import CardGrid from "../../components/CardGrid/CardGrid";
import MyArtistSkeleton from "../../components/Skeleton/MyArtistSkeleton";

const PurposalList = () => {
  const {currentUser} = useContext(AuthContext)
    console.log("CURRENTUSER",currentUser)
  const [promoterPurposals, setPromoterPurposals] = useState([]);
  const [agencyPurposals, setAgencyPurposals]= useState([]);
  const [needRefresh, setNeedRefresh] = useState(true);
  const [isLoading, setIsLoading]=useState(true)

  console.log("setNeedRefresh en PurposalList:", setNeedRefresh);

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
        <>
          <MyArtistSkeleton/>
          
        </>
        )
          
      }
  return (
    <div className="h-screen bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b]">
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
