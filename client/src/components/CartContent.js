import React, { useContext, useEffect, useState } from 'react'
import EmptyCart from "./EmptyCart";
import settings from "../helpers/settings";
import { CartContext } from '../App';
import trashIcon from '../static/img/trash.svg'
import SectionHeader from "./SectionHeader";
import example from '../static/img/example3.png'

const CartContent = () => {
    const { editCart, removeFromCart } = useContext(CartContext);

    const [sum, setSum] = useState(0);
    const [remove, setRemove] = useState(false);
    const [currentCart, setCurrentCart] = useState([1]);

    useEffect(() => {
        calculateCartSum();
    }, []);

    useEffect(() => {
        calculateCartSum();
        setCurrentCart([1]);
    }, [remove]);

    const calculateCartSum = () => {
        let sum = 0;
        // currentCart?.forEach((item, index, array) => {
        //     sum += item.price * item.amount;
        //     if(index === array.length-1) setSum(sum);
        // });
    }

    useEffect(() => {
        calculateCartSum();
    }, [currentCart]);

    const handleInputClick = (e) => {
        e.target.select();
    };

    return <section className="cartContent">
        {/*cartContent?.length */ 1 ? <main className="page cart">
            <SectionHeader title="Twój koszyk" />

            <main className="cart__content">
                {currentCart.map((item, index) => {
                    return <section className="cart__item">
                        <section className="cart__item__section">
                            <img className="cart__item__img" src={example} alt="title"/>

                            <h3 className="cart__item__title d-none d-md-block">
                                <h3 className="cart__item__key">
                                    Nazwa
                                </h3>
                                <h4 className="cart__item__value">
                                    Aloes
                                </h4>
                            </h3>
                        </section>

                        <h3 className="cart__item__title cart__item__title--price">
                            <h3 className="cart__item__key">
                                Cena
                            </h3>
                            <h4 className="cart__item__value">
                                123 PLN
                            </h4>
                        </h3>

                        <label className="cart__item__amount">
                            Ilość:
                            <input className="cart__item__input"
                                   name={item.uuid}
                                   value={item.amount}
                                   onClick={(e) => { handleInputClick(e); }}
                                   type="number"/>
                        </label>

                        <section className="cart__item__price cart__item__price--value">
                            <h3 className="cart__item__key">
                                Wartość
                            </h3>
                            <h4 className="cart__item__value">
                                246 PLN
                            </h4>
                        </section>

                        <button className="removeFromCartBtn"
                                onClick={() => { removeFromCart(item.uuid); setRemove(!remove); }}
                        >
                            <img className="removeFromCartBtn__img" src={trashIcon} alt="usun" />
                        </button>
                    </section>
                })}

                <section className="cart__item__price">
                    <h3 className="cart__item__key">
                        Podsumowanie
                    </h3>
                    <h4 className="cart__item__value">
                        {sum} PLN
                    </h4>
                </section>
            </main>
            <a href="/zamowienie" className="button button--cart">
                Finalizacja zamówienia
            </a>
        </main> : <EmptyCart />}
    </section>
}

export default CartContent;
