import logo from '../images/header.svg';
import { Route, Link } from 'react-router-dom';

function Header({ login, onLogout }) {
    return (
        <header className="header">
            <img src={logo} alt="Лого" className="header__logo" />
            <nav className="header__nav">
              <Route exact path="/">
                <p className="header__nav_email">{login}</p>
                <button onClick={onLogout} className="header__nav_link header__button">Выйти</button>
              </Route>
              <Route path="/signin">
                <Link to="/signup" className="header__nav_link">Регистрация</Link>
              </Route>
              <Route path="/signup">
                <Link to="/signin" className="header__nav_link">Войти</Link>
              </Route>
            </nav>
        </header>
    )
}

export default Header;