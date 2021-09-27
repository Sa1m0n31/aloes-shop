import React, {useState, useEffect, useContext} from 'react'
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
import {getAllCategories, getCategoryBySlug} from "../admin/helpers/categoriesFunctions";
import settings from "../admin/helpers/settings";
import axios from "axios";
import {getProductsByCategory, showAddedToCartModal} from "../helpers/productFunctions";
import {getAllProducts} from "../admin/helpers/productFunctions";
import { CartContext } from '../App'
import AddedToCart from "../components/AddedToCart";
import convertToURL from "../helpers/convertToURL";

const ShopPage = () => {
    const [lowest, setLowest] = useState(false);
    const [highest, setHighest] = useState(false);

    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(999);

    const [loaded, setLoaded] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("Sklep");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        /* Get categories */
        getAllCategories()
            .then(res => {
                if(res?.data?.result) {
                    setCategories(res.data.result);
                }
            });

        /* Get current category */
        const urlPathArray = window.location.pathname.split("/");
        const categorySlug = urlPathArray[urlPathArray.length-1];
            getCategoryBySlug(categorySlug)
            .then(res => {
                if(res.data.result[0]) {
                    /* Category page => Get products of current category */
                    setCurrentCategory(res.data.result[0]?.name);
                    getProductsByCategory(res.data.result[0]?.id)
                        .then(res => {
                            if(res?.data?.result) {
                                setProducts(res.data.result);
                                setLoaded(true);
                            }
                        });
                }
                else {
                    /* Shop page => Get all products */
                    getAllProducts()
                        .then(res => {
                            if(res?.data?.result) {
                                console.log(res.data.result);
                                setProducts(res.data.result);
                                setLoaded(true);
                            }
                        });
                }
            });
    }, []);

    const addProductToCart = (e, id, title, amount, img, price) => {
        e.preventDefault();
        addToCart(id, title, amount, img, price);
        showAddedToCartModal();
    }

    return <div className="container shop">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />

        <AddedToCart />

        <main className="shop__inner">
            <SectionHeader title={currentCategory} />
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
                    return <a href={`${settings.homepage}/produkt/${convertToURL(item.name)}`} className={index !== 4 && index !== 3 ? "productsRow__main__item" : (index !== 3 ? "productsRow__main__item productsRow__main__item--1200" : "productsRow__main__item productsRow__main__item--996")}>
                        <figure className="productsRow__item__imgWrapper">
                            <img className="productsRow__item__img" src={settings.API_URL + "/image?url=/media/" + item.image} alt={item.title} />
                        </figure>
                        <h3 className="productsRow__item__title">
                            {item.name}
                        </h3>
                        <h4 className="productsRow__item__subtitle">
                            {item.subtitle}
                        </h4>
                        <section className="productsRow__item__prices">
                            {item.discount ? <span className="priceBeforeDiscount">
                            {item.price} PLN
                        </span> : ""}
                            <span className="price">
                            {item.discount ? item.discount : item.price} PLN
                        </span>
                        </section>

                        <button className="addToCartBtn" onClick={(e) => { addProductToCart(e, item.id, item.name, 1, item.image, item.discount ? item.discount : item.price); }}>
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
