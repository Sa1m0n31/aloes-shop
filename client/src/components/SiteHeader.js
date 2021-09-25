import React from 'react'

import fbIcon from '../static/img/facebook.svg';
import logo from '../static/img/logo-producenta.png';
import searchIcon from '../static/img/search.svg';
import client from '../static/img/user.svg';
import cart from '../static/img/shopping-basket.svg';
import hamburger from '../static/img/hamburger-menu.svg'

const SiteHeader = () => {
    return <header className="siteHeader">
        <section className="siteHeader__top">
            <h4 className="siteHeader__top__header">
                Celina Adamczyk, FBO 2391382
            </h4>
            <a className="siteHeader__top__fb d-desktop" href="#">
                Forever Living na Facebooku
                <img className="siteHeader__top__fb__img" src={fbIcon} alt="facebook" />
            </a>
        </section>

        <section className="siteHeader__bottom">
            <section className="siteHeader__bottom__subsection">
                <a className="siteHeader__companyLink">
                    <img className="siteHeader__companyLink__img" src={logo} alt="forever-living" />
                </a>

                <form className="searchForm">
                    <label className="label--search">
                        <input className="input input--search"
                               placeholder="Wyszukaj produkt..." />
                        <button className="searchForm__btn">
                            <img className="searchForm__icon" src={searchIcon} alt="wyszukaj" />
                        </button>
                    </label>
                </form>
            </section>

            <section className="siteHeader__bottom__subsection">
                LOGO
            </section>

            <section className="siteHeader__bottom__subsection d-desktop">
                <a className="siteHeader__bottom__btn" href="/zaloguj-sie">
                    <img className="siteHeader__bottom__btn__img" src={client} alt="panel-klienta" />
                    Panel klienta
                </a>
                <a className="siteHeader__bottom__btn" href="/koszyk">
                    <img className="siteHeader__bottom__btn__img" src={cart} alt="koszyk" />
                    Twój koszyk
                    <span className="cartPrice">
                        (0.00 PLN)
                    </span>
                </a>
            </section>

            <button className="siteHeader__hamburgerMenu d-mobile">
                <img className="hamburgerMenu__img" src={hamburger} alt="menu" />
            </button>

        </section>
    </header>
}

export default SiteHeader;
