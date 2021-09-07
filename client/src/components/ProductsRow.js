import React, { useState, useEffect } from 'react'

import exampleImg1 from '../static/img/example1.png';
import exampleImg2 from '../static/img/example2.png';
import exampleImg3 from '../static/img/example3.png';

const ProductsRow = ({title}) => {
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
            }
        ])
    }, []);

    return <section className="productsRow">
        <h2 className="productsRow__header">
            {title}
        </h2>

        <main className="productsRow__main">
            {products.map((item) => {
                return <a className="productsRow__main__item">
                    <img className="productsRow__item__img" src={item.img} alt={item.title} />
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
    </section>
}

export default ProductsRow;
