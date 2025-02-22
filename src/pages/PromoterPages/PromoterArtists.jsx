import { useEffect, useState } from "react"
import { listArtists } from "../../services/promoter.service"
import CardGrid from "../../components/CardGrid/CardGrid";

const PromoterArtists = () => {
  const [artists, setArtists] = useState([]);
  useEffect(()=>{
    const fetchArtist = async () => {
      try {
        const artists = await listArtists();
        setArtists(artists)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchArtist()
  }, [])
  return (
    <div>
      <CardGrid type="artists" cards={artists} />
    </div>
  )
}

export default PromoterArtists
