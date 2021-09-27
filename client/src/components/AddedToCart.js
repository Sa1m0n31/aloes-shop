import React, { useRef } from 'react'
import addToCartIcon from '../static/img/add-to-cart.png'
import closeIcon from '../static/img/close.png'

const AddedToCart = () => {
    const modalRef = useRef(null);

    const closeModal = () => {
        modalRef.current.style.opacity = "0";
        setTimeout(() => {
            modalRef.current.style.zIndex = "-2";
        }, 500);
    }

    return <section className="addedToCart" ref={modalRef}>
        <main className="addedToCart__inner">
            <button className="addedToCart__close" onClick={() => { closeModal() }}>
                <img className="addedToCart__close__img" src={closeIcon} alt="zamknij" />
            </button>

            <img className="addedToCart__img" src={addToCartIcon} alt="dodano-do-koszyka" />
            <h3 className="addedToCart__header">
                Twój produkt został dodany do koszyka
            </h3>

            <section className="addedToCart__buttons">
                <button className="button button--addedToCart" onClick={closeModal}>
                    Kontynuuj zakupy
                </button>
                <a className="button button--addedToCart" href="/koszyk">
                    Idź do kasy
                </a>
            </section>
        </main>
    </section>
}

export default AddedToCart;
