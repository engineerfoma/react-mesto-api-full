import React from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js';

import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onTrashClick }) {

    const currentUser = React.useContext(currentUserContext);

    return (
        <main>
            <section className="profile">
                <img src={currentUser?.avatar} alt="Аватар" className="profile__avatar" />
                <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser?.name}</h1>
                    <button type="button" onClick={onEditProfile} className="profile__edit-button hover"></button>
                    <p className="profile__subtitle">{currentUser?.about}</p>
                </div>
                <button type="button" className="profile__add-button hover" onClick={onAddPlace}></button>
            </section>
            <ul className="list">
                {cards.map((item) => {
                    return (
                        <Card
                            card={item}
                            key={item._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onTrashClick={onTrashClick}
                        />)
                })}
            </ul>
        </main>
    )
}

export default Main;