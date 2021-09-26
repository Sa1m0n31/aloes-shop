import React from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";

const TyPage = () => {
    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <main className="tyPage">
            <SectionHeader title="Zamówienie zostało złożone" />

            <h2 className="tyPage__header">
                Dziękujemy za złożenie zamówienia
            </h2>
            <h2 className="tyPage__header tyPage__header--noMarginTop">
                O jego szczegółach będziemy Cię informować drogą mailową
            </h2>
            <a className="button button--ty" href="/">
                Powrót na stronę główną
            </a>
        </main>
        <Footer />
    </div>
}

export default TyPage;
