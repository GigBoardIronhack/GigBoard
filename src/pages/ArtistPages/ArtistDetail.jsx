import { useContext, useEffect, useState } from "react";
import { getArtist } from "../../services/artist.service";
import { getPurposal, getPurposals } from "../../services/purposal.service";
import { Link, useParams } from "react-router-dom";
import { Spotify } from "react-spotify-embed";
import { AuthContext } from "../../contexts/AuthContext";
import { getFavorites, toggleFavorite } from "../../services/favorite.service";
import { useNotification } from "../../contexts/NotificationContext";
import DeleteArtist from "../../pages/ArtistPages/DeleteArtist";

import {  FaInstagram, FaTiktok, FaFacebook, FaTwitter } from "react-icons/fa";
import '@justinribeiro/lite-youtube'; 


const ArtistDetail = () => {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState(null);
  const [hasPurposal, setHasPurposal] = useState(false);
  const { notify } = useNotification();
  const [purposals, setPurposals] = useState([]);

  useEffect(() => {
    const getArtistId = async () => {
      try {
        const artist = await getArtist(id);
        setArtist(artist);

        if (currentUser.role === "promoter") {
          const favorites = await getFavorites();
          setLiked(favorites.some((fav) => fav.artist.id === id));

          const promoterPurposals = await getPurposals();
          setHasPurposal(promoterPurposals.some((purposal) => purposal.artist.id === id));
        }

        const purposals = await Promise.all(
          artist.purposals.map(async (purposal) => (purposal.id ? await getPurposal(purposal.id) : null))
        );
        setPurposals(purposals);
      } catch (err) {
        console.log(err);
      }
    };
    getArtistId();
  }, [id, currentUser.role]);

  const submitLike = () => {
    toggleFavorite(artist.id)
      .then((res) => {
        setLiked(res.message === "Like added");
        notify(res.message === "Like added" ? "Like added" : "Like removed", res.message === "Like added" ? "" : "error");
      })
      .catch(console.log);
  };

  const isOwner = artist && currentUser && artist.agency?.id === currentUser.id;

  return (
    <>
      {artist ? (

        <div
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${artist.imageUrl})` }}
        >
          
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          
          <div className="relative bg-white rounded-lg shadow-lg w-4/5 p-6 z-10">
            <div className="grid grid-cols-1 gap-8 text-center lg:text-left">
              
              <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-6">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-40 h-40 rounded-full object-cover shadow-lg"
                />
                <div>
                  <h1 className="text-2xl lg:text-4xl  font-bold text-gray-800">{artist.name}</h1>
                  <p className="text-gray-600 mt-3">{artist.description}</p>

                  <div className="flex justify-center lg:justify-start gap-4 mt-4">
                    {artist.rrss.instagram && (
                      <a href={artist.rrss.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="hover:text-pink-500 text-2xl"/>
                      </a>
                    )}
                    {artist.rrss.tiktok && (
                      <a href={artist.rrss.tiktok} target="_blank" rel="noopener noreferrer">
                      <FaTiktok className="hover:text-[#bc1a9f] text-2xl"/>
                      </a>
                    )}
                    {artist.rrss.facebook && (
                      <a href={artist.rrss.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook className="hover:text-blue-600 text-2xl"/>
                      </a>
                    )}
                    {artist.rrss.twitter && (
                      <a href={artist.rrss.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter className="hover:text-blue-400 text-2xl"/>
                      </a>
                    )}
                  </div>
                </div>
              </div>


            </div>
            {!artist.youtubeUrl ? (
              <div className="flex justify-center items-center">
                <Spotify link={artist.spotiUrl} width={"70%"}/>
              </div>
              ) : (
            <div className="flex flex-col-reverse lg:flex-row justify-around items-center">
               
              <div className="flex justify-center lg:w-[45%] w-full items-center mb-6 mt-6 lg:mt-0 lg:mb-0 rounded-lg shadow-lg overflow-hidden">

              <lite-youtube videoid={artist.youtubeUrl}></lite-youtube>
              </div>
              <div className="flex justify-center lg:w-[45%] w-full mb">
                <Spotify link={artist.spotiUrl} width={"100%"}/>
              </div>  


                </div>)}


            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800">Propuestas</h2>
              {purposals.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {purposals.map((purposal) =>
                    purposal && purposal.promoter ? (
                      <div key={purposal.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                        <p className="text-gray-600">{purposal.eventDate}</p>
                        <p className="text-gray-800 font-semibold">{purposal.promoter.name}</p>
                      </div>
                    ) : null
                  )}
                </div>
              ) : (
                <p className="text-gray-500 mt-3">No hay propuestas.</p>
              )}
            </div>

            <div className="mt-8 flex gap-4">
              {currentUser.role === "promoter" && (
                <>
                  <button onClick={submitLike} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
                    <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
                  </button>
                  {!hasPurposal && (
                    <Link to={`/artists/${artist.id}/purposal`}>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                        Crear Propuesta
                      </button>
                    </Link>
                  )}
                </>
              )}

              {isOwner && (
                <>
                  <Link to={`/artists/edit/${artist.id}`}>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">
                      Editar
                    </button>
                  </Link>
                  <DeleteArtist id={artist.id} />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">Artista no encontrado</p>
      )}
    </>
  );
};

export default ArtistDetail;
