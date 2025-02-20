/* eslint-disable react/prop-types */
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const Calculator = ({ artist, weekendBoost, summerBoost }) => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  const isClub = currentUser.promoterRole === "club";
  const isFestival = currentUser.promoterRole === "festival";
  const isSpecialEvent = currentUser.promoterRole === "specialEvent";
  const isSmallVenue = currentUser.promoterCapacity < 1000;
  const isLargeVenue = currentUser.promoterCapacity >= 1000;

  const clubBonus = isClub ? artist.basePrice * artist?.pricingModifiers?.club : 0;
  const festivalBonus = isFestival ? artist.basePrice * artist?.pricingModifiers?.festival : 0;
  const specialEventBonus = isSpecialEvent ? artist.basePrice * artist?.pricingModifiers?.specialEvent : 0;
  const smallBonus = isSmallVenue ? artist.basePrice * artist?.pricingModifiers?.capacity.small : 0;
  const largeBonus = isLargeVenue ? artist.basePrice * artist?.pricingModifiers?.capacity.large : 0;
  const weekendBonus = weekendBoost ? artist.basePrice * artist?.pricingModifiers?.weekendBoost : 0;
  const summerBonus = summerBoost ? artist.basePrice * artist?.pricingModifiers?.monthBoost : 0;

  const negotiatedPrice = artist.basePrice + clubBonus + festivalBonus + specialEventBonus + smallBonus + largeBonus + weekendBonus + summerBonus;

  console.log(clubBonus, festivalBonus, specialEventBonus, smallBonus, largeBonus, weekendBonus, summerBonus, negotiatedPrice);

  return (
    <div>
      <h2>{artist.basePrice}</h2>
      {isClub && <p> + {clubBonus}</p>}
      {isFestival && <p> + {festivalBonus}</p>}
      {isSpecialEvent && <p> + {specialEventBonus}</p>}
      {isSmallVenue && <p> + {smallBonus}</p>}
      {isLargeVenue && <p> + {largeBonus}</p>}
      {weekendBoost && <p> + {weekendBonus}</p>}
      {summerBoost && <p> + {summerBonus}</p>}

      {console.log(negotiatedPrice)}
      <h2>TOTAL: {negotiatedPrice}</h2>
    </div>
  );
};

export default Calculator;
