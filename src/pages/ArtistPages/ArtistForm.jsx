/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { editArtist, createArtist } from "../../services/agency.service.js";
import { GENRES_LIST } from "../../data/styles.js";

import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from "primereact/floatlabel";

const ArtistForm = ({ artist, isEditing }) => {


  const { currentUser } = useContext(AuthContext);
  const [selectedStyles, setSelectedStyles] = useState([]);



  const [artistData, setArtistData] = useState({
    name: artist?.name || "",
    imageUrl: artist?.imageUrl || null,
    description: artist?.description || "",
    style: artist?.style || [],

    basePrice: artist?.basePrice || null,
    club: artist?.pricingModifiers?.club || null,
    festival: artist?.pricingModifiers?.festival || null,
    specialEvent: artist?.pricingModifiers?.specialEvent || null,
    small: artist?.pricingModifiers?.capacity?.small || null,
    large: artist?.pricingModifiers?.capacity?.large || null,
    weekendBoost: artist?.pricingModifiers?.weekendBoost || null,
    monthBoost: artist?.pricingModifiers?.monthBoost || null,
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();

    uploadData.append("name", artistData.name);
    uploadData.append("description", artistData.description);

    if (artistData.imageUrl instanceof File) {
      uploadData.append("imageUrl", artistData.imageUrl);
    }

    artistData.style.forEach(style => uploadData.append("style[]", style));

    uploadData.append("basePrice", artistData.basePrice);
    uploadData.append("club", artistData.club);
    uploadData.append("festival", artistData.festival);
    uploadData.append("specialEvent", artistData.specialEvent);
    uploadData.append("small", artistData.small);
    uploadData.append("large", artistData.large);
    uploadData.append("weekendBoost", artistData.weekendBoost);
    uploadData.append("monthBoost", artistData.monthBoost);
    uploadData.append("agency", currentUser.id);


    try {
      if (isEditing) {
        const updatedArtist = await editArtist(artist.id,uploadData);
        navigate(`/artists/${updatedArtist.id}`);
        console.log("Datos actualizados:", updatedArtist);
        return;
      }

      console.log("Datos enviados a la API:", artistData);
      const newArtist = await createArtist(uploadData);
      navigate(`/artists/${newArtist.id}`);

    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (artist?.style && Array.isArray(artist.style)) {
      setSelectedStyles(
        artist.style.map(styleName => GENRES_LIST.find(genre => genre.style === styleName) || { style: styleName })
      );
    }
  }, [artist]);
  console.log("Selected Styles:", selectedStyles.join(", "));
  
  
  const handleStyleChange = (e) => {
    setSelectedStyles(e.value);  
    setArtistData(prevState => ({
        ...prevState,
        style: e.value.map(item => item.style) 
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
    <div>
      <form onSubmit={handleSubmit}>
        <FloatLabel>
          <InputText
            type="text"
            placeholder="name"
            name="name"
            id="name"
            onChange={handleChange}
            value={artistData.name}
          />
          <label htmlFor="name">Name</label>
        </FloatLabel>
        <label htmlFor="description">
          <input
            type="text"
            placeholder="description"
            name="description"
            id="description"
            onChange={handleChange}
            value={artistData.description}
          />
        </label>

          <label htmlFor="imageUrl">
            {artistData.imageUrl && (
              <div>
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
              </div>
            )}
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
              style={{ width: "132px", marginRight: "30px"}}
            />
          </label>
           
        <div>
            <MultiSelect value={selectedStyles} onChange={handleStyleChange} options={GENRES_LIST} optionLabel="style" 
                filter placeholder="Select styles" maxSelectedLabels={3} className="w-full md:w-20rem" />
                
        </div>

            <label htmlFor="basePrice">
            base Price
              <input
                type="number"
                placeholder="basePrice"
                name="basePrice"
                id="basePrice"
                onChange={handleNumberChange}
                value={artistData.basePrice}
              />
            </label>
            <label htmlFor="pricingModifiers" placeholder="tipo de evento">
              tipo de evento
                <InputNumber
                  type="number"
                  placeholder="club"
                  mode="decimal" minFractionDigits={2}
 
                  name="club"
                  id="club"
                  onChange={handleNumberChange}
                  value={artistData.club}
                />
                <input
                  type="number"
                  placeholder="festival"
                  name="festival"
                  id="festival"
                  onChange={handleNumberChange}
                  value={artistData.festival}
                />
                <input
                type="number"
                placeholder="specialEvent"
                name="specialEvent"
                id="specialEvent"
                onChange={handleNumberChange}
                value={artistData.specialEvent}

              />
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
            onChange={(e) => setSelectedStyles(e.value)}
            options={GENRES_LIST}
            optionLabel="style"
            filter
            placeholder="Select styles"
            maxSelectedLabels={3}
          />
        </div>

        <label htmlFor="basePrice">
          base Price
          <input
            type="number"
            placeholder="basePrice"
            name="basePrice"
            id="basePrice"
            onChange={handleNumberChange}
            value={artistData.basePrice}
          />
        </label>
        <label htmlFor="pricingModifiers" placeholder="tipo de evento">
          tipo de evento
          <input
            type="number"
            placeholder="club"
            name="club"
            id="club"
            onChange={handleNumberChange}
            value={artistData.club}
          />
          <input
            type="number"
            placeholder="festival"
            name="festival"
            id="festival"
            onChange={handleNumberChange}
            value={artistData.festival}
          />
          <input
            type="number"
            placeholder="specialEvent"
            name="specialEvent"
            id="specialEvent"
            onChange={handleNumberChange}
            value={artistData.specialEvent}
          />
        </label>
        <label htmlFor="capacity" placeholder="tipo de evento">
          Capacidad de evento
          <input
            type="number"
            placeholder="small"
            name="small"
            id="small"
            onChange={handleNumberChange}
            value={artistData.small}
          />
          <input
            type="number"
            placeholder="large"
            name="large"
            id="large"
            onChange={handleNumberChange}
            value={artistData.large}
          />
        </label>
        <label htmlFor="weekendBoost" placeholder="tipo de evento">
          weekendBoost
          <input
            type="number"
            placeholder="weekendBoost"
            name="weekendBoost"
            id="weekendBoost"
            onChange={handleNumberChange}
            value={artistData.weekendBoost}
          />
        </label>
        <label htmlFor="monthBoost" placeholder="tipo de evento">
          monthBoost
          <input
            type="number"
            placeholder="monthBoost"
            name="monthBoost"
            id="monthBoost"
            onChange={handleNumberChange}
            value={artistData.monthBoost}
          />
        </label>

        <button type="submit">{isEditing ? "Edit" : "Register"}</button>
      </form>
    </div>
  );
};

export default ArtistForm;
