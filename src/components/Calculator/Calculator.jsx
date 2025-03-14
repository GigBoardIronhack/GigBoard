  /* eslint-disable react/prop-types */
  import { AuthContext } from "../../contexts/AuthContext";
  import { useContext, useEffect, useState } from "react";
  import "./Calculator.css"

  import AnimatedNumbers from "react-animated-numbers";

  const Calculator = ({ artist, weekendBoost, summerBoost, onPriceChange}) => {
    const { currentUser } = useContext(AuthContext);

 

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
    const [countedPrice, setCountedPrice] = useState(artist.basePrice);
    useEffect(() => {
      if (negotiatedPrice !== countedPrice) { 
        setCountedPrice(negotiatedPrice);
        onPriceChange(negotiatedPrice); 
      }
    }, [negotiatedPrice, countedPrice, onPriceChange]);

   

    return (
      <div className="flex flex-column w-full">
      <div className="flex flex-column items-start w-full ">

      <div className="flex w-full justify-between border-b-2 border-gray-500">
        <div> 
        <h2 className="styled-number text-xl  sm:text-1xl lg:text-xl " >Base price </h2>
        </div>
        <div className="flex justify-end">
        <h2  className="styled-number flex  text-xl sm:text-1xl lg:text-xl ">{artist.basePrice}</h2>
        </div>
        </div>
        
        <div className="flex w-full flex-col ">

          {isClub && (
          <div key="club" className="flex w-full justify-between border-b-2">
          <div>
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">
          Club Bonus 
          </p>
          </div>
          <div className="flex justify-end">
          <p className="styled-number text-xl sm:text-1xl  lg:text-xl ">+ <span className="ml-1"> {clubBonus} </span></p>
          </div>
          </div>
          )}



          {isFestival && (
          <div key="festival" className="flex w-full justify-between border-b-2">
            <div>
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">
          Festival Bonus </p>
          </div>
            <div className="flex justify-end">
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">+ <span className="ml-1"> {festivalBonus}</span></p>
          </div>
          </div>
        )}

          {isSpecialEvent &&(
          <div key="specialEvent" className="flex w-full justify-between border-b-2">
          <div> 
          <p className="styled-number text-xl sm:text-1xl flex flex-row lg:text-xl "> 
          Special Event Bonus </p>
          </div>
            <div  className="flex justify-end">
        <p className="styled-number text-xl sm:text-1xl lg:text-xl flex items-center">  + <span className="ml-1">{specialEventBonus}</span> </p>
        </div>
          </div>
        )}
          {isSmallVenue &&(
          <div key="smallVenue" className="flex w-full justify-between border-b-2">
            <div>
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">
          Small Venue Bonus </p>
          </div>
            <div className="flex justify-end">
          <p className="styled-number text-xl sm:text-1xl lg:text-xl "> + <span className="ml-1"> {smallBonus}</span></p>
          </div>
          </div>
        )}

        
          {isLargeVenue && (
          <div key="largeVenue" className="flex w-full justify-between border-b-2">
            <div>
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">
          Large Venue Bonus </p>
          </div>
            <div className="flex justify-end">
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">+ <span className="ml-1"> {largeBonus}</span></p>
          </div>
          </div>
        )}

          {weekendBoost && (
          <div key="weekendBoost" className="flex w-full justify-between border-b-2">
          <div>
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">
          Weekend Bonus </p>
          </div>
            <div className="flex justify-end">
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">+ <span className="ml-1"> {weekendBonus}</span></p>
          </div>
          </div>
        )}

          {summerBoost && (
          <div key="summerBoost"  className="flex w-full justify-between border-b-2">
          <div>
          <p className="styled-number text-xl sm:text-1xl lg:text-xl ">
          Summer Bonus</p>
          </div>
          <div className="flex justify-end">
        <p className="styled-number text-xl sm:text-1xl lg:text-xl ">  + <span className="ml-1"> {summerBonus}</span></p>
        </div>
          </div>
        )}

        </div>
      
        <div className="flex w-full justify-between border-b-2">
        <div>
        <h1 className=" sm:text-center styled-number text-xl sm:text-1xl lg:text-xl "> Total price  </h1>
        </div>
          <div className="flex justify-end">
          <h2  className=" text-light-green-500 styled-number text-xl sm:text-1xl lg:text-xl   text-center sm:text-center">
            <AnimatedNumbers
              key={`price-${countedPrice}-${Date.now()}`}// Cambiar el key forzará a que el componente se reinicie cada vez que el precio cambie
              includeComma // Añadir comas a los números
              animateToNumber={countedPrice} // El número al que queremos animar
              fontStyle={{ fontSize: 32, fontWeight: "bold" }} // Estilo de la fuente
              duration={1000} // Duración de la animación en milisegundos
              easing="easeOutQuad" // Easing de la animación
            />
          </h2>
          </div>
        </div>
        </div>
      </div>
    );
  };

  
  export default Calculator;
