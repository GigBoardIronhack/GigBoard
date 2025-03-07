/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { listArtists } from "../../services/promoter.service";
import CardGrid from "../../components/CardGrid/CardGrid";
import Select from "react-select";
import ArtistSkeleton from "../../components/Skeleton/ArtistSkeleton";

const PromoterArtists = () => {
  const [artists, setArtists] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [nameFilter, SetNameFilter] = useState("");
  const [isLoading, setIsLoading]=useState(true)



  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await listArtists();
        console.log("artistasssss", response.artists);
        const artistsArray = Array.isArray(response.artists)
          ? response.artists
          : [];
        setArtists(artistsArray);
        setIsLoading(false)
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
    setSelectedStyles(
      selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    );
  };

  const filteredArtists = artists.filter((artist) => {
    const matchesName = artist.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const matchesStyles =
      selectedStyles.length === 0 ||
      (Array.isArray(artist.style)
        ? selectedStyles.some((style) => artist.style.includes(style))
        : selectedStyles.some((style) =>
            artist.style.split(",").map((s) => s.trim())
          ));

    return matchesStyles && matchesName;
  });

  if (isLoading) {
    return <div className="h-screen bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b]"><ArtistSkeleton /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gradient-to-b from-[#f64aff] via-[#7c3aed] to-[#1e293b]">
      <section className="mb-6">
        <label htmlFor="nameFilter" className="block text-lg font-semibold mb-2">
          Buscar artistas por nombre
        </label>
        <input
          id="nameFilter"
          name="nameFilter"
          type="text"
          value={nameFilter}
          onChange={filerName}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Escribe un nombre..."
        />
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Filtrar por estilos</h3>
        <Select
          isMulti
          name="styles"
          options={styleOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSelectChange}
          value={styleOptions.filter((option) =>
            selectedStyles.includes(option.value)
          )}
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
