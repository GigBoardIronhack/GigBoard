import { useEffect, useState } from "react";
import { listArtists } from "../../services/promoter.service";
import CardGrid from "../../components/CardGrid/CardGrid";
import Select from "react-select";


const PromoterArtists = () => {
  const [artists, setArtists] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [nameFilter, SetNameFilter] = useState("")


  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await listArtists();
        console.log("artistasssss", response.artists)
        const artistsArray = Array.isArray(response.artists) ? response.artists : [];
        setArtists(artistsArray);
      } catch (error) {
        console.error(error);
        setArtists([]);
      }
    };
    fetchArtists();
  }, []);

  const availableStyles = Array.from(
    new Set(
      artists.flatMap((artist) => {
        if (artist.style) {
          return Array.isArray(artist.style)
            ? artist.style
            : artist.style.split(",").map((s) => s.trim());
        }
        return [];
      })
    )
  );
  const filerName = (event) => {
    SetNameFilter(event.target.value);
};


  const styleOptions = availableStyles.map((style) => ({
    value: style,
    label: style,
  }));

  const handleSelectChange = (selectedOptions) => {
    setSelectedStyles(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
  };

  const filteredArtists = artists.filter((artist) => {
      const matchesName =  artist.name.toLowerCase().includes(nameFilter.toLowerCase())
      const matchesStyles = selectedStyles.length === 0 || ( Array.isArray(artist.style)
      ? selectedStyles.some((style) => artist.style.includes(style))
      // eslint-disable-next-line no-unused-vars
      : selectedStyles.some((style)=> artist.style.split(",").map((s) => s.trim()))) ;

    return  matchesStyles &&  matchesName;
  });

  return (
    <div>
     <section>
      <div className="d-flex flex-column mt-4">
            <label htmlFor="nameFilter">Buscar artistas por nombre</label>
            <input 
            id="nameFilter"
            name="nameFilter"
            type="text"
            value={nameFilter}
            onChange={filerName}

             />
        </div>
      </section>

      <section className="filter-section">
        <h3>Filtrar por estilos</h3>
        <Select
          isMulti
          name="styles"
          options={styleOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSelectChange}
          value={styleOptions.filter((option) => selectedStyles.includes(option.value))}
          placeholder="Selecciona uno o más estilos..."
        />
      </section>

     
      <section className="artist-list">
   
          <CardGrid type="artists" cards={filteredArtists} />
       
        
      </section>
     
    </div>
  );
};

export default PromoterArtists;
