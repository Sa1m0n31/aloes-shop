import React from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <main className="login">
            <SectionHeader title="Panel logowania" />

            <h3 className="login__header">
                Wpisz swoje dane i zaloguj się do panelu klienta
            </h3>

            <LoginForm />
            <a className="afterLoginForm" href="/zarejestruj-sie">
                Nie masz konta? Zarejestruj się
            </a>
        </main>
        <Footer />
    </div>
}

export default LoginPage;
