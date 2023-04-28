function PopupWithForm({name, title, isOpen, onClose, button, children}) {
    return (
        <div className={`popup popup_${name} ${isOpen? 'popup_opened': ""}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={name} className="popup__form" noValidate>
                    {children}
                    <button type="submit" className="popup__save">{button}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;