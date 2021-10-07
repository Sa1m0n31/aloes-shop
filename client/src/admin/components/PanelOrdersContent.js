import React, { useEffect, useState } from 'react'

import trash from '../static/img/trash.svg'
import exit from '../static/img/exit.svg'
import searchImg from '../static/img/search.svg'

import {deleteOrderById, getAllOrders} from "../helpers/orderFunctions";
import { getDate, getTime } from "../helpers/formatFunctions";
import { orderSearch, sortByDate } from "../helpers/search";
import closeImg from "../static/img/close.png";
import Modal from "react-modal";
import {getPaymentStatus} from "../helpers/paymentFunctions";
import SingleOrder from "./SingleOrder";

const PanelOrdersContent = () => {
    const [orders, setOrders] = useState([]);
    const [sorting, setSorting] = useState(0);
    const [modal, setModal] = useState(false);
    const [candidate, setCandidate] = useState(0);
    const [deleteMsg, setDeleteMsg] = useState("");

    const [filterOplacone, setFilterOplacone] = useState(true);
    const [filterNieoplacone, setFilterNieoplacone] = useState(true);
    const [paymentStatuses, setPaymentStatuses] = useState([]);

    useEffect(() => {
        getAllOrders()
            .then(res => {
                const result = res.data.result;
                setOrders(result);
                sessionStorage.setItem('skylo-e-commerce-orders', JSON.stringify(result));
                let tmpPaymentStatuses = [];
                console.log(result);
                result.forEach(async (item, index, array) => {
                    console.log(item);
                    await getPaymentStatus(item.przelewy24_id)
                        .then((res) => {
                            console.log(res.data.result);
                            tmpPaymentStatuses.push(JSON.parse(res.data.result).status);
                            if(index === array.length-3) {
                                console.log("end");
                                setPaymentStatuses(tmpPaymentStatuses);
                            }
                        });
                })
            });
    }, [deleteMsg]);

    const search = (e) => {
        const filteredOrders = orderSearch(e.target.value);
        setOrders(filteredOrders);
    }

    const deleteOrder = () => {
        deleteOrderById(candidate)
            .then(res => {
                if(res.data.result) setDeleteMsg("Zamówienie zostało usunięte");
                else setDeleteMsg("Coś poszło nie tak... Prosimy spróbować później");
            })
    }

    const openModal = (id) => {
        setCandidate(id);
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setDeleteMsg("");
    }

    useEffect(() => {
        console.log(paymentStatuses);
    }, [paymentStatuses]);

    return <main className="panelContent">
        <Modal
            portalClassName="panelModal"
            isOpen={modal}>

            {deleteMsg === "" ? <>
                <h2 className="modalQuestion">
                    Czy na pewno chcesz usunąć to zamówienie?
                </h2>

                <section className="modalQuestion__buttons">
                    <button className="modalQuestion__btn" onClick={() => { deleteOrder() }}>
                        Tak
                    </button>
                    <button className="modalQuestion__btn" onClick={() => { closeModal() }}>
                        Nie
                    </button>
                </section>
            </> : <h2 className="modalQuestion">
                {deleteMsg}
            </h2>}

            <button className="modalClose" onClick={() => { closeModal() }}>
                <img className="modalClose__img" src={closeImg} alt="zamknij" />
            </button>
        </Modal>

        <header className="panelContent__header">
            <h1 className="panelContent__header__h">
                Zamówienia
            </h1>
        </header>

        <main className="panelContent__contentWrapper">
            <header className="panelContent__filters">
                <section className="panelContent__filters__item">
                    <span className="panelContent__filters__label">
                        Wyszukiwanie:
                    </span>
                    <label className="panelContent__input__label">
                        <input className="panelContent__input"
                               placeholder="Szukaj..."
                               onChange={(e) => { search(e) }}
                               name="search" />

                        <span className="panelContent__input__span">
                            <img className="panelContent__input__icon" src={searchImg} alt="szukaj" />
                        </span>
                    </label>
                </section>

                <section className="panelContent__filters__item">
                    <span className="panelContent__filters__label">
                        Sortuj wg daty:
                    </span>

                    <button className={sorting === 0 ? "panelContent__sortBtn panelContent__sortBtn--active" : "panelContent__sortBtn"} onClick={() => { setOrders(sortByDate(true)); setSorting(0); }}>
                        Najnowsze
                    </button>
                    <button className={sorting === 1 ? "panelContent__sortBtn panelContent__sortBtn--active" : "panelContent__sortBtn"} onClick={() => { setOrders(sortByDate(false)); setSorting(1); }}>
                        Najstarsze
                    </button>
                </section>
            </header>

            <main className="panelContent__content">
                {orders?.map((item, index) => {
                    if(((filterOplacone)&&(filterNieoplacone))||((filterOplacone)&&(item.payment_status.toLowerCase() === "opłacone"))||((filterNieoplacone)&&(item.payment_status.toLowerCase() === "nieopłacone"))) {
                        return <SingleOrder item={item} />
                    }
                    else {
                        return "";
                    }
                })}
            </main>
        </main>
    </main>
}

export default PanelOrdersContent;
