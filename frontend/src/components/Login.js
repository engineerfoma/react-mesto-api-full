import { useState } from 'react';
import AuthWithForm from './AuthWithForm';

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            return;
        }
        onLogin(loginData)
    }


    return (
        <AuthWithForm
            title="Вход"
            name="enter"
            buttonName="Войти"
            handleSubmit={handleSubmit}
        >
            <div className="auth__form_item">
                <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="auth__input auth__input_email"
                    minLength="2"
                    maxLength="40"
                    required
                />
            </div>
            <div className="auth__form_item">
                <input
                    type="password"
                    id="password-input"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    className="auth__input auth__input_password"
                    required
                />
            </div>
        </AuthWithForm>
    )
}

export default Login;