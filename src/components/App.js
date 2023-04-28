import { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={() => setEditProfilePopupOpen(true)}
        onAddPlace={() => setAddPlacePopupOpen(true)}
        onEditAvatar={() => setEditAvatarPopupOpen(true)}
        onCardClick={setSelectedCard}/>
      <Footer />
      <PopupWithForm name="edit" title="Редактировать профиль" button="Сохранить"
      isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <div className="popup__wraper">
          <input type="text" name="name" value="Жак-Ив Кусто" required className="popup__item popup__name"
          minLength="2" maxLength="40" placeholder="Имя" />
          <span className="popup__item-error name-error"></span>
        </div>
        <div className="popup__wraper">
          <input type="text" name="about" value="Исследователь океана" required className="popup__item popup__about"
          minLength="2" maxLength="200" placeholder="О себе" />
          <span className="popup__item-error about-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm name="new-place" title="Новое место" button="Сохранить"
      isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <div className="popup__wraper">
          <input type="text" name="name" required className="popup__item popup__name"
            placeholder="Название" minLength="2" maxLength="30" />
          <span className="popup__item-error name-error"></span>
        </div>
        <div className="popup__wraper">
          <input type="url" name="link" required className="popup__item popup__link"
            placeholder="Ссылка на картинку" />
          <span className="popup__item-error link-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm name="change-avatar" title="Обновить аватар" button="Сохранить"
      isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <div className="popup__wraper">
          <input type="url" name="avatar" required className="popup__item popup__link"
            placeholder="Ссылка на картинку" />
          <span className="popup__item-error avatar-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm name="confirmation" title="Вы уверены?" button="Да">
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
