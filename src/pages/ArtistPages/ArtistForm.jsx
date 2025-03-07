
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { editArtist, createArtist } from "../../services/agency.service.js";
import { GENRES_LIST } from "../../data/styles.js";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";
import ExpandableFields from "../../components/Rrss/Rrss.jsx";

const ArtistForm = ({ artist, isEditing }) => {
  const { currentUser, getCurrentUser } = useContext(AuthContext);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [promoterRoleChecked, setPromoterRoleChecked] = useState(false);
  const [promoterCapacityChecked, setPromoterCapacityChecked] = useState(false);
  const [promoterBoostChecked, setPromoterBoostChecked] = useState(false);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorImg, setErrorImg] = useState({});
  const spotifyRegex = /^https:\/\/open\.spotify\.com(\/intl-[a-zA-Z-]+)?\/(track|album|playlist|artist)\/[a-zA-Z0-9]+(?:\?.*)?$/;
  const youtubeRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|(?:v|e(?:mbed)?)\/|.*[?&]v=))([a-zA-Z0-9_-]{11})(?:[?&].*)?/;



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
    club: artist?.pricingModifiers?.club * 100 || 0,
    festival: artist?.pricingModifiers?.festival * 100 || 0,
    specialEvent: artist?.pricingModifiers?.specialEvent * 100 || 0,
    small: artist?.pricingModifiers?.capacity?.small * 100 || 0,
    large: artist?.pricingModifiers?.capacity?.large * 100 || 0,
    weekendBoost: artist?.pricingModifiers?.weekendBoost * 100 || 0,
    monthBoost: artist?.pricingModifiers?.monthBoost * 100 || 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      artistData.name.trim() !== "" &&
      artistData.description.trim() !== "" &&
      artistData.spotiUrl.trim() !== "" &&
      artistData.style.length > 0 &&
      (typeof artistData.imageUrl === "string" ||
        artistData.imageUrl instanceof File) &&
      artistData.basePrice > 0;

    setIsFormValid(isValid);
  }, [artistData, isEditing]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!spotifyRegex.test(artistData.spotiUrl)) {
      setError("Por favor, ingresa un enlace válido de Spotify.");
      return;
    } else {
      setError("");
    }
    if (!youtubeRegex.test(artistData.youtubeUrl)) {
      setError("Por favor, ingresa un enlace válido youtube.");
      return;
    } else {
      setError("");
    }
    if (selectedStyles.length === 0) {
      setError(
        "Este campo es obligatorio. Debes seleccionar al menos una opción."
      );
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

    if (artistData.basePrice === null) {
      basePrice = 0;
    }
    uploadData.append("basePrice", basePrice);
    uploadData.append("spotiUrl", artistData.spotiUrl);
    uploadData.append("instagram", artistData.instagram);
    uploadData.append("tiktok", artistData.tiktok);
    uploadData.append("facebook", artistData.facebook);
    uploadData.append("twitter", artistData.twitter);
    uploadData.append("youtubeUrl", artistData.youtubeUrl);
    uploadData.append("club", artistData.club / 100);
    uploadData.append("festival", artistData.festival / 100);
    uploadData.append("specialEvent", artistData.specialEvent / 100);
    uploadData.append("small", artistData.small / 100);
    uploadData.append("large", artistData.large / 100);
    uploadData.append("weekendBoost", artistData.weekendBoost / 100);
    uploadData.append("monthBoost", artistData.monthBoost / 100);
    uploadData.append("agency", currentUser.id);
    console.log("datos enviados a la api", Object.fromEntries(uploadData));

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
      if (error.message === "Image error") {
        setErrorImg(error);
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

  const handleNumberChange = (name, value) => {
    setArtistData((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  return (
    <div className="bg-white dark:bg-[#101C29] mt-5 flex items-center justify-center">
      <div className="mx-auto">
        <form
          onSubmit={handleSubmit}
          className="dark:bg-[#004e64] container mx-auto rounded shadow-lg w-full"
        >
        
          <h1 className="text-5xl font-semibold text-black mb-10 text-center">
          {isEditing ? "Editar Artista" : "Registrar Artista"}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 row-start-1">
              <h1 className="text-2xl font-semibold text-black text-center row-span-1 min-h-20">
                Datos Básicos
              </h1>
              <FloatLabel>
                <InputText
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={artistData.name}
                  className="w-full dark:bg-[#101C29] dark:text-zinc-300 p-2 border border-[#d76a03] rounded mb-5"
                />
                <label htmlFor="name">Nombre *</label>
              </FloatLabel>
              <FloatLabel>
                <InputTextarea
                  maxLength={500}
                  type="text"
                  name="description"
                  id="description"
                  onChange={handleChange}
                  value={artistData.description}
                  className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5"
                />
                <label htmlFor="description">Descripción *</label>
              </FloatLabel>
              <div className="dark:bg-[#101C29] dark:text-zinc-300 w-full p-2 border-[#d76a03] border rounded mb-5">
                <label htmlFor="imageUrl" className="block mb-2">
                  {" "}
                  Imagen de perfil *
                  {artistData.imageUrl && (
                    <div className="mb-2 flex justify-center">
                      <img
                        src={
                          typeof artistData.imageUrl === "string"
                            ? artistData.imageUrl
                            : URL.createObjectURL(artistData.imageUrl)
                        }
                        alt="Imagen actual"
                        width="100"
                      />
                      {errorImg?.message && (
                        <p className="text-red-500 text-sm mt-1">
                          Formato de imagen no válido.
                        </p>
                      )}
                    </div>
                  )}
                  <input
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleChange}
                    className="w-full"
                  />
                </label>
              </div>
              <div className="w-full dark:bg-[#101C29] dark:text-zinc-300 p-2 border border-[#d76a03] rounded mb-5">
                <MultiSelect
                  value={selectedStyles}
                  onChange={handleStyleChange}
                  options={GENRES_LIST}
                  optionLabel="style"
                  filter
                  placeholder="Seleccionar estilos *"
                  maxSelectedLabels={3}
                  className="dark:bg-[#101C29]"
                />
              </div>
            </div>
            <div>
            <div className="min-h-20 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold text-black text-center">
                RRSS 
              </h1>
              <p className="text-sm text-center">(el link de Spotify es obligatorio)</p>
            </div>
              <ExpandableFields
                handleChange={handleChange}
                artistData={artistData}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-black text-center row-span-1 min-h-20">
                Bonus
              </h1>
              <FloatLabel>
                <label htmlFor="basePrice">Precio Base *</label>
                <InputNumber
                  inputId="currency-germany"
                  value={artistData.basePrice}
                  onValueChange={(e) => handleNumberChange("basePrice", e.value)}

                  mode="currency"
                  currency="EUR"
                  locale="de-DE"
                  className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300"
                />
              </FloatLabel>
              <label>Bonus por tipo de evento</label>
              <InputSwitch
                checked={promoterRoleChecked}
                onChange={(e) => setPromoterRoleChecked(e.value)}
              />
              {promoterRoleChecked && (
                <div>
                  <label>Porcentaje extra para clubes</label>
                  <InputNumber
                    name="club"
                    id="club"
                    min={0}
                    step={0.1}
                    value={artistData.club}
                    onValueChange={(e) => handleNumberChange("club", e.value)}
                    className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300"
                    suffix="%"
                  />

                  <label>Porcentaje extra para festivales</label>
                  <InputNumber
                    name="festival"
                    id="festival"
                    min={0}
                    step={0.1}
                    value={artistData.festival}
                    onValueChange={(e) =>
                      handleNumberChange("festival", e.value)
                    }
                    className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300"
                    suffix="%"
                  />

                  <label>Porcentaje extra para eventos especiales</label>
                  <InputNumber
                    name="specialEvent"
                    id="specialEvent"
                    min={0}
                    step={0.1}
                    value={artistData.specialEvent}
                    onValueChange={(e) =>
                      handleNumberChange("specialEvent", e.value)
                    }
                    className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300"
                    suffix="%"
                  />
                </div>
              )}
              <label>Bonus por capacidad del evento</label>
              <InputSwitch
                checked={promoterCapacityChecked}
                onChange={(e) => setPromoterCapacityChecked(e.value)}
              />
              {promoterCapacityChecked && (
                <div>
                  <label>Capacidad pequeña</label>
                  <InputNumber
                    name="small"
                    id="small"
                    min={0}
                    step={0.1}
                    value={artistData.small}
                    onValueChange={(e) => handleNumberChange("small", e.value)}
                    className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300"
                    suffix="%"
                  />

                  <label>Capacidad grande</label>
                  <InputNumber
                    name="large"
                    id="large"
                    min={0}
                    step={0.1}
                    value={artistData.large}
                    onValueChange={(e) => handleNumberChange("large", e.value)}
                    className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300"
                    suffix="%"
                  />
                </div>
              )}
              <label>Bonus por fechas especiales</label>
              <InputSwitch
                checked={promoterBoostChecked}
                onChange={(e) => setPromoterBoostChecked(e.value)}
              />
              {promoterBoostChecked && (
                <div>
                  <label>Bonus por fin de semana</label>
                  <InputNumber
                    name="weekendBoost"
                    id="weekendBoost"
                    min={0}
                    step={0.1}
                    value={artistData.weekendBoost}
                    onValueChange={(e) =>
                      handleNumberChange("weekendBoost", e.value)
                    }
                    className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300"
                    suffix="%"
                  />

                  <label>Bonus por mes</label>
                  <InputNumber
                    name="monthBoost"
                    id="monthBoost"
                    min={0}
                    step={0.1}
                    value={artistData.monthBoost}
                    onValueChange={(e) =>
                      handleNumberChange("monthBoost", e.value)
                    }
                    className="w-full dark:bg-[#101C29] p-2 border-[#d76a03] border rounded mb-5 dark:text-zinc-300"
                    suffix="%"
                  />
                </div>
              )}
              
            </div>
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded mb-5 text-white mt-8 ${
              isFormValid
                ? "bg-[#d76a03] hover:bg-[#e3b505]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            {isEditing ? "Terminar Edición" : "Registrar Artista"}
          </button>
          <p className="dark:text-zinc-300 text-black">
            Los campos marcados con * son obligatorios
          </p>
        </form>
      </div>
    </div>
  );
};

export default ArtistForm;
