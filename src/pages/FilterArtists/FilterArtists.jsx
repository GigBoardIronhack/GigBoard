import { useEffect, useState } from "react";
import { listArtists } from "../../services/promoter.service";
import CardGrid from "../../components/CardGrid/CardGrid";
import Select from "react-select";

const PromoterArtists = () => {
  const [artists, setArtists] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await listArtists();
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

  const styleOptions = availableStyles.map((style) => ({
    value: style,
    label: style,
  }));

  const handleSelectChange = (selectedOptions) => {
    setSelectedStyles(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
  };

  const filteredArtists = artists.filter((artist) => {
    if (selectedStyles.length === 0) return true;
    const artistStyles = Array.isArray(artist.style)
      ? artist.style
      : artist.style.split(",").map((s) => s.trim());
    return selectedStyles.some((style) => artistStyles.includes(style));
  });

  return (
    <div>
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
