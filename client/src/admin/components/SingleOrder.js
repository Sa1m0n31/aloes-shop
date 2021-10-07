import React, {useEffect, useState} from "react";
import {getDate, getTime} from "../helpers/formatFunctions";
import exit from "../static/img/exit.svg";
import {getPaymentStatus} from "../helpers/paymentFunctions";

const SingleOrder = ({item}) => {
    const [paymentStatus, setPaymentStatus] = useState("Nieopłacone");

    useEffect(() => {
        getPaymentStatus(item.przelewy24_id)
            .then((res) => {
                if(JSON.parse(res.data.result).status === "CONFIRMED") {
                    setPaymentStatus("Opłacone");
                }
            })
    }, []);

    return <section className="panelContent__item orderItem">
        <section className="panelContent__column">
            <h4 className="panelContent__column__label">
                Id
            </h4>
            <h3 className="panelContent__column__value">
                {item.id}
            </h3>
        </section>

        <section className="panelContent__column">
            <h4 className="panelContent__column__label">
                Adres email
            </h4>
            <h3 className="panelContent__column__value">
                {item.email}
            </h3>
        </section>

        <section className="panelContent__column">
            <h4 className="panelContent__column__label">
                Data zamówienia
            </h4>
            <h3 className="panelContent__column__value">
                            <span className="dateTime">
                                { getDate(item.date) }
                            </span>
                <span className="dateTime">
                                    { getTime(item.date) }
                            </span>
            </h3>
        </section>

        <section className="panelContent__column">
            <h4 className="panelContent__column__label">
                Płatność
            </h4>
            <h3 className="panelContent__column__value">
                            <span className={paymentStatus === "Opłacone" ? "panelContent__column__status status--positive" : "panelContent__column__status status--negative"}>
                                {paymentStatus === "Opłacone" ? "Opłacone" : "Nieopłacone"}
                            </span>
            </h3>
        </section>

        <section className="panelContent__column">
            <h4 className="panelContent__column__label">
                Status zamówienia
            </h4>
            <h3 className="panelContent__column__value">
                                    <span className={item.order_status.toLowerCase() === "zrealizowane" ? "panelContent__column__status status--positive" : "panelContent__column__status status--negative"}>
                                {item.order_status}
                            </span>
            </h3>
        </section>

        <section className="panelContent__column">
            <h4 className="panelContent__column__label">
                Komentarz
            </h4>
            <h3 className="panelContent__column__value">
                {item.order_comment ? item.order_comment : "BRAK"}
            </h3>
        </section>

        <section className="panelContent__column">
            <h4 className="panelContent__column__label">
                Działania
            </h4>
            <div className="panelContent__column__value panelContent__column__value--buttons">
                <button className="panelContent__column__btn">
                    <a className="panelContent__column__link" href={"/panel/szczegoly-zamowienia?id=" + item.id}>
                        <img className="panelContent__column__icon" src={exit} alt="przejdz" />
                    </a>
                </button>
                {/*<button className="panelContent__column__btn" onClick={() => { openModal(item.id) }}>*/}
                {/*    <img className="panelContent__column__icon" src={trash} alt="usuń" />*/}
                {/*</button>*/}
            </div>
        </section>

    </section>
}

export default SingleOrder;
