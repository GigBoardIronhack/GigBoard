import { useEffect, useState } from "react"
import { listArtists } from "../../services/promoter.service"
import CardGrid from "../../components/CardGrid/CardGrid";

const PromoterArtists = () => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await listArtists();
        console.log("🔹 Datos recibidos de API:", response);
  
        // Asegurar que se obtiene solo el array
        const artistsArray = Array.isArray(response.artists) ? response.artists : [];
  
        console.log("✅ Array extraído:", artistsArray);
        setArtists(artistsArray);
      } catch (error) {
        console.error("❌ Error al obtener artistas:", error);
        setArtists([]);
      }
    };
  
    fetchArtists();
  }, []);
  
  return (
    <div>
    {artists && 
      <CardGrid type="artists" cards={artists} />
      }
    </div>
  
  )
}

export default PromoterArtists
