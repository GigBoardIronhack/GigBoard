
import { AuthContext } from "../../contexts/AuthContext"
import { useContext, useEffect, useState} from "react"
import  LinkCreateArtist   from "../../components/LinkCreateArtist/LinkCreateArtist"
import CardGrid from "../../components/CardGrid/CardGrid"
import { listAgencyPurposals } from "../../services/agency.service"

const AgencyDashboard = () => {
  const { currentUser } = useContext(AuthContext)
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
  

  return(
    <>
      <h1> Agency Dashboard</h1>
      <h2>hola {currentUser.name}</h2>
      <h3>eres {currentUser.role}</h3>
      <h4>tienes : {currentUser.artists.length} artistas</h4>
      <LinkCreateArtist />
      <CardGrid type="wideArtists" cards={currentUser.artists} />
      <CardGrid type="widePurposals" cards={agencyPurposals}/>
      
     

    </>
  )}


export default AgencyDashboard