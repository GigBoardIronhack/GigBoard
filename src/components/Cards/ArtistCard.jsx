/* eslint-disable react/prop-types */

const ArtistCard = ({card}) => {
  return (
    <div>
    
        <h1>{card.name}</h1>
        <img src={card.imageUrl} alt={card.name} />
      
    </div>
  )
}

export default ArtistCard
