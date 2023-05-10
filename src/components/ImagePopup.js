function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_foolscreen-card ${card.name && 'popup_opened'}`} onClick={onClose} >
            <div className="popup__card" onClick={e => e.stopPropagation()} >
                <button className="popup__close" onClick={onClose}></button>
                <img className="popup__card-image" src={card.link} alt={card.name} />
                <h2 className="popup__card-title">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;