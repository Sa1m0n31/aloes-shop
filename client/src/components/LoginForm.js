import React, {useState} from 'react'
import lockIcon from '../static/img/lock.svg'
import mailIcon from '../static/img/mail.svg'

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return <form className="loginForm">
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
    </form>
}

export default LoginForm;
