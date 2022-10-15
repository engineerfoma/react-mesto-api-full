import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ onClose, onCardDelete, cardId, isLoading, onOverlayClick }) {

    function handleSubmit(e) {
        e.preventDefault();

        onCardDelete(cardId);
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="confirm"
            buttonName={!isLoading ? 'Да' : 'Удаление...'}
            isOpen={cardId}
            onClose={onClose}
            handleSubmit={handleSubmit}
            onOverlayClick={onOverlayClick}
        />
    )
}

export default ConfirmDeletePopup;
