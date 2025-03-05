import { useContext } from "react"
import CardGrid from "../../components/CardGrid/CardGrid"
import { AuthContext } from "../../contexts/AuthContext"

const AgencyArtists = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <>
    <CardGrid type="artists" cards={currentUser.artists} />
      
    </>
  )
}

export default AgencyArtists
