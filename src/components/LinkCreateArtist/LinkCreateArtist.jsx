import { Link } from "react-router-dom"

const LinkCreateArtist = () => {
  return (
    <Link to={"/create/artist"}>
    <div className="bg-[#f64aff] hover:bg-opacity-50 text-white text-center mb-2 mt-2 px-4 py-4 w-full rounded-full font-medium shadow-md  hover:text-black transition cursor-pointer">
    <button>Add a new Artist</button>
      
    </div>
    </Link>
  )
}

export default LinkCreateArtist

