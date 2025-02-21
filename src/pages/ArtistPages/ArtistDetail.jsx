import { useContext, useEffect, useState } from "react";
import { getArtist } from "../../services/artist.service";
import { Link, useParams } from "react-router-dom";
import { Spotify } from "react-spotify-embed";
import { AuthContext } from "../../contexts/AuthContext";
import { toggleFavorite } from "../../services/favorite.service";
import { useNotification } from "../../contexts/NotificationContext";
useNotification

const ArtistDetail = () => {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();
  const {currentUser}= useContext(AuthContext)
  const [liked, setLiked] = useState([]);
  const { notify } = useNotification();

  useEffect(() => {
    const getArtistId = async () => {
      try {
        const artist = await getArtist(id);
        
        setArtist(artist);
        console.log(artist);
      } catch (err) {
        console.log(err);
      }
    };
    getArtistId();
  }, [id]);
  



  const submitLike = () => {
    toggleFavorite(artist.id)
      .then((res) => {
        if (res.message === 'Like added') {
          setLiked(true);
          notify('Like added');
        } else {
          setLiked(false);
          notify('Like removed', 'error');
        }
      })
      .catch((error) => {
        console.log(error);
      
      });
  };

  return (
    <>
      {artist ? (
        <div>
          <p>{artist.name}</p>
          <img src={artist.imageUrl} alt="" />
          <Spotify link={artist.spotiUrl} />
            {
            currentUser.role === "promoter" && 
            <div>
            <button className="btn btn-light" onClick={submitLike}>
          <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
        {}
            <Link to={`/artists/${artist.id}/purposal`} >
              <button>Crear Propuesta</button>
            </Link>
            
          </div>}
        </div>
      ) : (
        <p>artist not found</p>
      )}
    </>
  );
};

export default ArtistDetail;
