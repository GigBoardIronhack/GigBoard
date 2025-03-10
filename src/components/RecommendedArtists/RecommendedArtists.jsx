import { useEffect, useState } from "react";
import { getRecommendedArtists } from "../../services/artist.service";
import ArtistCard from "../Cards/ArtistCard";

const RecommendedArtists = () => {
  const [recommendedArtists, setRecommendedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendedArtists();
        

        const artistsWithId = data.map((artist) => ({
          ...artist,
          id: artist._id,
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
    <div className="pt-4">

      <h1 className="text-2xl font-bold text-center mb-4">
        Recommended Artists
      </h1>

      <div className="p-4 mt-2 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {loading ? (
          <p className="text-center text-black-500 dark:">
            Loading recommendations...
          </p>
        ) : recommendedArtists.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
            {recommendedArtists.map((artist) => (
              <ArtistCard key={artist.id} card={artist} />
            ))}
          </div>
        ) : (
          <p className="text-center text-black-500 dark:">
          There are no recommendations yet. 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default RecommendedArtists;
