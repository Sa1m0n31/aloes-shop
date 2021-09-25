import React from 'react'
import SectionHeader from "../components/SectionHeader";
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
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
