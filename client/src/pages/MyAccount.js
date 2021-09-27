import React, { useState, useEffect } from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import userIcon from "../static/img/user_square.svg";
import phoneIcon from "../static/img/phone.svg";
import lockIcon from '../static/img/lock.svg'
import locationIcon from "../static/img/location.svg";
import {
    addUser,
    changeUserPassword,
    getUserData,
    getUserOrders, updateCompany,
    updateUser,
    userLogout
} from "../helpers/userFunctions";
import { useFormik } from "formik";
import * as Yup from 'yup'
import SingleOrder from "../components/SingleOrder";
import auth from "../admin/helpers/auth";
import companyIcon from "../static/img/company-name.svg";
import nipIcon from "../static/img/number-sign.svg";

const MyAccount = () => {
    useEffect(() => {
        /* Authorization */
        auth(localStorage.getItem('sec-sessionKey'))
            .then(res => {
                if(!res.data?.result) window.location = "/";
            });
    }, []);

    const [changePasswordResult, setChangePasswordResult] = useState("");
    const [updateUserResult, setUpdateUserResult] = useState("");
    const [updateCompanyResult, setUpdateCompanyResult] = useState("");
    const [orders, setOrders] = useState([]);

    const [userId, setUserId] = useState(parseInt(localStorage.getItem('sec-user-id')));
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");

    const [companyName, setCompanyName] = useState("");
    const [nip, setNip] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyPostalCode, setCompanyPostalCode] = useState("");

    useEffect(() => {
        console.log(userId);
        getUserData(userId)
            .then(res => {
                const result = res?.data?.result;
                if(result) {
                    setFullName(result.full_name);
                    setPhoneNumber(result.phone_number);
                    setAddress(result.address);
                    setPostalCode(result.postal_code);
                    setCity(result.city);

                    setCompanyName(result.company_name);
                    setNip(result.company_nip);
                    setCompanyAddress(result.company_address);
                    setCompanyPostalCode(result.company_postal_code);
                    setCompanyCity(result.company_city);
                }
            });

        getUserOrders(userId)
            .then(res => {
                setOrders(res?.data?.result);
            });
    }, []);

    const changePasswordValidationSchema = Yup.object({
        password: Yup.string()
            .min(6, "Hasło musi mieć co najmniej 6 znaków długości")
            .required("Wpisz nowe hasło"),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password')], "Podane hasła nie są identyczne")
            .required("Powtórz nowe hasło")
    });

    const changePasswordFormik = useFormik({
        initialValues: {
            oldPassword: "",
            password: "",
            repeatPassword: ""
        },
        validationSchema: changePasswordValidationSchema,
        onSubmit: ({oldPassword, password}) => {
            changeUserPassword(1, oldPassword, password)
                .then(res => {
                    const result = res?.data?.result;
                    if(result === 1) {
                        setChangePasswordResult("Hasło zostało zmienione");
                    }
                    else if(result === 0) {
                        setChangePasswordResult("Podane stare hasło jest nieprawidłowe");
                    }
                    else {
                        setChangePasswordResult("Coś poszło nie tak... Prosimy spróbować później");
                    }
                })
        }
    });

    const updateCurrentUser = () => {
        updateUser(1, fullName, phoneNumber, address, postalCode, city)
            .then(res => {
                if(res?.data?.result) setUpdateUserResult("Dane zostały zaktualizowane");
                else setUpdateUserResult("Coś poszło nie tak... Prosimy spróbować później");
            });
    }

    const updateVatData = () => {
        updateCompany(1, companyName, nip, companyAddress, companyPostalCode, companyCity)
            .then(res => {
               if(res?.data?.result) setUpdateCompanyResult("Zmiany zostały wprowadzone");
               else setUpdateCompanyResult("Coś poszło nie tak... Prosimy spróbować później");
            });
    }

    useEffect(() => {
        if(changePasswordResult !== "") {
            setTimeout(() => {
                setChangePasswordResult("");
            }, 2000);
        }
    }, [changePasswordResult]);

    useEffect(() => {
        if(updateUserResult !== "") {
            setTimeout(() => {
                setUpdateUserResult("");
            }, 2000);
        }
    }, [updateUserResult]);

    useEffect(() => {
        if(updateCompanyResult !== "") {
            setTimeout(() => {
                setUpdateCompanyResult("");
            }, 2000);
        }
    }, [updateCompanyResult]);

    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />

        <main className="myAccount">
            <SectionHeader title="Panel klienta" logout={true} />
            <main className="myAccount__inner">
                <section className="myAccount__section myAccount__section--orders">
                    <section className="form__inner">
                        <h3 className="form__inner__header">
                            Twoje zamówienia
                        </h3>

                        {orders?.length ? orders?.map((item, index) => {
                            return <SingleOrder key={index}
                                                id={item.id}
                                                date={item.date}
                                                orderStatus={item.order_status}
                                                paymentStatus={item.payment_status} />
                        }) : <h4 className="noOrdersHeader">
                            Brak zamówień
                        </h4> }
                    </section>
                </section>


                <section className="myAccount__section myAccount__section--data">
                    <section className="form__inner">
                        <h3 className="form__inner__header">
                            Dane dostawy

                            <button className="button button--myAccount" onClick={() => { updateCurrentUser(); }}>
                                Zmień
                            </button>
                        </h3>

                        {updateUserResult === "" ? <>
                            <label className="label">
                                <img className="label__icon" src={userIcon} alt="imie-i-nazwisko" />
                                <input className="input"
                                       name="fullName"
                                       value={fullName}
                                       onChange={(e) => { setFullName(e.target.value); }}
                                       placeholder="Imię i nazwisko" />
                            </label>
                            <label className="label">
                                <img className="label__icon" src={phoneIcon} alt="numer-telefonu" />
                                <input className="input"
                                       name="phoneNumber"
                                       value={phoneNumber}
                                       onChange={(e) => { setPhoneNumber(e.target.value); }}
                                       placeholder="Nr telefonu" />
                            </label>
                            <label className="label">
                                <img className="label__icon" src={locationIcon} alt="ulica" />
                                <input className="input"
                                       name="address"
                                       value={address}
                                       onChange={(e) => { setAddress(e.target.value); }}
                                       placeholder="Ulica i nr domu/lokalu" />
                            </label>
                            <section className="form__flex">
                                <label className="label">
                                    <img className="label__icon" src={locationIcon} alt="kod-pocztowy" />
                                    <input className="input"
                                           name="postalCode"
                                           value={postalCode}
                                           onChange={(e) => { setPostalCode(e.target.value); }}
                                           placeholder="Kod pocztowy" />
                                </label>
                                <label className="label">
                                    <img className="label__icon" src={locationIcon} alt="miasto" />
                                    <input className="input"
                                           name="city"
                                           value={city}
                                           onChange={(e) => { setCity(e.target.value); }}
                                           placeholder="Miasto" />
                                </label>
                            </section>
                        </> : <span className="changePasswordResult">
                            {updateUserResult}
                        </span>}
                    </section>

                    <section className="form__inner">
                        <h3 className="form__inner__header">
                            Dane do faktury

                            <button className="button button--myAccount" onClick={() => { updateVatData(); }}>
                                Zmień
                            </button>
                        </h3>

                        {updateCompanyResult === "" ? <>
                            <label className="label">
                                <img className="label__icon" src={companyIcon} alt="nazwa-firmy" />
                                <input className="input"
                                       name="companyName"
                                       value={companyName}
                                       onChange={(e) => { setCompanyName(e.target.value); }}
                                       placeholder="Nazwa firmy" />
                            </label>
                            <label className="label">
                                <img className="label__icon" src={nipIcon} alt="nip" />
                                <input className="input"
                                       name="nip"
                                       value={nip}
                                       onChange={(e) => { setNip(e.target.value); }}
                                       placeholder="NIP" />
                            </label>
                            <label className="label">
                                <img className="label__icon" src={locationIcon} alt="ulica" />
                                <input className="input"
                                       name="companyAddress"
                                       value={companyAddress}
                                       onChange={(e) => { setCompanyAddress(e.target.value); }}
                                       placeholder="Ulica i nr domu/lokalu" />
                            </label>
                            <section className="form__flex">
                                <label className="label">
                                    <img className="label__icon" src={locationIcon} alt="kod-pocztowy" />
                                    <input className="input"
                                           name="companyPostalCode"
                                           value={companyPostalCode}
                                           onChange={(e) => { setCompanyPostalCode(e.target.value); }}
                                           placeholder="Kod pocztowy" />
                                </label>
                                <label className="label">
                                    <img className="label__icon" src={locationIcon} alt="miasto" />
                                    <input className="input"
                                           name="companyCity"
                                           value={companyCity}
                                           onChange={(e) => { setCompanyCity(e.target.value); }}
                                           placeholder="Miasto" />
                                </label>
                            </section>
                        </> : <span className="changePasswordResult">
                            {updateCompanyResult}
                        </span>}
                    </section>

                    <form className="form__inner" onSubmit={changePasswordFormik.handleSubmit}>
                        <h3 className="form__inner__header">
                            Zmień hasło

                            <button className="button button--myAccount" type="submit">
                                Zmień
                            </button>
                        </h3>

                        {changePasswordResult === "" ? <>
                            <label className="label">
                                <img className="label__icon" src={lockIcon} alt="stare-haslo" />
                                <input className="input"
                                       type="password"
                                       name="oldPassword"
                                       value={changePasswordFormik.values.oldPassword}
                                       onChange={changePasswordFormik.handleChange}
                                       placeholder="Stare hasło" />
                            </label>
                            <label className="label">
                                <img className="label__icon" src={lockIcon} alt="nowe-haslo" />
                                <input className="input"
                                       name="password"
                                       type="password"
                                       value={changePasswordFormik.values.password}
                                       onChange={changePasswordFormik.handleChange}
                                       placeholder="Nowe hasło" />
                                {changePasswordFormik.errors.password && changePasswordFormik.touched.password ? <span className="formError">{changePasswordFormik.errors.password}</span> : "" }
                            </label>
                            <label className="label">
                                <img className="label__icon" src={lockIcon} alt="powtorz-nowe-haslo" />
                                <input className="input"
                                       name="repeatPassword"
                                       type="password"
                                       value={changePasswordFormik.values.repeatPassword}
                                       onChange={changePasswordFormik.handleChange}
                                       placeholder="Powtórz hasło" />
                                {changePasswordFormik.errors.repeatPassword && changePasswordFormik.touched.repeatPassword ? <span className="formError">{changePasswordFormik.errors.repeatPassword}</span> : "" }
                            </label>
                        </> : <span className="changePasswordResult">
                            {changePasswordResult}
                        </span>}

                    </form>
                </section>
            </main>
        </main>

        <Footer />
    </div>
}

export default MyAccount;
