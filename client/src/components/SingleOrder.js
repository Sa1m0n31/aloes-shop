import React, {useEffect, useState} from 'react'
import {getDate, getTime} from "../admin/helpers/formatFunctions";
import arrowDown from '../static/img/arrow-down.svg'
import settings from "../helpers/settings";
import {getPaymentStatus} from "../admin/helpers/paymentFunctions";

const SingleOrder = ({id, sells, date, paymentId, orderStatus, paymentLink, orderValue}) => {
    const [sellsVisible, setSellsVisible] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("Nieopłacone");

    useEffect(() => {
        getPaymentStatus(paymentId)
            .then((res) => {
                console.log(JSON.parse(res.data.result));
                if(JSON.parse(res.data.result).status === "CONFIRMED") {
                    setPaymentStatus("Opłacone");
                }
            })
    }, []);

    return <section className="singleOrderWrapper">
        <section className="singleOrder">
            <section className="singleOrder__item">
                <h4 className="singleOrder__item__key">
                    Id
                </h4>
                <h3 className="singleOrder__item__value">
                    #{id}
                </h3>
            </section>

            <section className="singleOrder__item">
                <h4 className="singleOrder__item__key">
                    Data
                </h4>
                <h3 className="singleOrder__item__value">
                    {getDate(date)}<br/>
                    {getTime(date)}
                </h3>
            </section>

            <section className="singleOrder__item">
                <h4 className="singleOrder__item__key">
                    Status zamówienia
                </h4>
                <h3 className="singleOrder__item__value uppercase">
                    {orderStatus}
                </h3>
            </section>

            <section className="singleOrder__item">
                <h4 className="singleOrder__item__key">
                    Status płatności
                </h4>
                <h3 className={paymentStatus === "Opłacone" ? "singleOrder__item__value uppercase green" : "singleOrder__item__value uppercase red"}>
                    {paymentStatus}
                </h3>
                {paymentStatus !== "Opłacone" ? <a className="singleOrder__paymentLink" href={paymentLink}>
                    Opłać zamówienie
                </a> : ""}
            </section>

            <section className="singleOrder__item">
                <h4 className="singleOrder__item__key">
                    Wartość
                </h4>
                <h3 className="singleOrder__item__value uppercase">
                    {orderValue} PLN
                </h3>
            </section>

            <section className="singleOrder__item">
                <h4 className="singleOrder__item__key">
                    Pokaż produkty
                </h4>
                <button className={sellsVisible ? "singleOrder__item__value singleOrder__item__button rotate180" : "singleOrder__item__value singleOrder__item__button"} onClick={() => { setSellsVisible(!sellsVisible); }}>
                    <img className="singleOrder__item__button__img" src={arrowDown} alt="pokaz-zamowione-produkty" />
                </button>
            </section>
        </section>

        {sellsVisible ? sells?.map((item, index) => {
            return <section key={index} className="singleSell">
                <section className="singleOrder__item">
                    <img className="singleOrder__item__img" src={`${settings.API_URL}/image?url=/media/${item.file_path}`} alt={item.name} />
                </section>

                <section className="singleOrder__item">
                    <h4 className="singleOrder__item__key">
                        Nazwa produktu
                    </h4>
                    <h3 className="singleOrder__item__value">
                        {item.name}
                    </h3>
                </section>

                <section className="singleOrder__item">
                    <h4 className="singleOrder__item__key">
                        Ilość
                    </h4>
                    <h3 className="singleOrder__item__value">
                        {item.quantity}
                    </h3>
                </section>

                <section className="singleOrder__item">
                    <h4 className="singleOrder__item__key">
                        Cena
                    </h4>
                    <h3 className="singleOrder__item__value uppercase">
                        {item.price}
                    </h3>
                </section>

                <section className="singleOrder__item">
                    <h4 className="singleOrder__item__key">
                        Wartość
                    </h4>
                    <h3 className="singleOrder__item__value uppercase">
                        {item.quantity * item.price} PLN
                    </h3>
                </section>
            </section>
        }) : ""}
    </section>
}

export default SingleOrder;
