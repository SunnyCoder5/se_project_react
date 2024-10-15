import { useEffect, useState } from "react";
import { APIkey, coordinates } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import Api from "../../utils/api";

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { currentTemperatureUnit: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const [isMobileMenuOpened, setMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenu(!isMobileMenuOpened);
  };

  const addButtonClick = () => {
    setActiveModal("add-garment");
  };
  const closeModal = () => {
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  const [clothingItems, setClothingItems] = useState([]);

  const handleAddItemSubmit = (item) => {
    api
      .addItem(item)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeModal();
      })
      .catch(console.error);
  };

  const deleteItemSubmit = () => {
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        const newClothingItems = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newClothingItems);
        closeModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setClothingItems(res);
        console.log(res);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            isMobileMenuOpened={isMobileMenuOpened}
            toggleMobileMenu={toggleMobileMenu}
            addButtonClick={addButtonClick}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                weatherData.temp && (
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    isMobileMenuOpened={isMobileMenuOpened}
                    clothingItems={clothingItems}
                    onAddItem={handleAddItemSubmit}
                  />
                )
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  addButtonClick={addButtonClick}
                  onAddItem={handleAddItemSubmit}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          closeModal={closeModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
          onDelete={deleteItemSubmit}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
