import { useEffect, useState } from "react";
import { APIkey, coordinates } from "../../utils/constants";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getCards, addItem, deleteItem, baseUrl } from "../../utils/api.js";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signUp, logIn, getUserProfile } from "../../utils/auth.js";
import * as auth from "../../utils/auth.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { currentTemperatureUnit: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");
  const [currentUser, setCurrentUser] = useState({});

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const onSignUp = ({ email, password, name, avatar }) => {
    const userProfile = { email, password, name, avatar };
    signUp(userProfile)
      .then((res) => {
        onLogIn({ email, password });
      })
      .catch((error) => {
        console.error("error at signing up", error);
      });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onLogIn = ({ email, password }) => {
    console.log("login");
    auth
      .logIn({ email, password })
      .then((data) => {
        console.log("data", data);
        localStorage.setItem("jwt", data.token);
        getUserProfile(data.token).then((res) => {
          console.log(res);
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate("/profile");
        });
        closeModal();
      })
      .catch(console.error);
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

  const handleRegisterModal = () => {
    setActiveModal("signUp");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
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
    const token = localStorage.getItem("jwt");
    addItem(item, token)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeModal();
      })
      .catch(console.error);
  };

  const deleteItemSubmit = () => {
    deleteItem(selectedCard._id)
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
    getCards()
      .then((res) => {
        setClothingItems(res);
        console.log(res);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
              isLoggedIn={isLoggedIn}
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
                      isLoggedIn={isLoggedIn}
                    />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      addButtonClick={addButtonClick}
                      onAddItem={handleAddItemSubmit}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
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
        <RegisterModal
          isOpen={activeModal === "signUp"}
          closeModal={closeModal}
          onSignUp={onSignUp}
          openLoginModal={handleLoginModal}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          closeModal={closeModal}
          onLogIn={onLogIn}
          openRegisterModal={handleRegisterModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
