import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react"

const AgencyDashboard = () => {
  const { currentUser } = useContext(AuthContext)

  return(
    <>
      <h1> Agency Dashboard</h1>
      <h2>hola {currentUser.name}</h2>
      <h3>eres {currentUser.role}</h3>
      <h4>tienes {currentUser.artists.length} artistas</h4>
     

    </>
  )
}

export default AgencyDashboard