import Union from '../images/Union.svg';
import UnionErr from '../images/Union_err.svg';

function InfoTooltip({ isOpen, onClose, onOverlayClick, access}) {
  return (
    <div className={`popup popup_tooptip ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
      <div className="popup__content popup__content_tooltip">
        <img src={`${access ? Union : UnionErr}`} alt="уведомление" className="popup__content_tooltip-img"/>
        <button type="button" className="popup__close hover" onClick={onClose}></button>
        <p className="popup__content_tooltip-text">{`${access ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</p>
      </div>
    </div>  
  )
}

export default InfoTooltip;