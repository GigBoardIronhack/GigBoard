/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { editArtist, createArtist } from "../../services/agency.service.js";
import { GENRES_LIST } from "../../data/styles.js";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputSwitch } from "primereact/inputswitch";


const ArtistForm = ({ artist, isEditing }) => {
  const { currentUser, getCurrentUser } = useContext(AuthContext);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [promoterRoleChecked, setPromoterRoleChecked] = useState(false);
  const [promoterCapacityChecked, setPromoterCapacityChecked] = useState(false);
  const [promoterBoostChecked, setPromoterBoostChecked] = useState(false);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); 
  const [errorImg, setErrorImg] = useState({})
 


  const [artistData, setArtistData] = useState({
    name: artist?.name || "",
    imageUrl: artist?.imageUrl || null,
    instagram: artist?.rrss?.instagram || "",
    tiktok: artist?.rrss?.tiktok || "",
    facebook: artist?.rrss?.facebook || "",
    twitter: artist?.rrss?.twitter || "",
    description: artist?.description || "",
    spotiUrl: artist?.spotiUrl || "",
    youtubeUrl: artist?.youtubeUrl || "",
    style: artist?.style || [],
    basePrice: artist?.basePrice || null,
    club: artist?.pricingModifiers?.club*100 || 0,
    festival: artist?.pricingModifiers?.festival*100 || 0,
    specialEvent: artist?.pricingModifiers?.specialEvent*100 || 0,
    small: artist?.pricingModifiers?.capacity?.small*100 || 0,
    large: artist?.pricingModifiers?.capacity?.large*100 || 0,
    weekendBoost: artist?.pricingModifiers?.weekendBoost*100 || 0,
    monthBoost: artist?.pricingModifiers?.monthBoost*100 || 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      artistData.name.trim() !== "" &&
      artistData.description.trim() !== "" &&
      artistData.spotiUrl.trim() !== "" &&
      artistData.style.length > 0 && 
      (typeof artistData.imageUrl === "string" || artistData.imageUrl instanceof File) && 
      artistData.basePrice > 0; 
  
    setIsFormValid(isValid);
  }, [artistData, isEditing]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStyles.length === 0) {
      setError("Este campo es obligatorio. Debes seleccionar al menos una opción.");
      return;
    }
    const uploadData = new FormData();
    
    uploadData.append("name", artistData.name);
    uploadData.append("description", artistData.description);

    if (artistData.imageUrl instanceof File) {
      uploadData.append("imageUrl", artistData.imageUrl);
    }
    artistData.style.forEach((style) => uploadData.append("style[]", style));
    let basePrice = artistData.basePrice;

    if(artistData.basePrice === null){
      basePrice = 0;
    }
    uploadData.append("basePrice", basePrice);
    uploadData.append("spotiUrl", artistData.spotiUrl);
    uploadData.append("instagram",artistData.instagram)
    uploadData.append("tiktok",artistData.tiktok)
    uploadData.append("facebook",artistData.facebook)
    uploadData.append("twitter",artistData.twitter)
    uploadData.append("youtubeUrl", artistData.youtubeUrl);
    uploadData.append("club", artistData.club/100);
    uploadData.append("festival", artistData.festival/100);
    uploadData.append("specialEvent", artistData.specialEvent/100);
    uploadData.append("small", artistData.small/100);
    uploadData.append("large", artistData.large/100);
    uploadData.append("weekendBoost", artistData.weekendBoost/100);
    uploadData.append("monthBoost", artistData.monthBoost/100);
    uploadData.append("agency", currentUser.id);
    console.log("datos enviados a la api", Object.fromEntries(uploadData))

    try {
      if (isEditing) {
        const updatedArtist = await editArtist(artist.id, uploadData);
        await getCurrentUser();
        navigate(`/artists/${updatedArtist.id}`);
        console.log("Datos actualizados:", updatedArtist);
        return;
      }
      console.log("Datos enviados a la API:", artistData);
        
      const newArtist = await createArtist(uploadData);
      await getCurrentUser();

      navigate(`/artists/${newArtist.id}`);
    } catch (error) {
      if(error.message === "Image error"){
        setErrorImg(error)
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (artist?.style && Array.isArray(artist.style)) {
      setSelectedStyles(
        artist.style.map(
          (styleName) =>
            GENRES_LIST.find((genre) => genre.style === styleName) || {
              style: styleName,
            }
        )
      );
    }
  }, [artist]);


  const handleStyleChange = (e) => {
    setSelectedStyles(e.value);
    
    setArtistData((prevState) => ({
      ...prevState,
      style: e.value.map((item) => item.style),
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setArtistData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleNumberChange = (e) => {
    const name = e.target.name;
    const value = Number(e.target.value);
    setArtistData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className=" bg-white dark:bg-[#101C29] min-h-screen flex items-center justify-center">
    <div className="container mx-auto px-4 py-16">
      <form onSubmit={handleSubmit} className="bg-[#004e64] container mx-auto px-8 p-6 rounded mb-5-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-semibold text-white mb-4 text-center">Crear Artista</h1>
        <FloatLabel>
          <InputText
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={artistData.name}
            className="w-full  dark:bg-[#101C29] dark:text-zinc-300 p-2 border border-[#d76a03] rounded mb-5"

          />
          <label htmlFor="name"><p className="flex align-top">Name</p></label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={artistData.description}
            className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5 "
          />
        <label htmlFor="description">Descripción</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            type="text"
            name="spotiUrl"
            id="spotiUrl"
            onChange={handleChange}
            value={artistData.spotiUrl}
            className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5 "
          />
        <label htmlFor="spotiUrl">Link de Spotify</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            type="text"
            name="youtubeUrl"
            id="youtubeUrl"
            onChange={handleChange}
            value={artistData.youtubeUrl}
            className="dark:bg-[#101C29] w-full p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300 "
          />
        <label htmlFor="youtubeUrl">Link de Youtube</label>
        </FloatLabel>
        
          <div>
          <FloatLabel>
              <InputText type="text" name="instagram" id="instagram" onChange={handleChange} value={artistData.instagram}
               className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300 " />
            <label htmlFor="instagram">Instagram</label>
            </FloatLabel>
            <FloatLabel>
              <InputText type="text" name="tiktok" id="tiktok" onChange={handleChange} value={artistData.tiktok}
                 className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300 "
              />
            <label htmlFor="tiktok">Tiktok</label>
            </FloatLabel>
            <FloatLabel>
              <InputText type="text" name="facebook" id="facebook" onChange={handleChange} value={artistData.facebook}
                 className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 "
              />
            <label htmlFor="facebook">Facebook</label>
            </FloatLabel>
            <FloatLabel>
              <InputText type="text" name="twitter" id="twitter" onChange={handleChange} value={artistData.twitter}
                 className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300 "
              />
            <label htmlFor="twitter">Twitter</label>
            </FloatLabel>
          </div>
          <label htmlFor="imageUrl" className="block mb-2">
          {artistData.imageUrl && (
            <div className="mb-2 flex justify-center">
              <p>Imagen actual:</p>
              <img
                src={
                  typeof artistData.imageUrl === "string"
                    ? artistData.imageUrl
                    : URL.createObjectURL(artistData.imageUrl)
                }
                alt="Imagen actual"
                width="100"
              />
               {errorImg?.message && <p className="text-red-500 text-sm mt-1">Formato de imagen no valido. La imagen debe de ser jpg, png, o jpeg.</p>}
            </div>
          )}
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={handleChange}
            style={{ width: "132px", marginRight: "30px" }}

          />
        </label>

        <div>
          <MultiSelect
            value={selectedStyles}
            onChange={handleStyleChange}
            options={GENRES_LIST} 
            optionLabel="style"
            filter
            placeholder="Select styles"
            maxSelectedLabels={3}
            className="dark:bg-[#101C29]"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <label htmlFor="basePrice">
          base Price
          <input
            type="number"
            placeholder="basePrice"
            name="basePrice"
            id="basePrice"
            min={0}
            required
            onChange={handleNumberChange}
            value={artistData.basePrice}
            className="dark:bg-[#101C29] w-full p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300 "
          />
        </label>
        <h2>BONUS!</h2>
        <label htmlFor="pricingModifiers" placeholder="tipo de evento">
          <div className="card flex justify-content-center dark:dark:text-zinc-300 dark:bg-[#101C29]">
          ¿Quieres añadir Bonus en base al tipo de Evento contratante?
            <InputSwitch
              checked={promoterRoleChecked}
              onChange={(e) => setPromoterRoleChecked(e.value)}
            />
          </div>
            {promoterRoleChecked && (
            <div>
            Porcentaje extra para clubes 
          <input
            type="number"
            placeholder="club"
            name="club"
            id="club"
            min={0}
            onChange={handleNumberChange}
            value={artistData.club}
            style={{width:"40px", marginLeft:"10px"}}
            className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5 "

          />% <br />
          Porcentaje extra para festival 
          <input
            type="number"
            placeholder="festival"
            name="festival"
            id="festival"
            min={0}
            onChange={handleNumberChange}
            value={artistData.festival}
            style={{width:"40px", marginLeft:"10px"}}
            className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5 "
          />% <br />
          Porcentaje extra para eventos especiales
         
          <input
            type="number"
            placeholder="specialEvent"
            name="specialEvent"
            id="specialEvent"
            min={0}
            onChange={handleNumberChange}
            value={artistData.specialEvent}
            style={{width:"40px", marginLeft:"10px"}}
            className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border rounded mb-5 "
          />% <br />
            </div>
            )}
        </label>
        <label 
        htmlFor="capacity" 
        placeholder="tipo de evento"
        style={{marginTop: "10px"}}>
          ¿Quieres añadir bonus en base a la capacidad del Evento contratante?
          <div className="card flex justify-content-center dark:bg-[#101C29]">
            <InputSwitch
              checked={promoterCapacityChecked}
              onChange={(e) => setPromoterCapacityChecked(e.value)}
            />
          </div>
          {promoterCapacityChecked && (
            <div>

          <input
            type="number"
            placeholder="small"
            name="small"
            id="small"
            min={0}
            onChange={handleNumberChange}
            value={artistData.small}
            className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5 "
          />
          <input
            type="number"
            placeholder="large"
            name="large"
            id="large"
            min={0}
            onChange={handleNumberChange}
            value={artistData.large}
            className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5 "
          />
            </div>
            )}
        </label>
        <label htmlFor="weekendBoost" placeholder="tipo de evento">
          ¿Quieres añadir Bonus por fin de semana o meses de verano?
          <div className="card flex justify-content-center dark:bg-[#101C29]">
            <InputSwitch
              checked={promoterBoostChecked}
              onChange={(e) => setPromoterBoostChecked(e.value)}
            />
          </div>
          </label>
          {promoterBoostChecked && (
            <div>
            <label htmlFor="weekendBoost" placeholder="tipo de evento">
            Bonus por fines de semana
            <input
              type="number"
              placeholder="weekendBoost"
              name="weekendBoost"
              id="weekendBoost"
              min={0}
              onChange={handleNumberChange}
              value={artistData.weekendBoost}
              className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5 "
            />
            </label>
            <label htmlFor="monthBoost" placeholder="tipo de evento">
            Bonus meses de verano (Junio, Julio y Agosto)
            <input
              type="number"
              placeholder="monthBoost"
              name="monthBoost"
              id="monthBoost"
              min={0}
              onChange={handleNumberChange}
              value={artistData.monthBoost}
              className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5 "
            />
            </label>
            </div>)}
          
            <button
            type="submit"
            className={`w-full p-2 rounded mb-5 text-white ${isFormValid ? "bg-[#d76a03] hover:bg-[#e3b505]" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!isFormValid}
          >
            {isEditing ? "Editar" : "Registrarse"}
          </button>
      </form>
      </div>
    </div>
  );
};

export default ArtistForm;
