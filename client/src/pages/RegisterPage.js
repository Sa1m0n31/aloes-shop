import React, {useEffect} from 'react'
import SectionHeader from "../components/SectionHeader";
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import auth from "../admin/helpers/auth";

const RegisterPage = () => {
    useEffect(() => {
        /* Authorization */
        auth(localStorage.getItem('sec-sessionKey'))
            .then(res => {
                if(res.data?.result) window.location = "/moje-konto";
            });
    }, []);

    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />

        <main className="register">
            <SectionHeader title="Rejestracja" />
            <RegisterForm />
        </main>

        <Footer />

    </div>
}

export default RegisterPage;
