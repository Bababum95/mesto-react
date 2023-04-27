import { useState, useEffect } from 'react'
import api from './utils/api'
import Card from './Card'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [cards, setuCards] = useState([])
  const [userInfo, setUserInfo] = useState({
    avatar: null,
    name: null,
    about: null
  })

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserInfo(userData)
        setuCards(initialCards)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__card">
          <div className="profile__avatar" onClick={onEditAvatar}
            style={{ backgroundImage: `url(${userInfo.avatar})` }}>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button type="button" className="profile__edit" onClick={onEditProfile}></button>
            <p className="profile__about">{userInfo.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add" onClick={onAddPlace}></button>
      </section>
      <section className="grid-zona">
        {cards.map((card) => 
          <Card key={card._id} cardData={card} onCardClick={onCardClick} />
        )}
      </section>
    </main>
  );
}

export default Main;