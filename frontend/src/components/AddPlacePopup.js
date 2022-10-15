import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onOverlayClick }) {
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setTitle('');
        setLink('')
    }, [isOpen]);

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangelink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            title: title,
            link: link
        })
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            buttonName={!isLoading ? 'Создать' : 'Создание...'}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
            onOverlayClick={onOverlayClick}
        >
            <div className="popup__form_item">
                <input
                    type="text"
                    id="title-input"
                    name="fieldTitle"
                    value={title}
                    onChange={handleChangeTitle}
                    placeholder="Название"
                    className="popup__input popup__input_title"
                    required
                    minLength="2"
                    maxLength="30"
                />
                <span className="popup__error popup__error_visible title-input-error">
                </span>
            </div>
            <div className="popup__form_item">
                <input
                    type="url"
                    id="link-input"
                    name="fieldSource"
                    value={link}
                    onChange={handleChangelink}
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_source"
                    required
                />
                <span className="popup__error link-input-error">
                </span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;