import React from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import IconsSection from "../components/IconsSection";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import example1 from '../static/img/example2.png'
import ProductsRow from "../components/ProductsRow";
import CrossSells from "../components/CrossSells";

const SingleProduct = () => {
    return <div className="container product">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />

        <div className="singleWrapper">
            <SectionHeader title="Suplementy diety" />

            <main className="single">
                <figure className="single__imgWrapper">
                    <img className="single__img" src={example1} alt="title" />
                </figure>
                <article className="single__content">
                    <header className="single__header">
                        <h2 className="single__header__title">
                            Nazwa produktu Aloes Forever
                        </h2>
                        <h3 className="single__header__price">
                            129 PLN
                        </h3>
                    </header>
                    <main className="single__info">
                        <h4 className="single__info__header">
                            Opis produktu
                        </h4>
                        <p className="single__info__p">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet
                        </p>

                        <h4 className="single__info__header">
                            Szczegóły produktu
                        </h4>
                        <p className="single__info__p">
                            <b>Smak:</b> brzoskwiniowy<br/>
                            <b>Pojemność:</b> 100 ml
                        </p>
                    </main>
                    <button className="button button--singleAddToCart">
                        Dodaj do koszyka
                    </button>
                </article>
            </main>

            <CrossSells />
        </div>

        <IconsSection />
        <Footer />
    </div>
}

export default SingleProduct;
