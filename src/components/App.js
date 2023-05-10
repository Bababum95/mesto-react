import { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({
    avatar: null,
    name: null,
    about: null
  })
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.togleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleUpdateUser(formData) {
    api.editUserInfo(formData)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }
  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleAddPlaceSubmit(formData) {
    api.addCard(formData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={() => setEditProfilePopupOpen(true)}
          onAddPlace={() => setAddPlacePopupOpen(true)}
          onEditAvatar={() => setEditAvatarPopupOpen(true)}
          onCardClick={setSelectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />
        <PopupWithForm name="confirmation" title="Вы уверены?" button="Да">
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
