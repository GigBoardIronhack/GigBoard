import RecommendedArtists from "../../components/RecommendedArtists/RecommendedArtists";
import CardGrid from "../../components/CardGrid/CardGrid"
import { useContext, useEffect, useState } from "react";
import { getPurposals } from "../../services/purposal.service";
import { AuthContext } from "../../contexts/AuthContext";
import { getCurrentUserService } from "../../services/auth.service";

const PromoterDashboard = () => {
  const [purposals, setPurposals] = useState([])
  useEffect(()=>{
    const fetchPurposals = async () => {
      const purposals = await getPurposals();
      setPurposals(purposals)
    }
    fetchPurposals()
    
  }, [])
  return(
    <>
      <h1> Promoter Dashboard</h1>

      <RecommendedArtists />
      <CardGrid type="widePurposals" cards={purposals} />
    </>
  )
}

export default PromoterDashboard