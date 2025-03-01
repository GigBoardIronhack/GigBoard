/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { listPromoterPurposals } from "../../services/promoter.service";
import { listAgencyPurposals } from "../../services/agency.service";
import CardGrid from "../../components/CardGrid/CardGrid";

const PurposalList = () => {
  const {currentUser} = useContext(AuthContext)
    console.log("CURRENTUSER",currentUser)
  const [promoterPurposals, setPromoterPurposals] = useState([]);
  const [agencyPurposals, setAgencyPurposals]= useState([]);
  const [needRefresh, setNeedRefresh] = useState(true);

      useEffect(() => {
        if (!currentUser) return;
        
        const fetchPurposals = async () => {
          try {
            if (currentUser.role === "agency") {
              const agencyPurposals = await listAgencyPurposals();
              setAgencyPurposals(Array.isArray(agencyPurposals) ? agencyPurposals : []);
              console.log("PURPOSALSS AGENCY", agencyPurposals);
            } else if (currentUser.role === "promoter") {
              const promoterPurposals = await listPromoterPurposals();
              setPromoterPurposals(Array.isArray(promoterPurposals) ? promoterPurposals : []);
              console.log("PURPOSALSS PROMOTER", promoterPurposals);
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
      

  return (
    <div>
      <h2>Purposals</h2>
    {currentUser.role === "promoter" ? ( 
      promoterPurposals &&
      <CardGrid type="purposals" cards={promoterPurposals}/>
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
