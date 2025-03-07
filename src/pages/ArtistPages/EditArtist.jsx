import { useParams } from "react-router-dom"
import ArtistForm from "./ArtistForm"
import { useEffect, useState } from "react"
import { getArtist } from "../../services/artist.service"

const EditArtist = () => {

  const {id} = useParams()
  const [artist, setArtist] = useState({})
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    const getArtistId = async () => {
     try{
     const artist = await getArtist(id)
      setArtist(artist)

     }catch(err){
      console.log(err)
     }finally{

      setLoading(false)

     }
    }
    getArtistId()
  },[id])

  {loading && <p>Cargando artista...</p> }

  {!artist && <p>No hay artista para mostrar</p> }

  return (
    <div className="h-screen bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b]">

      <ArtistForm  artist={artist} key={artist.id}  isEditing/>

    </div>
  )
}

export default EditArtist
