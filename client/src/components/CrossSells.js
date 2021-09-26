import React, {useEffect, useState} from 'react'
import SectionHeader from "./SectionHeader";
import exampleImg1 from "../static/img/example1.png";
import {getDiscounts, getRecommendations} from "../helpers/productFunctions";
import convertToURL from "../helpers/convertToURL";
import settings from "../helpers/settings";

const CrossSells = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getRecommendations()
            .then(res => {
                setProducts(res?.data?.result);
            });
    }, []);

    return <aside className="crossSells">
        <SectionHeader title="Polecane produkty" />
        <main className="productsRow__main">
            {products.map((item, index) => {
                return <a href={`http://localhost:3000/produkt/${convertToURL(item.name)}`} className={index !== 4 && index !== 3 ? "productsRow__main__item" : (index !== 3 ? "productsRow__main__item productsRow__main__item--1200" : "productsRow__main__item productsRow__main__item--996")}>
                    <figure className="productsRow__item__imgWrapper">
                        <img className="productsRow__item__img" src={`${settings.API_URL}/image?url=/media/${item.file_path}`} alt={item.title} />
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

                    <button className="addToCartBtn">
                        Dodaj do koszyka
                    </button>
                </a>
            })}
        </main>
    </aside>
}

export default CrossSells;
