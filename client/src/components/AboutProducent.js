import React from 'react'
import logo from '../static/img/logo.png';
import Advantages from "./Advantages";
import SectionHeader from "./SectionHeader";

const AboutProducent = ({shop}) => {
    return <section className={shop ? "section aboutProducent aboutProducent--shop" : "section aboutProducent"}>
        {!shop ? <SectionHeader title="O producencie" /> : ""}

        <article className="aboutProducent__content">
            <section className="flex">
                <img className="aboutProducent__logo" src={logo} alt="forever-living" />

                <article className="aboutProducent__text">
                    <h4 className="aboutProducent__contentHeader">
                        Forever Living Products
                    </h4>
                    <p>
                        Od 1978 roku Forever Living Products pomaga wyglądać i czuć się lepiej, działając w nieco inny sposób. Na własnych plantacjach wytwarza 30 milionów kilogramów Aloe Barbadensis Miller, najbardziej wartościową odmianę aloesu. Posiada własny dział badań i rozwoju oraz laboratoria kontroli jakości, w których wykorzystuje najnowszą technologię. Kieruje się zasadą, że rodzina jest najważniejsza.
                    </p>
                    <p>
                    W sklepie CALOE dostępne są napoje z naturalnym miąższem prosto z wnętrza liści aloesu, suplementy diety wspierające układ trawienny i odpornościowy, produkty wspomagające kontrolę wagi, dążenie do harmonijnej sylwetki, utrzymanie mięśni i stawów w najwyższej kondycji oraz kosmetyki nawilżające, odżywiające i kojące skórę.
                    </p>

                    <p>Na produktach Forever Living Products znajdziesz certyfikaty:
                    </p>
                    <ul>
                        <li>Certyfikat Międzynarodowej Rady Naukowej ds. Aloesu</li>
                        <li>Certyfikat Halal</li>
                        <li>Certyfikat Koszerności</li>
                        <li>Produkty nietestowane na zwierzętach</li>
                    </ul>
                </article>
            </section>
            <article className="aboutProducent__text2">
                <h4 className="aboutProducent__contentHeader">
                    Chcesz kupować taniej?
                </h4>
                <p>
                    Dołącz do Forever Living i zyskaj stały upust na zakupy osobiste 5% lub 30%. Napisz do nas maila o treści „rejestracja” na adres sklep@caloe.pl i dowiedz się więcej!
                </p>
                <p>

                </p>
            </article>
        </article>

        {!shop ? <Advantages /> : ""}
    </section>
}

export default AboutProducent;
