import React, { useRef } from 'react'
import closeIcon from "../static/img/close.png";

const StartBaner = () => {
    let modal = useRef(null);

    const closeModal = () => {
        modal.current.style.opacity = "0";
        setTimeout(() => {
            modal.current.style.display = "none";
        }, 500);
    }

    return <aside className="baner" ref={modal}>
        <main className="baner__inner">
            <button className="addedToCart__close" onClick={() => { closeModal() }}>
                <img className="addedToCart__close__img" src={closeIcon} alt="zamknij" />
            </button>

            <h2 className="baner__inner__header">
                To jest prywatna strona Niezależnego Przedsiębiorcy Forever (Forever Business Owner):
            </h2>
            <h3 className="baner__inner__header baner__inner__header--gold">
                Celina Adamczyk, nr FBO 480900114411
            </h3>
            <h4 className="baner__inner__header">
                Adres oficjalnej strony Forever Living Products to:
            </h4>
            <a className="baner__inner__link" href="https://foreverliving.com" rel="noreferrer" target="_blank">
                foreverliving.com
            </a>
        </main>
    </aside>
}

export default StartBaner;
