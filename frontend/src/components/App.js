import React, { useState, useEffect } from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as Auth from '../utils/Auth.js';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [cardDelete, setCardDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const [login, setLogin] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAccess, setIsAccess] = useState(false);


    const openedPopup =
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        isEditAvatarPopupOpen ||
        cardDelete ||
        selectedCard ||
        isTooltipPopupOpen;

    const history = useHistory();

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsTooltipPopupOpen(false);
        setCardDelete(null);
        setSelectedCard(null)
    }

    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            closeAllPopups();
        }
    }

    useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn, history])


    function onLogin(data) {
        return Auth
            .authorize(data)
            .then(() => {
                setLogin(data.email);
                setLoggedIn(true);
            })
            .catch(err => {
                setIsAccess(false);
                setIsTooltipPopupOpen(true);
                return `${err}: ${err.message}`;
            })
    }

    function onRegister(data) {
        return Auth
            .register(data)
            .then(() => {
                setIsTooltipPopupOpen(true);
                setIsAccess(true);
                history.push('/sign-in');
            })
            .catch(err => {
                setIsAccess(false);
                setIsTooltipPopupOpen(true);
                return `${err}: ${err.message}`;
            })
    }

    function onLogout() {
        return Auth
            .signOut()
            .then(() => {
                setLoggedIn(false);
                history.push('/sign-in');
            })
            .catch(err => `${err}: ${err.message}`);
    }

    useEffect(() => {
        function handleEscClose(e) {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (openedPopup) {
            document.addEventListener('keydown', handleEscClose);
            return () => document.removeEventListener('keydown', handleEscClose);
        }

    }, [openedPopup])

    function handleEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function hadnleTrashClick(cardId) {
        setCardDelete(cardId);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.setUserInfo(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar({ avatar }) {
        setIsLoading(true);
        api.setAvatar({ avatar })
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit({ title, link }) {
        setIsLoading(true);
        api.addCard({ title, link })
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards(state => state.map(c => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleCardDelete(cardId) {
        setIsLoading(true);
        api.deleteCard(cardId._id)
            .then(() => {
                setCards(state => state.filter(a => a._id !== cardId._id));
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setCurrentUser(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
        api.getCards()
            .then(res => {
                setCards(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, [loggedIn])

    return (
        <currentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    login={login}
                    onLogout={onLogout}
                />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatar}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onTrashClick={hadnleTrashClick}
                    />
                    <Route path="/sign-in">
                        <Login
                            onLogin={onLogin}
                        />
                    </Route>
                    <Route path="/sign-up">
                        <Register
                            onRegister={onRegister}
                        />
                    </Route>
                    <Route>
                        {loggedIn ? (
                            <Redirect to="/" />
                        ) : (
                            <Redirect to="/sign-in" />
                        )}
                    </Route>

                </Switch>
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                    onOverlayClick={handleOverlayClick}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                    onOverlayClick={handleOverlayClick}
                />
                <ConfirmDeletePopup
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    cardId={cardDelete}
                    isLoading={isLoading}
                    onOverlayClick={handleOverlayClick}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                    onOverlayClick={handleOverlayClick}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    onOverlayClick={handleOverlayClick}
                />
                <InfoTooltip
                    isOpen={isTooltipPopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClick={handleOverlayClick}
                    access={isAccess}
                />
            </div>
        </currentUserContext.Provider >
    );
}

export default App;