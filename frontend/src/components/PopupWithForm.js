function PopupWithForm({ title, name, buttonName, children, isOpen, onClose, handleSubmit, onOverlayClick }) {

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
            <div className="popup__content popup__content_form">
                <button type="button" className="popup__close hover" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                <form name={`popup${name}`} className="popup__form" onSubmit={handleSubmit}>
                    {children}
                    <button type="submit" className="button__save">{buttonName}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;