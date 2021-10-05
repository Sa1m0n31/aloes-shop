import React, {useRef, useEffect, useState, useContext} from 'react'
import { CartContext } from "../App";
import fbIcon from '../static/img/facebook.svg';
import logo from '../static/img/logo-producenta.png';
import searchIcon from '../static/img/search.svg';
import client from '../static/img/user.svg';
import cart from '../static/img/shopping-basket.svg';
import hamburger from '../static/img/hamburger-menu.svg'
import closeIcon from '../static/img/close.png'
import caloeLogo from '../static/img/caloe-logo.png'
import {getAllCategories} from "../helpers/categoryFunctions";

const SiteHeader = () => {
    const [cartSum, setCartSum] = useState(0.00);
    const [search, setSearch] = useState("");

    const mobileMenu = useRef(null);
    const mobileMenuList = useRef(null);
    const mobileMenuClose = useRef(null);

    const { cartContent } = useContext(CartContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(res => {
                setCategories(res?.data?.result);
            });

        let sum = 0;
        cartContent?.forEach((item, index, array) => {
            sum += item.amount * item.price;
            if(index === array.length-1) setCartSum(sum);
        });
    }, []);

    const closeMenu = () => {
        mobileMenuClose.current.style.opacity = "0";
        mobileMenuList.current.style.opacity = "0";
        setTimeout(() => {
            mobileMenu.current.style.transform = "scaleX(0)";
        }, 500);
    }

    const openMenu = () => {
        mobileMenu.current.style.transform = "scaleX(1)";
        setTimeout(() => {
            mobileMenuClose.current.style.opacity = "1";
            mobileMenuList.current.style.opacity = "1";
        }, 500);
    }

    return <header className="siteHeader">
        <section className="siteHeader__top">
            <h4 className="siteHeader__top__header">
                Celina Adamczyk, FBO 480900114411
            </h4>
            <a className="siteHeader__top__fb d-desktop" target="_blank" href="https://www.facebook.com/ForeverPolandHQ">
                Forever Living na Facebooku
                <img className="siteHeader__top__fb__img" src={fbIcon} alt="facebook" />
            </a>
        </section>

        <section className="siteHeader__bottom">
            <section className="siteHeader__bottom__subsection">
                <a className="siteHeader__companyLink" href="/">
                    <img className="siteHeader__companyLink__img" src={logo} alt="forever-living" />
                </a>

                <form className="searchForm" method="GET" action="/szukaj">
                    <label className="label--search">
                        <input className="input input--search"
                               name="search"
                               value={search}
                               onChange={(e) => { setSearch(e.target.value); }}
                               placeholder="Wyszukaj produkt..." />
                        <a className="searchForm__btn" href={`/szukaj?search=${search}`}>
                            <img className="searchForm__icon" src={searchIcon} alt="wyszukaj" />
                        </a>
                    </label>
                </form>
            </section>

            <section className="siteHeader__bottom__subsection">
                <img className="siteHeader__caloeLogo" src={caloeLogo} alt="caloe-produkty-aloesowe" />
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
                        ({cartSum} PLN)
                    </span>
                </a>
            </section>

            <button className="siteHeader__hamburgerMenu d-mobile" onClick={() => { openMenu(); }}>
                <img className="hamburgerMenu__img" src={hamburger} alt="menu" />
            </button>
        </section>

        <menu className="mobileMenu d-mobile" ref={mobileMenu}>
            <button className="closeMenuBtn" onClick={() => { closeMenu(); }} ref={mobileMenuClose}>
                <img className="closeMenuBtn__img" src={closeIcon} alt="zamknij" />
            </button>

            <ul className="mobileMenu__list" ref={mobileMenuList}>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/">
                        Strona główna
                    </a>
                </li>

                {categories?.map((item, index) => {
                    return  <li key={index} className="mobileMenu__list__item">
                        <a className="mobileMenu__list__link" href={`/sklep/${item.permalink}`}>
                            {item.name}
                        </a>
                    </li>
                })}
            </ul>
        </menu>
    </header>
}

export default SiteHeader;
