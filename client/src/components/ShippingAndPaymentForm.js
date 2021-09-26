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

const ShippingAndPaymentForm = () => {
    const [vat, setVat] = useState(true);
    const [shipping, setShipping] = useState(-1);
    const [payment, setPayment] = useState(-1);
    const [coupon, setCoupon] = useState("");
    const [sum, setSum] = useState(0);

    const { cartContent } = useContext(CartContext);

    useEffect(() => {
        let sum = 0;
        cartContent?.forEach((item, index, array) => {
            sum += item.price * item.amount;
            if(index === array.length-1) setSum(sum);
        });
    }, []);

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required("Wpisz swoje imię i nazwisko"),
        email: Yup.string()
            .email("Podaj poprawny adres email")
            .required("Wpisz swój adres email"),
        password: Yup.string()
            .min(6, "Hasło musi składać się z co najmniej sześciu znaków")
            .required("Wpisz hasło"),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password')], "Podane hasła nie są identyczne")
            .required("Powtórz hasło"),
        phoneNumber: Yup.string()
            .matches(/\d{3,}/, 'Numer telefonu może zawierać wyłącznie cyfry'),
        postalCode: Yup.string()
            .matches(/\d{2}-\d{3}/, "Podaj poprawny kod pocztowy"),
        check: Yup.boolean()
            .oneOf([true]),
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
            street: "",
            companyName: "",
            nip: "",
            companyStreet: "",
            companyPostalCode: "",
            companyCity: "",
            check: false,
            marketing: false
        },
        validationSchema,
        onSubmit: ({email, password, firstName, lastName, phoneNumber, postalCode, city, street, building, flat, marketing}) => {
            console.log(email);
        }
    });

    const checkCouponCode = () => {

    }

    return <main className="shippingAndPayment">
        <SectionHeader title="Formularz zamówienia" />

        <form className="shippingAndPayment__form">
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
                    </label>
                    <label className="label">
                        <img className="label__icon" src={phoneIcon} alt="numer-telefonu" />
                        <input className="input"
                               name="phoneNumber"
                               value={formik.values.phoneNumber}
                               onChange={formik.handleChange}
                               placeholder="Nr telefonu" />
                    </label>
                    <label className="label">
                        <img className="label__icon" src={mailIcon} alt="adres-email" />
                        <input className="input"
                               name="email"
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               placeholder="Adres e-mail" />
                    </label>
                    <label className="label">
                        <img className="label__icon" src={locationIcon} alt="ulica" />
                        <input className="input"
                               name="street"
                               value={formik.values.street}
                               onChange={formik.handleChange}
                               placeholder="Ulica i nr domu/lokalu" />
                    </label>
                    <section className="form__flex">
                        <label className="label">
                            <img className="label__icon" src={locationIcon} alt="kod-pocztowy" />
                            <input className="input"
                                   name="postalCode"
                                   value={formik.values.postalCode}
                                   onChange={formik.handleChange}
                                   placeholder="Kod pocztowy" />
                        </label>
                        <label className="label">
                            <img className="label__icon" src={locationIcon} alt="miasto" />
                            <input className="input"
                                   name="city"
                                   value={formik.values.city}
                                   onChange={formik.handleChange}
                                   placeholder="Miasto" />
                        </label>
                    </section>
                </section>

                <label className="label--vat">
                    <button type="button" className="checkBtn" onClick={() => { setVat(!vat); }}>
                        {vat ? <span className="checkBtn--check"></span> : ""}
                    </button>
                    Chcę otrzymywać faktury VAT
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
                               name="companyStreet"
                               value={formik.values.companyStreet}
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
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setShipping(0); }}>
                            {shipping === 0 ? <span className="checkBtn--check"></span> : ""}
                        </button>
                        Paczkomaty InPost
                    </label>
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setShipping(1); }}>
                            {shipping === 1 ? <span className="checkBtn--check"></span> : ""}
                        </button>
                        Kurier DHL
                    </label>
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setShipping(2); }}>
                            {shipping === 2 ? <span className="checkBtn--check"></span> : ""}
                        </button>
                        Kurier DPD
                    </label>


                    <h3 className="form__inner__header form__inner__header--extraMargin">
                        Sposób płatności
                    </h3>
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setPayment(0); }}>
                            {payment === 0 ? <span className="checkBtn--check"></span> : ""}
                        </button>
                        Płatności internetowe
                    </label>
                    <label className="label--vat">
                        <button type="button" className="checkBtn" onClick={() => { setPayment(1); }}>
                            {payment === 1 ? <span className="checkBtn--check"></span> : ""}
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
                                   onChange={(e) => { setCoupon(e.target.value); }}
                                   placeholder="Kod rabatowy" />
                            <button className="button button--coupon" onClick={() => { checkCouponCode(); }}>
                                Użyj
                            </button>
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

                <section className="cart__item__price">
                    <h3 className="cart__item__key">
                        Podsumowanie
                    </h3>
                    <h4 className="cart__item__value">
                        {sum} PLN
                    </h4>
                </section>

                <button className="button button--shippingAndPayment">
                    Zamawiam
                </button>
            </section>
        </form>
    </main>
}

export default ShippingAndPaymentForm;
