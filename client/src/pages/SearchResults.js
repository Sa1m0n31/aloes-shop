import React, {useContext, useEffect, useState} from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import AddedToCart from "../components/AddedToCart";
import SectionHeader from "../components/SectionHeader";
import searchIcon from "../static/img/search.svg";
import settings from "../admin/helpers/settings";
import convertToURL from "../helpers/convertToURL";
import AboutProducent from "../components/AboutProducent";
import CrossSells from "../components/CrossSells";
import IconsSection from "../components/IconsSection";
import Footer from "../components/Footer";
import {CartContext} from "../App";
import {getAllCategories, getCategoryBySlug} from "../admin/helpers/categoriesFunctions";
import {getProductsByCategory, showAddedToCartModal} from "../helpers/productFunctions";
import {getAllProducts} from "../admin/helpers/productFunctions";
import {productSearchForUser} from "../admin/helpers/search";

const SearchResult = () => {
    const [filter, setFilter] = useState(-1);
    const [search, setSearch] = useState("");

    const [loaded, setLoaded] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("Sklep");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        /* Set search value */
        const params = new URLSearchParams(window.location.search);
        setSearch(params.get('search'));

        /* Get all products */
        getAllProducts()
            .then(res => {
                if(res?.data?.result) {
                    setProducts(res.data.result);
                    setFilteredProducts(res.data.result);
                    initialSearch(res.data.result, params.get('search'));
                    setLoaded(true);
                }});
    }, []);

    const sortArray = (products, lowest) => {
        if(lowest) {
            return products.sort((a, b) => {
                const aPrice = a.discount ? a.discount : a.price;
                const bPrice = b.discount ? b.discount : b.price;
                return aPrice - bPrice;
            });
        }
        else {
            return products.sort((a, b) => {
                const aPrice = a.discount ? a.discount : a.price;
                const bPrice = b.discount ? b.discount : b.price;
                return bPrice - aPrice;
            });
        }
    }

    const sortProducts = (lowest) => {
        setFilteredProducts(sortArray(products, lowest));
    }

    const addProductToCart = (e, id, title, amount, img, price) => {
        e.preventDefault();
        addToCart(id, title, amount, img, price);
        showAddedToCartModal();
    }

    const searchProducts = (e = null) => {
        setSearch(e.target.value);
        setFilteredProducts(productSearchForUser(products, e.target.value));
    }

    const initialSearch = (initialProducts, initialStr) => {
        setFilteredProducts(productSearchForUser(initialProducts, initialStr));
    }

    return <div className="container search">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />

        <main className="shop__inner">
            <SectionHeader title="Wyniki wyszukiwania" />
            <header className="shopFilters">
                <section>
                    <h3 className="shopFilters__header">
                        Filtrowanie
                    </h3>
                    <section className="shopFilters__buttons">
                        <label className="label--vat">
                            <button type="button" className="checkBtn" onClick={() => { setFilter(0); sortProducts(true); }}>
                                {filter === 0 ? <span className="checkBtn--check"></span> : ""}
                            </button>
                            Od najniższej ceny
                        </label>
                        <label className="label--vat">
                            <button type="button" className="checkBtn" onClick={() => { setFilter(1); sortProducts(false); }}>
                                {filter === 1 ? <span className="checkBtn--check"></span> : ""}
                            </button>
                            Od najwyższej ceny
                        </label>
                    </section>
                </section>

                <section className="filterSection--second">
                    <h3 className="shopFilters__header">
                        Wyszukiwanie
                    </h3>
                    <section className="shopFilters__buttons shopFilters__buttons--extraMargin">
                        <label className="label">
                            <input className="input"
                                   name="search"
                                   value={search}
                                   onChange={(e) => { searchProducts(e); }}
                                   placeholder="Wpisz szukaną frazę" />
                            <img className="searchForm__icon" src={searchIcon} alt="wyszukaj" />
                        </label>
                    </section>
                </section>
            </header>
            <main className="productsRow__main">
                {filteredProducts?.length ? filteredProducts.map((item, index) => {
                    return <a key={index} href={`${settings.homepage}/produkt/${convertToURL(item.name)}`} className={index !== 4 && index !== 3 ? "productsRow__main__item" : (index !== 3 ? "productsRow__main__item productsRow__main__item--1200" : "productsRow__main__item productsRow__main__item--996")}>
                        <figure className="productsRow__item__imgWrapper">
                            <img className="productsRow__item__img" src={settings.API_URL + "/image?url=/media/" + item.image} alt={item.title} />
                            {item.discount ? <span className="product__discount">
                            Promocja
                        </span> : ""}
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

                        <button className="addToCartBtn" onClick={(e) => { addProductToCart(e, item.product_id, item.name, 1, item.image, item.discount ? item.discount : item.price); }}>
                            Dodaj do koszyka
                        </button>
                    </a>
                }) : <div className="emptySearch">
                    <h3 className="noProducts">
                        Nic nie znaleziono...
                    </h3>
                    <a href="/sklep" className="button button--emptySearch">
                        Wróć do sklepu
                    </a>
                </div>}
            </main>

            <AboutProducent shop={true} />

            <CrossSells />
        </main>

        <IconsSection />
        <Footer />

        <AddedToCart />
    </div>
}

export default SearchResult;
