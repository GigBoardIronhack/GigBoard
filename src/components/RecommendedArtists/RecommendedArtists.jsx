import { useEffect, useState } from "react";
import { getRecommendedArtists } from "../../services/artist.service";
import WideArtistCard from "../../components/Cards/WideArtistCard";

const RecommendedArtists = () => {
  const [recommendedArtists, setRecommendedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendedArtists();
        console.log("🎯 Artistas recibidos en el frontend:", data);
  
        // Asegurar que cada artista tenga 'id'
        const artistsWithId = data.map((artist) => ({
          ...artist,
          id: artist._id, // Mapeamos _id a id si es necesario
        }));
  
        setRecommendedArtists(artistsWithId);
      } catch (error) {
        console.error("Error obteniendo recomendaciones:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecommendations();
  }, []);
  

  return (
    <div>
      <h2>Artistas Recomendados</h2>
      {loading ? (
        <p>Cargando recomendaciones...</p>
      ) : recommendedArtists.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {recommendedArtists.map((artist) => (
            <WideArtistCard key={artist.id} card={artist} />
          ))}
        </div>
      ) : (
        <p>No hay recomendaciones por ahora.</p>
      )}
    </div>
  );
};

export default RecommendedArtists;
