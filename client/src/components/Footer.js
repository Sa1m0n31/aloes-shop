import React, {useEffect, useState} from 'react'
import mailIcon from '../static/img/mail.svg'
import {getAllCategories} from "../helpers/categoryFunctions";
import {addEmailToNewsletter} from "../helpers/newsletterFunctions";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [categories, setCategories] = useState([]);
    const [newsletterResponse, setNewsletterResponse] = useState(0);

    useEffect(() => {
        getAllCategories()
            .then(res => {
                if(res.data.result) setCategories(res.data.result);
            })
    }, []);

    const isEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const addToNewsletter = () => {
        if(isEmail(email)) {
            addEmailToNewsletter(email)
                .then(res => {
                    if(res.data.result === 1) {
                        setNewsletterResponse(1);
                        setEmail("");
                    }
                    else {
                        setNewsletterResponse(-1);
                    }
                });
        }
        else {
            setNewsletterResponse(2);
        }
    }

    useEffect(() => {
        if(newsletterResponse !== 0) {
            setTimeout(() => {
                setNewsletterResponse(0);
            }, 3000);
        }
    }, [newsletterResponse]);

    return <footer className="footer">
        <section className="footer__col">
            <h4 className="footer__col__header">
                Nasze produkty
            </h4>
            <ul className="footer__col__list">
                {categories?.map((item, index) => {
                    return <li className="footer__col__list__item" key={index}>
                        <a className="footer__col__list__link" href={`/sklep/${item.permalink}`} >
                            {item.name}
                        </a>
                    </li>

                })}
            </ul>
        </section>

        <section className="footer__col">
            <h4 className="footer__col__header">
                Informacje
            </h4>
            <ul className="footer__col__list">
                <li className="footer__col__list__item">
                    <a className="footer__col__list__link" href="/regulamin">
                        Regulamin
                    </a>
                </li>
                <li className="footer__col__list__item">
                    <a className="footer__col__list__link" href="/polityka-prywatnosci">
                        Polityka prywatności
                    </a>
                </li>
            </ul>
        </section>

        <section className="footer__col d-1600">
            <h4 className="footer__col__header">
                Klient
            </h4>
            <ul className="footer__col__list">
                <li className="footer__col__list__item">
                    <a className="footer__col__list__link" href="/zaloguj-sie">
                        Panel klienta
                    </a>
                </li>
                <li className="footer__col__list__item">
                    <a className="footer__col__list__link" href="/zarejestruj-sie">
                        Rejestracja
                    </a>
                </li>
                <li className="footer__col__list__item">
                    <a className="footer__col__list__link" href="/koszyk">
                        Mój koszyk
                    </a>
                </li>
            </ul>
        </section>

        <section className="footer__col">
            <h4 className="footer__col__header">
                Zapisz się do newslettera
            </h4>

            <section className="footer__newsletter">
                {!newsletterResponse ? <>
                    <img className="footer__newsletter__icon" src={mailIcon} alt="adres-email" />
                    <input className="input--newsletter"
                           name="newsletter"
                           value={email}
                           placeholder="Adres e-mail"
                           onChange={(e) => { setEmail(e.target.value); }} />
                    <button className="button button--newsletter" onClick={() => { addToNewsletter(); }}>
                        Zapisz się
                    </button>
                </> : <h4 className="newsletterResponse">
                    {newsletterResponse === 2 ? "Proszę podać poprawny adres e-mail" : newsletterResponse === 1 ? "Dziękujemy za zapisanie się do naszego newslettera" : "Podany adres e-mail jest już zapisany do naszego newslettera"}
                </h4>}
            </section>
        </section>

        <section className="footer__col footer__col--right">
            <h4 className="footer__col__header">
                Kontakt ze sklepem
            </h4>
            <ul className="footer__col__list">
                <li className="footer__col__list__item">
                    Sklep Taki
                </li>
                <li className="footer__col__list__item">
                    ul. Taka 92
                </li>
                <li className="footer__col__list__item">
                    12-456 Takowo
                </li>
                <li className="footer__col__list__item">
                    tel. 231 282 021
                </li>
                <li className="footer__col__list__item">
                    e-mail: biuro@taki.pl
                </li>
            </ul>
        </section>

        <aside className="footer__bottom">
            <h6 className="footer__bottom__header">
                &copy; { new Date().getFullYear() } Sklep.pl
            </h6>
            <h6 className="footer__bottom__header">
                Projekt i wykonanie: <a href="https://skylo.pl">skylo.pl</a>
            </h6>
        </aside>
    </footer>
}

export default Footer;
