import React, {useState} from 'react'
import lockIcon from '../static/img/lock.svg'
import mailIcon from '../static/img/mail.svg'
import {loginUser} from "../helpers/userFunctions";

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(-1);

    const handleSubmit = (e) => {
        e.preventDefault();

        loginUser(login, password)
            .then(res => {
                if(res.data?.result) {
                    setAuth(1);
                    localStorage.setItem('sec-sessionKey', res.data.sessionKey);
                    localStorage.setItem('sec-user-id', res.data.id);
                    window.location = "/moje-konto"
                }
                else {
                    setAuth(0);
                }
            });
    }

    return <form className="loginForm" onSubmit={(e) => { handleSubmit(e); }}>
        <section className="form__inner">
            <label className="label">
                <img className="label__icon" src={mailIcon} alt="adres-email" />
                <input className="input"
                       name="login"
                       value={login}
                       onChange={(e) => { setLogin(e.target.value); }}
                       placeholder="Login" />
            </label>
            <label className="label">
                <img className="label__icon" src={lockIcon} alt="haslo" />
                <input className="input"
                       type="password"
                       name="password"
                       value={password}
                       onChange={(e) => { setPassword(e.target.value); }}
                       placeholder="Hasło" />
            </label>
        </section>
        <button className="button button--submit">
            Zaloguj się
        </button>

        {auth === 0 ? <span className="error error--login">Nie znaleziono konta o podanym haśle i adresie email</span> : "" }
    </form>
}

export default LoginForm;
