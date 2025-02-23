import { useContext, useEffect, useState } from "react";
import { getArtist } from "../../services/artist.service";
import { getPurposals } from "../../services/purposal.service";
import { Link, useParams } from "react-router-dom";
import { Spotify } from "react-spotify-embed";
import { AuthContext } from "../../contexts/AuthContext";
import { getFavorites, toggleFavorite } from "../../services/favorite.service";
import { useNotification } from "../../contexts/NotificationContext";
import DeleteArtist from "../../pages/ArtistPages/DeleteArtist";

const ArtistDetail = () => {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState(null);
  const [hasPurposal, setHasPurposal] = useState(false);
  const { notify } = useNotification();

  useEffect(() => {
    const getArtistId = async () => {
      try {
        const artist = await getArtist(id);
        setArtist(artist);

        if (currentUser.role === "promoter") {
          const favorites = await getFavorites();
          const isFavorite = favorites.some((fav) => fav.artist.id === id);
          setLiked(isFavorite);
  
          const purposals = await getPurposals();
          const alreadyProposed = purposals.some((purposal) => purposal.artist.id === id);
          setHasPurposal(alreadyProposed);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getArtistId();
  }, [id, currentUser.role]);

  const submitLike = () => {
    toggleFavorite(artist.id)
      .then((res) => {
        if (res.message === "Like added") {
          setLiked(true);
          notify("Like added");
        } else {
          setLiked(false);
          notify("Like removed", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isOwner = artist && currentUser && (artist.agency && artist.agency.id === currentUser.id)
 


  return (
    <>
      {artist ? (
        <div>
          <p>{artist.name}</p>
          <img src={artist.imageUrl} alt={artist.name} />
          <Spotify link={artist.spotiUrl} />
          {currentUser.role === "promoter" && (
            <div>
              <button className="btn btn-light" onClick={submitLike}>
                <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}></i>
              </button>
              {!hasPurposal && (
                <Link to={`/artists/${artist.id}/purposal`}>
                  <button>Crear Propuesta</button>
                </Link>
              )}
            </div>
          )}
          {isOwner && (
            <>
              <Link to={`/artists/edit/${artist.id}`}>
                <button>Editar</button>
              </Link>
              <DeleteArtist id={artist.id} />
            </>
          )}
        </div>
      ) : (
        <p>Artist not found</p>
      )}
    </>
  );
};

export default ArtistDetail;
