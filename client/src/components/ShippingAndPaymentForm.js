import React, { useState, useEffect, useRef, useContext } from 'react'
import SectionHeader from "./SectionHeader";
import companyIcon from "../static/img/company-name.svg";
import nipIcon from "../static/img/number-sign.svg";
import locationIcon from "../static/img/location.svg";
import { useFormik } from "formik";
import * as Yup from 'yup'
import userIcon from "../static/img/user_square.svg";
import phoneIcon from "../static/img/phone.svg";
import mailIcon from "../static/img/mail.svg";
import {CartContext} from "../App";
import {getAllShippingMethods} from "../admin/helpers/shippingFunctions";
import {addNewOrder, addSell, checkCouponCode} from "../admin/helpers/orderFunctions";
import Modal from 'react-modal';
import GeolocationWidget from "./GeolocationWidget";
import closeImg from '../static/img/close.png'
import {addUser} from "../helpers/userFunctions";
import settings from "../admin/helpers/settings";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const ShippingAndPaymentForm = () => {
    const [vat, setVat] = useState(false);
    const [shipping, setShipping] = useState(-1);
    const [payment, setPayment] = useState(-1);
    const [coupon, setCoupon] = useState("");
    const [sum, setSum] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [inPostModal, setInPostModal] = useState(false);
    const [discount, setDiscount] = useState("");
    const [discountInPLN, setDiscountInPLN] = useState(0);
    const [couponVerified, setCouponVerified] = useState(-1);
    const [isAuth, setIsAuth] = useState(false);
    const [inPostAddress, setInPostAddress] = useState("");
    const [inPostCity, setInPostCity] = useState("");
    const [inPostCode, setInPostCode] = useState("");
    const [checkbox, setCheckbox] = useState(true);
    const [accoundExistsError, setAccountExistsError] = useState("");

    const { cartContent } = useContext(CartContext);

    useEffect(() => {
        window.easyPackAsyncInit = function () {
            window.easyPack.init({
                mapType: 'google',
                searchType: 'osm',
                map: {
                    googleKey: 'AIzaSyAS0nA7DChYpHzv5CVpXM1K4vqYaGNCElw'
                }
            });
            //if(document.querySelector(".cart")) {
                const map = window.easyPack.mapWidget('paczkomatyMapa', function(point) {
                    /* Paczkomat zostal wybrany */
                    sessionStorage.setItem('paczkomat-miasto', point.address_details.city);
                    sessionStorage.setItem('paczkomat-kod', point.address_details.post_code);
                    sessionStorage.setItem('paczkomat-adres', point.address_details.street + " " + point.address_details.building_number);

                    const storage = new Event('storage');
                    document.dispatchEvent(storage);

                    const modal = document.querySelector(".bigModal");
                    if(modal) {
                        modal.style.opacity = "0";
                        setTimeout(() => {
                            modal.style.display = "none";
                        }, 500);
                    }
                });
            //}
        };
    }, [inPostModal]);

    useEffect(() => {
        let sum = 0;
        cartContent?.forEach((item, index, array) => {
            sum += item.price * item.amount;
            if(index === array.length-1) setSum(sum);
        });

        getAllShippingMethods()
            .then(res => {
                console.log(res?.data);
                setShippingMethods(res?.data?.result);
            });

        /* InPost listener */
        document.addEventListener("click", () => {
            setInPostAddress(sessionStorage.getItem('paczkomat-adres'));
            setInPostCode(sessionStorage.getItem('paczkomat-kod'));
            setInPostCity(sessionStorage.getItem('paczkomat-miasto'));
        })
    }, []);

    const getShippingMethodById = (id) => {
        return shippingMethods.find((item) => {
            return item.id === id;
        });
    }

    useEffect(() => {
        if(shipping !== -1) {
            setShippingCost(getShippingMethodById(shipping).price);
        }
    }, [shipping]);

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required("Wpisz swoje imię i nazwisko"),
        email: Yup.string()
            .email("Podaj poprawny adres email")
            .required("Wpisz swój adres email"),
        phoneNumber: Yup.string()
            .matches(/\d{3,}/, 'Numer telefonu może zawierać wyłącznie cyfry')
            .required("Podaj swój numer telefonu"),
        address: Yup.string()
            .required("Podaj swój adres"),
        postalCode: Yup.string()
            .matches(/\d{2}-\d{3}/, "Podaj poprawny kod pocztowy")
            .required("Podaj swój kod pocztowy"),
        city: Yup.string()
            .required("Podaj swoją miejscowość"),
        // check: Yup.boolean()
        //     .oneOf([true]),
        marketing: Yup.boolean()
            .oneOf([true, false])
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            repeatPassword: "",
            fullName: "",
            phoneNumber: "",
            postalCode: "",
            city: "",
            address: "",
            companyName: "",
            nip: "",
            companyAddress: "",
            companyPostalCode: "",
            companyCity: "",
            check: false,
            marketing: false
        },
        validationSchema,
        onSubmit: ({email, password, fullName, phoneNumber, postalCode, city, street, address, companyName, nip, companyAddress, companyPostalCode, companyCity}) => {
            console.log("submit");
            if((shipping !== -1)&&(payment !== -1)) {
                console.log("subbmitting");
                const sessionId = uuidv4();

                /* Add user */
                if(!isAuth) {
                    addUser(email, null, fullName, phoneNumber, null, null, null, null, null, null, null, null)
                        .then(res => {
                            if(res.data.result === -1) {
                                setAccountExistsError("Istnieje konto o podanym adresie email. Aby dokonać zakupu, zaloguj się.");
                            }
                            else {
                                addOrder(res, sessionId);
                            }
                        });
                }
                else {
                    //addOrder(null, sessionId);
                }
            }
        }
    });

    const addOrder = (res, sessionId) => {
        let insertedUserId = null;

        if(res) insertedUserId = res.data.userId;
        console.log(res.data);

        if(checkbox) {
            /* Add order */
            addNewOrder(payment, shipping, formik.values.address, formik.values.postalCode, formik.values.city, insertedUserId,
                formik.values.comment, sessionId, formik.values.companyName, formik.values.nip, formik.values.companyAddress, formik.values.companyPostalCode, formik.values.companyCity,
                sessionStorage.getItem('paczkomat-adres'), sessionStorage.getItem('paczkomat-kod'), sessionStorage.getItem('paczkomat-miasto'))
                .then(res => {
                    const orderId = res.data.result;

                    if(orderId) {
                        /* Add sells */
                        const cart = JSON.parse(localStorage.getItem('sec-cart'));
                        cart?.forEach((item, cartIndex) => {
                            /* Add sells */
                            addSell(orderId, item, payment);
                        });

                        if(payment === 2) {
                            /* Platnosc za pobraniem */
                            localStorage.setItem('sec-ty', 'true');
                            window.location = "/dziekujemy";

                            /* Remove cart from local storage */
                            localStorage.removeItem('sec-cart');
                        }
                        else {
                            /* PAYMENT PROCESS */
                            let paymentUri = "https://sandbox.przelewy24.pl/trnRequest/";

                            axios.post(`${settings.API_URL}/payment/payment`, {
                                sessionId,
                                email: formik.values.email,
                                amount: sum + shippingCost - discountInPLN
                            })
                                .then(res => {
                                    /* Remove cart from local storage */
                                    localStorage.removeItem('sec-cart');

                                    const token = res.data.result;
                                    window.location.href = `${paymentUri}${token}`;
                                });
                        }
                    }
                    else {
                        window.location = "/";
                    }
                });
        }
    }

    const verifyCoupon = () => {
        checkCouponCode(coupon)
            .then(res => {
                const result = res.data;
                if(result) {
                    if(result.percent) {
                        setCouponVerified(1);
                        setSum(Math.round(sum - sum * (result.percent / 100)));
                        setDiscount("-" + result.percent + "%");
                        setDiscountInPLN(Math.round(sum * (result.percent / 100)));
                    }
                    else if(result.amount) {
                        setCouponVerified(1);
                        setSum(sum - result.amount);
                        setDiscount("-" + result.amount + " PLN");
                        setDiscountInPLN(result.amount);
                    }
                    else {
                        setCouponVerified(0);
                    }
                }
                else {
                    setCouponVerified(0);
                }
            });
    }

    useEffect(() => {
        if(couponVerified === 0) {
            setTimeout(() => {
                setCouponVerified(-1);
            }, 2000);
        }
    }, [couponVerified]);

    const changeShipping = (id) => {
        setShipping(id);
        if(id === 1) {
            /* Paczkomaty */
            document.querySelector(".bigModal").style.display = "block";
            document.querySelector(".bigModal").style.opacity = "1";
            document.querySelector("#easypack-search")?.setAttribute('autocomplete', 'off');
            setInPostModal(true);
        }
    }

    Modal.setAppElement(document.querySelector(".shippingAndPayment"));

    return <main className="shippingAndPayment">
        <Modal
            isOpen={inPostModal}
            portalClassName="smallModal bigModal"
            onRequestClose={() => { setInPostModal(false) }}
        >

            <button className="modalClose" onClick={() => { setInPostModal(false) }}>
                <img className="modalClose__img" src={closeImg} alt="zamknij" />
            </button>

            <GeolocationWidget />
        </Modal>

        <SectionHeader title="Formularz zamówienia" />

        <form className="shippingAndPayment__form" onSubmit={formik.handleSubmit}>
            <section className="shippingAndPayment__form__section">
                <section className="form__inner">
                    <h3 className="form__inner__header">
                        Dane osobowe
                    </h3>
                    <label className="label">
                        <img className="label__icon" src={userIcon} alt="imie-i-nazwisko" />
                        <input className="input"
                               name="fullName"
                               value={formik.values.fullName}
                               onChange={formik.handleChange}
                               placeholder="Imię i nazwisko" />
                        {formik.errors.fullName && formik.touched.fullName ? <span className="formError">{formik.errors.fullName}</span> : "" }
                    </label>
                    <label className="label">
                        <img className="label__icon" src={phoneIcon} alt="numer-telefonu" />
                        <input className="input"
                               name="phoneNumber"
                               value={formik.values.phoneNumber}
                               onChange={formik.handleChange}
                               placeholder="Nr telefonu" />
                        {formik.errors.phoneNumber && formik.touched.phoneNumber ? <span className="formError">{formik.errors.phoneNumber}</span> : "" }
                    </label>
                    <label className="label">
                        <img className="label__icon" src={mailIcon} alt="adres-email" />
                        <input className="input"
                               name="email"
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               placeholder="Adres e-mail" />
                        {formik.errors.email && formik.touched.email ? <span className="formError">{formik.errors.email}</span> : "" }
                    </label>
                    <label className="label">
                        <img className="label__icon" src={locationIcon} alt="ulica" />
                        <input className="input"
                               name="address"
                               value={formik.values.address}
                               onChange={formik.handleChange}
                               placeholder="Ulica i nr domu/lokalu" />
                        {formik.errors.address && formik.touched.address ? <span className="formError">{formik.errors.address}</span> : "" }
                    </label>
                    <section className="form__flex">
                        <label className="label">
                            <img className="label__icon" src={locationIcon} alt="kod-pocztowy" />
                            <input className="input"
                                   name="postalCode"
                                   value={formik.values.postalCode}
                                   onChange={formik.handleChange}
                                   placeholder="Kod pocztowy" />
                            {formik.errors.postalCode && formik.touched.postalCode ? <span className="formError">{formik.errors.postalCode}</span> : "" }
                        </label>
                        <label className="label">
                            <img className="label__icon" src={locationIcon} alt="miasto" />
                            <input className="input"
                                   name="city"
                                   value={formik.values.city}
                                   onChange={formik.handleChange}
                                   placeholder="Miasto" />
                            {formik.errors.city && formik.touched.city ? <span className="formError">{formik.errors.city}</span> : "" }
                        </label>
                    </section>
                </section>

                <label className="label--vat">
                    <button type="button" className="checkBtn" onClick={() => { setVat(!vat); }}>
                        {vat ? <span className="checkBtn--check"></span> : ""}
                    </button>
                    Chcę otrzymać fakturę VAT
                </label>

                {vat ? <section className="form__inner">
                    <h3 className="form__inner__header">
                        Dane firmy
                    </h3>

                    <label className="label">
                        <img className="label__icon" src={companyIcon} alt="nazwa-firmy" />
                        <input className="input"
                               name="companyName"
                               value={formik.values.companyName}
                               onChange={formik.handleChange}
                               placeholder="Nazwa firmy" />
                    </label>
                    <label className="label">
                        <img className="label__icon" src={nipIcon} alt="nip" />
                        <input className="input"
                               name="nip"
                               value={formik.values.nip}
                               onChange={formik.handleChange}
                               placeholder="NIP" />
                    </label>
                    <label className="label">
                        <img className="label__icon" src={locationIcon} alt="ulica" />
                        <input className="input"
                               name="companyAddress"
                               value={formik.values.companyAddress}
                               onChange={formik.handleChange}
                               placeholder="Ulica i nr domu/lokalu" />
                    </label>
                    <section className="form__flex">
                        <label className="label">
                            <img className="label__icon" src={locationIcon} alt="kod-pocztowy" />
                            <input className="input"
                                   name="companyPostalCode"
                                   value={formik.values.companyPostalCode}
                                   onChange={formik.handleChange}
                                   placeholder="Kod pocztowy" />
                        </label>
                        <label className="label">
                            <img className="label__icon" src={locationIcon} alt="miasto" />
                            <input className="input"
                                   name="companyCity"
                                   value={formik.values.companyCity}
                                   onChange={formik.handleChange}
                                   placeholder="Miasto" />
                        </label>
                    </section>
                </section> : ""}
            </section>

            <section className="shippingAndPayment__form__section">
                <section className="form__inner">
                    <h3 className="form__inner__header">
                        Sposób wysyłki
                    </h3>
                    {shippingMethods?.map((item, index) => {
                        return <><label key={index} className="label--vat">
                            <button type="button" className="checkBtn" onClick={() => { changeShipping(item.id); }}>
                                {shipping === item.id ? <span className="checkBtn--check"></span> : ""}
                            </button>
                            {item.name} ({item.price} PLN)
                        </label>
                            {index === 0 && shipping === 1 ? <span className="label--vat">
                                {inPostAddress}<br/>
                                {inPostCode} {inPostCity}
                            </span> : ""}
                        </>
                    })}


                    <h3 className="form__inner__header form__inner__header--extraMargin">
                        Sposób płatności
                    </h3>
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setPayment(1); }}>
                            {payment === 1 ? <span className="checkBtn--check"></span> : ""}
                        </button>
                        Płatności internetowe
                    </label>
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setPayment(2); }}>
                            {payment === 2 ? <span className="checkBtn--check"></span> : ""}
                        </button>
                        Płatność za pobraniem
                    </label>

                    <h3 className="form__inner__header form__inner__header--extraMargin">
                        Pozostałe
                    </h3>
                    <section className="label label--section">
                        <label className="label label--coupon">
                            <input className="input"
                                   name="coupon"
                                   value={coupon}
                                   onChange={(e) => { if(couponVerified !== 1) setCoupon(e.target.value); }}
                                   placeholder="Kod rabatowy" />
                            {couponVerified !== 1 && couponVerified !== 0 ? <button type="button" className="button button--coupon" onClick={() => { verifyCoupon(); }}>
                                Użyj
                            </button> : (couponVerified === 1 ? <h4 className="couponInfo couponInfo--success">
                                {/*<img className="tickImg d-none d-md-inline" src={tickIcon} alt="dodany" />*/}
                                Kupon został dodany
                            </h4> : "")}

                            {couponVerified === 0 ? <h4 className="couponInfo couponInfo--error">
                                Podany kupon nie istnieje
                            </h4> : ""}
                        </label>
                    </section>
                    <label>
                    <textarea className="textarea"
                              name="comment"
                              placeholder="Komentarz do zamówienia (opcjonalnie)"
                              value={formik.values.comment}
                              onChange={formik.handleChange} />
                    </label>
                </section>

                {couponVerified === 1 ? <h4 className="clientForm__shippingHeader mt-5">
                    Kod rabatowy: <b>{coupon} ({discount})</b>
                </h4> : ""}

                <section className="cart__item__price">
                    <h3 className="cart__item__key">
                        Podsumowanie
                    </h3>
                    <h4 className="cart__item__value">
                        {sum + shippingCost} PLN
                    </h4>
                </section>

                <button type="submit" className="button button--shippingAndPayment">
                    Zamawiam
                </button>
            </section>
        </form>
    </main>
}

export default ShippingAndPaymentForm;
