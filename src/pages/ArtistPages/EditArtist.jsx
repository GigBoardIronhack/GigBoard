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

  {loading && <p>Loading Artist...</p> }

  {!artist && <p>No artist to show you</p> }

  return (
    <div className="">

      <ArtistForm  artist={artist} key={artist.id}  isEditing/>

    </div>
  )
}

export default EditArtist
