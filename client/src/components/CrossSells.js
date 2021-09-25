import React from 'react'
import SectionHeader from "./SectionHeader";
import exampleImg1 from "../static/img/example1.png";

const CrossSells = () => {
    const products = [
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
    ]

    return <aside className="crossSells">
        <SectionHeader title="Polecane produkty" />
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
    </aside>
}

export default CrossSells;
