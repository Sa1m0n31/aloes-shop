import React, { useState, useEffect} from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup'
import mailIcon from "../static/img/mail.svg";
import lockIcon from '../static/img/lock.svg';
import userIcon from '../static/img/user_square.svg'
import locationIcon from '../static/img/location.svg'
import companyIcon from '../static/img/company-name.svg'
import nipIcon from '../static/img/number-sign.svg'
import phoneIcon from '../static/img/phone.svg'

const RegisterForm = () => {
    const [vat, setVat] = useState(false);

    const validationSchema = Yup.object({
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

    return <form className="registerForm" onSubmit={formik.handleSubmit}>
        <section className="form__inner">
            <h3 className="form__inner__header">
                Dane logowania
            </h3>

            <label className="label">
                <img className="label__icon" src={mailIcon} alt="adres-email" />
                <input className="input"
                       name="email"
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       placeholder="Adres e-mail" />
            </label>
            <label className="label">
                <img className="label__icon" src={lockIcon} alt="haslo" />
                <input className="input"
                       name="password"
                       type="password"
                       value={formik.values.password}
                       onChange={formik.handleChange}
                       placeholder="Hasło" />
            </label>
            <label className="label">
                <img className="label__icon" src={lockIcon} alt="haslo" />
                <input className="input"
                       type="password"
                       name="repeatPassword"
                       value={formik.values.repeatPassword}
                       onChange={formik.handleChange}
                       placeholder="Powtórz hasło" />
            </label>
        </section>
        <section className="form__inner">
            <h3 className="form__inner__header">
                Dane dostawy
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

        <button className="button button--submit" type="submit">
            Załóż konto
        </button>
    </form>
}

export default RegisterForm;