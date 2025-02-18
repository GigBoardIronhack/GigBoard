import ArtistForm from "./ArtistForm"

const EditArtist = () => {
  return (
    <div>
    <h1>Aquí editas tus artistas</h1>
      <ArtistForm artist={"artist"} isEditing/>
    </div>
  )
}

export default EditArtist
