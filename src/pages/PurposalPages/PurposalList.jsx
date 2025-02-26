
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { listPromoterPurposals } from "../../services/promoter.service";
import { listAgencyPurposals } from "../../services/agency.service";
import CardGrid from "../../components/CardGrid/CardGrid";

const PurposalList = () => {
  const {currentUser} = useContext(AuthContext)
    console.log("CURRENTUSER",currentUser)
  const [promoterPurposals, setPromoterPurposals] = useState([]);
  const [agencyPurposals, setAgencyPurposals]= useState([])

  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const agencyPurposals = await listAgencyPurposals();
        setAgencyPurposals(Array.isArray(agencyPurposals) ? agencyPurposals : []);
        console.log("PURPOSALSS AGENCY", agencyPurposals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPurposal();
  }, []);


  useEffect(() => {
    const fetchPurposal = async () => {
      try {
        const promoterPurposals = await listPromoterPurposals();
        setPromoterPurposals(Array.isArray(promoterPurposals) ? promoterPurposals : []);
        console.log("PURPOSALSS", promoterPurposals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPurposal();
  }, []);

  return (
    <div>
      <h2>Purposals</h2>
    {currentUser.role === "promoter" ? ( 
      promoterPurposals &&
      <CardGrid type="purposals" cards={promoterPurposals}/>
        ) 
        : 
        (
      <CardGrid type="purposals" cards={agencyPurposals}/>
        )
    } 
    </div>
  );
};


export default PurposalList
