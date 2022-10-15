import React from "react";
import { currentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onTrashClick }) {

    const currentUser = React.useContext(currentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `hover list-element__trash${isOwn ? '_visible' : '_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `${isLiked ? 'list-element__like list-element__like_active' : 'list-element__like'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function hadnleTrashClick() {
        onTrashClick(card._id);
    }

    return (
        <li className="list-element">
            <img className="list-element__picture pointer" src={card.link} alt={card.name} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={hadnleTrashClick}></button>
            <div className="list-element__header">
                <h2 className="list-element__title">{card.name}</h2>
                <div className="list-element__container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="list-element__counter-likes">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;