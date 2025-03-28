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
import ArtistDetailSkeleton from "../../components/Skeleton/ArtistDetailSkeleton";
import { Button } from "@material-tailwind/react";


const ArtistDetail = () => {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState(null);
  const [hasPurposal, setHasPurposal] = useState(false);
  const { notify } = useNotification();
  const [purposals, setPurposals] = useState([]);
  const [isLoading, setIsLoading]= useState(true)

  useEffect(() => {
    const getArtistId = async () => {
      try {
        const artist = await getArtist(id);
        setArtist(artist);
        setIsLoading(false)

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

  if (isLoading) {

    return <div className=""> <ArtistDetailSkeleton /> </div>;
  }

  return (
    <>
      {artist ? (

        <div
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${artist.imageUrl})` }}
        >
          
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          
          <div className="relative bg-white rounded-lg shadow-lg w-4/5 p-6 z-10 mt-4">
            <div className="grid grid-cols-1 gap-8 text-center lg:text-left">
              
              <div className="flex flex-col lg:flex-row gap-6 justify-start items-center mb-6 p-6">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-40 h-40 rounded-full object-cover shadow-lg"
                />
                <div>
                  <h1 className="text-2xl lg:text-4xl  font-bold text-black-800">{artist.name}</h1>
                  <p className="text-black-600 mt-3 p-4 w-16">{artist.description}</p>

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


<<<<<<< HEAD
            <div className="mt-10 lg:p-6">
              <h2 className="text-2xl font-semibold text-black-800">Propuestas</h2>
=======
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-black-800">Purposals</h2>
>>>>>>> 6b295871c87f93ab5d767a8191a3eab1625fc24a
              {purposals.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {purposals.map((purposal) =>
                    purposal && purposal.promoter ? (
                      <div key={purposal.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                        <p className="text-black-600">{purposal.eventDate.split("T")[0]}</p>
                        <p className="text-black-800 font-semibold">{purposal.promoter.name}</p>
                      </div>
                    ) : null
                  )}
                </div>
              ) : (
                <p className="text-black-500 mt-3">No Purposals yet 😢</p>
              )}
            </div>

            <div className="mt-8 flex gap-4 lg:p-6">
              {currentUser.role === "promoter" && (
                <>
                  <button onClick={submitLike} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
                    <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
                  </button>
                  {!hasPurposal && (
                    <Link to={`/artists/${artist.id}/purposal`}>
                      <button className="px-4 py-2 bg-[#7c3aed] hover:bg-[#936ed4] text-white rounded-lg shadow-md ">
                        Make an Offer
                      </button>
                    </Link>
                  )}
                </>
              )}

              {isOwner && (
                <>
                <Link to={`/artists/edit/${artist.id}`}>
                              <Button className="bg-[#7c3aed] text-white mb-2 px-4 py-4 w-full rounded-full font-medium shadow-md hover:bg-[#936ed4] hover:text-black transition lg:mb-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-4 hidden lg:block"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                  />
                                </svg>
                                <p className="block lg:hidden w-full">Edit</p>
                              </Button>
                            </Link>
                  
                  <DeleteArtist id={artist.id} />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-black-500 text-center mt-10">Artist not found</p>
      )}
    </>
  );
};

export default ArtistDetail;
