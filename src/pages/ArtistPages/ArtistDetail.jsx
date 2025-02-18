import { useEffect, useState } from "react"
import { getArtist } from "../../services/artist.service"
import { useParams } from "react-router-dom"
const ArtistDetail = () => {
  const [artist, setArtist] = useState(null)
  const {id} = useParams()

  useEffect(()=>{
    const getArtistId = async()=>{
      try{
        
        const artist = await getArtist(id)
        setArtist(artist)
        console.log(artist)
      }catch(err){
        console.log(err)
      }
    }
    getArtistId()

  },[id])
  

  return (<>
    {artist ?(
      <div>
        <p>{artist.name}</p>
        <img src={artist.imageUrl} alt="" />
    </div>

    ) : (
      <p>artist not found</p>
    )}
    </>
  )
}

export default ArtistDetail
