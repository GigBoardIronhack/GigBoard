import { useEffect, useState } from "react";
import { getFavorites } from "../../services/favorite.service";
import CardGrid from "../../components/CardGrid/CardGrid";

const FavoriteArtists = () => {
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        setFavoriteArtists(response.map((fav) => fav.artist));
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando favoritos...</p>
      ) : favoriteArtists.length > 0 ? (
        <CardGrid type="favoriteArtists" cards={favoriteArtists} />
      ) : (
        <p>No tienes artistas favoritos.</p>
      )}
    </div>
  );
};

export default FavoriteArtists;
