import React, {useEffect, useState} from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import SectionHeader from "../components/SectionHeader";
import Footer from "../components/Footer";

const AfterRegisterPage = () => {
    const [header, setHeader] = useState("");

    useEffect(() => {
        const result = localStorage.getItem('sec-user-registered');
        if(result === 'true') {
            setHeader("Twoje konto zostało założone");
        }
        else if(result === 'exists') {
            setHeader("Konto o podanym adresie e-mail już istnieje");
        }
        else if(result === 'false') {
            setHeader("Coś poszło nie tak... Prosimy spróbować później");
        }
        else {
            window.location = "/";
        }
    }, []);

    return <div className="container">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <main className="tyPage">
            <SectionHeader title="Proces rejestracji zakończony" />

            <h2 className="tyPage__header">
                {header}
            </h2>
            <a className="button button--ty" href="/">
                Powrót na stronę główną
            </a>
        </main>
        <Footer />
    </div>
}

export default AfterRegisterPage;
