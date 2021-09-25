import React from 'react'
import search from '../static/img/search-mobile.svg'
import user from '../static/img/user-mobile.svg'
import cart from '../static/img/shopping-basket-mobile.svg'

const SiteHeaderMobile = () => {
    return <menu className="siteHeaderMobile d-mobile">
        <a className="siteHeaderMobile__link" href="/szukaj">
            <img className="siteHeaderMobile__link__img" src={search} alt="szukaj" />
        </a>

        <a className="siteHeaderMobile__link" href="/zarejestruj-sie">
            <img className="siteHeaderMobile__link__img" src={user} alt="panel-klienta" />
        </a>

        <a className="siteHeaderMobile__link" href="/koszyk">
            <img className="siteHeaderMobile__link__img" src={cart} alt="koszyk" />
        </a>
    </menu>
}

export default SiteHeaderMobile;
