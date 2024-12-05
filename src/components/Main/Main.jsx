import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard ";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({
  weatherData,
  handleCardClick,
  isMobileMenuOpened,
  clothingItems,
  isLoggedIn,
  isLiked,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  isLiked={isLiked}
                  isLoggedIn={isLoggedIn}
                  onCardLike={onCardLike}
                />
              );
            })}{" "}
        </ul>
      </section>
    </main>
  );
}

export default Main;
