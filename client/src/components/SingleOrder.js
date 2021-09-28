import React from 'react'
import {getDate, getTime} from "../admin/helpers/formatFunctions";

const SingleOrder = ({id, date, orderStatus, paymentStatus, orderValue}) => {
    return <section className="singleOrder">
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
            <h3 className={paymentStatus.toLowerCase() === "opłacone" ? "singleOrder__item__value uppercase green" : (paymentStatus.toLowerCase() === "za pobraniem" ? "singleOrder__item__value uppercase orange" : "singleOrder__item__value red")}>
                {paymentStatus}
            </h3>
        </section>

        <section className="singleOrder__item">
            <h4 className="singleOrder__item__key">
                Wartość
            </h4>
            <h3 className="singleOrder__item__value uppercase">
                {orderValue} PLN
            </h3>
        </section>
    </section>
}

export default SingleOrder;
