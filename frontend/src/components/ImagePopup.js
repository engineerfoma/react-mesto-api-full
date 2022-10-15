function ImagePopup({ card, onClose, onOverlayClick }) {
    return (
        <div className={`popup popup_card ${card ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
            <div className="popup__content popup__content_place">
                <img className="popup__img" src={`${card ? card.link : ''}`} alt={`${card ? card.name : ''}`} />
                <button type="button" className="popup__close popup__close_card hover" onClick={onClose}></button>
                <p className="popup__title popup__title_card">{`${card ? card.name : ''}`}</p>
            </div>
        </div>
    )
}

export default ImagePopup;