import React from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, onOverlayClick }) {
    const currentUser = React.useContext(currentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            buttonName={!isLoading ? 'Сохранить' : 'Сохранение...'}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
            onOverlayClick={onOverlayClick}
        >
            <div className="popup__form_item">
                <input
                    type="text"
                    id="name-input"
                    name="fieldName"
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Имя"
                    className="popup__input popup__input_type_name"
                    required
                    minLength="2"
                    maxLength="40"
                />
                <span className="popup__error popup__error_visible name-input-error">
                </span>
            </div>
            <div className="popup__form_item">
                <input
                    type="text"
                    id="about-me-input"
                    name="fieldAboutMe"
                    value={description}
                    onChange={handleChangeDescription}
                    placeholder="О себе"
                    className="popup__input popup__input_type_about-me"
                    required
                    minLength="2"
                    maxLength="200"
                />
                <span className="popup__error popup__error_visible about-me-input-error">
                </span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;