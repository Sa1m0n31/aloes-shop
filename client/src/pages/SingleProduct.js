import React, { useState, useEffect, useContext } from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import IconsSection from "../components/IconsSection";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import example1 from '../static/img/example2.png'
import ProductsRow from "../components/ProductsRow";
import CrossSells from "../components/CrossSells";
import {getProductByName, showAddedToCartModal} from "../helpers/productFunctions";
import {convertToString} from "../helpers/convertToURL";
import axios from 'axios'
import {getProductCategories} from "../admin/helpers/productFunctions";
import {getCategoryById} from "../helpers/categoryFunctions";
import settings from "../helpers/settings";
import { CartContext } from "../App";
import AddedToCart from "../components/AddedToCart";

const SingleProduct = () => {
    const [product, setProduct] = useState("");
    const [gallery, setGallery] = useState([]);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        /* Get product info */
        getProductByName(convertToString(window.location.pathname.split("/")[2]))
            .then(res => {
                const result = res.data?.result;
                console.log(res.data?.result);
                if(result) {
                    const productInfo = result[0];
                    setProduct(productInfo);

                    /* Get product gallery */
                    axios.post(`${settings.API_URL}/product/get-gallery`, {
                        id: productInfo.id
                    })
                        .then(res => {
                            const galleryResult = res.data?.result;
                            if(galleryResult) {
                                setGallery(galleryResult.filter(item => {
                                    return item.file_path;
                                }));
                            }
                        });
                }
            });
    }, []);

    const addProductToCart = (id, title, amount, img, price) => {
        addToCart(id, title, amount, img, price);
        showAddedToCartModal();
    }

    return <div className="container product">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />

        <AddedToCart />

        <div className="singleWrapper">
            <SectionHeader title="Suplementy diety" />

            <main className="single">
                <figure className="single__imgWrapper">
                    <img className="single__img" src={`${settings.API_URL}/image?url=/media/${product.file_path}`} alt="title" />
                </figure>
                <article className="single__content">
                    <header className="single__header">
                        <h2 className="single__header__title">
                            {product.name}
                        </h2>
                        <h3 className="single__header__price">
                            {product.discount ? <span className="single__header__price__crossed">
                                {product.price} PLN
                            </span> : ""}

                            {product.discount ? product.discount : product.price} PLN
                        </h3>
                    </header>
                    <main className="single__info">
                        <h4 className="single__info__header">
                            Opis produktu
                        </h4>
                        <p className="single__info__p" dangerouslySetInnerHTML={{__html: product.description}}>

                        </p>

                        <h4 className="single__info__header">
                            Szczegóły produktu
                        </h4>
                        <p className="single__info__p" dangerouslySetInnerHTML={{__html: product.details}}>

                        </p>
                    </main>
                    {product.stock ? <button className="button button--singleAddToCart" onClick={() => { addProductToCart(product.id, product.name, 1, product.file_path, product.discount ? product.discount : product.price); }}>
                        Dodaj do koszyka
                    </button> : <h3 className="productNotAvailable">
                        Produkt niedostępny
                    </h3>}
                </article>
            </main>

            <CrossSells />
        </div>

        <IconsSection />
        <Footer />
    </div>
}

export default SingleProduct;
