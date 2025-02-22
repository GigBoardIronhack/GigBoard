import { Link } from "react-router-dom"

const LinkCreateArtist = () => {
  return (
    <div>
    <Link to={"/create/artist"}>
    <button>Create Artist</button>
    </Link>
      
    </div>
  )
}

export default LinkCreateArtist

