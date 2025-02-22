
import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react"
import  LinkCreateArtist   from "../../components/LinkCreateArtist/LinkCreateArtist"
import CardGrid from "../../components/CardGrid/CardGrid"

const AgencyDashboard = () => {
  const { currentUser } = useContext(AuthContext)

  return(
    <>
      <h1> Agency Dashboard</h1>
      <h2>hola {currentUser.name}</h2>
      <h3>eres {currentUser.role}</h3>
      <h4>tienes : {currentUser.artists.length} artistas</h4>
      <LinkCreateArtist />
      <CardGrid type="artists" cards={currentUser.artists} />
      
     

    </>
  )
}

export default AgencyDashboard