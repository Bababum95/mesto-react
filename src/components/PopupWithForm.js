function PopupWithForm({name, title, isOpen, onClose, children}) {
    return (
        <div className={`popup popup_${name} ${isOpen? 'popup_opened': ""}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={name} className="popup__form" noValidate>
                    {children}
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;