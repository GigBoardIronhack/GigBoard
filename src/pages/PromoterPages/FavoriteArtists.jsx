import { useEffect, useState } from "react";
import { getFavorites } from "../../services/favorite.service";
import CardGrid from "../../components/CardGrid/CardGrid";
import FavoriteArtistSkeleton from "../../components/Skeleton/FavoriteArtistSkeleton";

const FavoriteArtists = () => {
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const [isLoading, setIsLoading]=useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        setFavoriteArtists(response.map((fav) => fav.artist));
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

if (isLoading) {
    return <FavoriteArtistSkeleton />;
  } 

  return (
    <div className="h-screen bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b] ">
        <CardGrid type="artists" cards={favoriteArtists} />
    </div>
  );
};

export default FavoriteArtists;
