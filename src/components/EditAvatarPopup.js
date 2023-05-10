import { createRef } from 'react'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
    let avatarInput = createRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarInput.current.value
        });
        avatarInput.current.value = '';
    }

    return (
        <PopupWithForm name="change-avatar" title="Обновить аватар" button="Сохранить"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <div className="popup__wraper">
                <input type="url" name="avatar" required className="popup__item popup__link"
                    placeholder="Ссылка на картинку"
                    defaultValue=""
                    ref={avatarInput}
                    />
                <span className="popup__item-error avatar-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;