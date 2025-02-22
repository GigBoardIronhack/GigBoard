import { useContext } from "react"
import CardGrid from "../../components/CardGrid/CardGrid"
import { AuthContext } from "../../contexts/AuthContext"

const AgencyArtists = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <>
    <CardGrid type="wideArtists" cards={currentUser.artists} />
      
    </>
  )
}

export default AgencyArtists
