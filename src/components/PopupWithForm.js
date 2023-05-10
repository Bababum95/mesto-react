function PopupWithForm({name, title, isOpen, onClose, button, children, onSubmit}) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className="popup__container" onClick={e => e.stopPropagation()} >
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={name} className="popup__form" noValidate onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__save">{button}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;