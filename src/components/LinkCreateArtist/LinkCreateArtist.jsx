import { Link } from "react-router-dom"

const LinkCreateArtist = () => {
  return (
    <Link to={"/create/artist"}>
    <div className="bg-[#D76A03] text-white text-center mb-2 mt-2 px-4 py-4 w-full rounded-full font-medium shadow-md hover:bg-[#E3B505] hover:text-black transition cursor-pointer">
    <button>Create Artist</button>
      
    </div>
    </Link>
  )
}

export default LinkCreateArtist

