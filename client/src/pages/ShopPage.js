import React, {useState, useEffect} from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import HeroSection from "../components/HeroSection";
import ProductsRow from "../components/ProductsRow";
import AboutProducent from "../components/AboutProducent";
import IconsSection from "../components/IconsSection";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import exampleImg1 from "../static/img/example1.png";
import CrossSells from "../components/CrossSells";

const ShopPage = () => {
    const [lowest, setLowest] = useState(false);
    const [highest, setHighest] = useState(false);

    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(999);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts([
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                beforeDiscountPrice: 109.99,
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                beforeDiscountPrice: 109.99,
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                beforeDiscountPrice: 109.99,
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                beforeDiscountPrice: 109.99,
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                beforeDiscountPrice: 109.99,
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                price: 99.99
            },
            {
                img: exampleImg1,
                title: "Aloe Vera Gel",
                subtitle: "Sok aloesowy pyszny",
                beforeDiscountPrice: 109.99,
                price: 99.99
            }
        ])
    }, []);

    return <div className="container shop">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <main className="shop__inner">
            <SectionHeader title="Suplementy diety" />
            <header className="shopFilters">
                <h3 className="shopFilters__header">
                    Filtrowanie
                </h3>
                <section className="shopFilters__buttons">
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setLowest(!lowest); }}>
                            {lowest ? <span className="checkBtn--check"></span> : ""}
                        </button>
                        Od najniższej
                    </label>
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setHighest(!highest); }}>
                            {highest ? <span className="checkBtn--check"></span> : ""}
                        </button>
                        Od najwyższej
                    </label>

                    <section className="filterRange">
                        <span className="filterBetween">Zakres:</span>
                        <label className="label label--price">
                            <input className="input"
                                   type="number"
                                   value={fromPrice}
                                   onChange={(e) => { setFromPrice(e.target.value); }} />
                        </label>
                        <span className="filterBetween">-</span>
                        <label className="label label--price">
                            <input className="input"
                                   type="number"
                                   value={toPrice}
                                   onChange={(e) => { setToPrice(e.target.value); }} />
                        </label>
                    </section>
                </section>
            </header>
            <main className="productsRow__main">
                {products.map((item, index) => {
                    return <a className={index !== 4 && index !== 3 ? "productsRow__main__item" : (index !== 3 ? "productsRow__main__item productsRow__main__item--1200" : "productsRow__main__item productsRow__main__item--996")}>
                        <figure className="productsRow__item__imgWrapper">
                            <img className="productsRow__item__img" src={item.img} alt={item.title} />
                        </figure>
                        <h3 className="productsRow__item__title">
                            {item.title}
                        </h3>
                        <h4 className="productsRow__item__subtitle">
                            {item.subtitle}
                        </h4>
                        <section className="productsRow__item__prices">
                            {item.beforeDiscountPrice ? <span className="priceBeforeDiscount">
                            {item.beforeDiscountPrice} PLN
                        </span> : ""}
                            <span className="price">
                            {item.price} PLN
                        </span>
                        </section>

                        <button className="addToCartBtn">
                            Dodaj do koszyka
                        </button>
                    </a>
                })}
            </main>

            <AboutProducent shop={true} />

            <CrossSells />
        </main>

        <IconsSection />
        <Footer />
    </div>
}

export default ShopPage;
