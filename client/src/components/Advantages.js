import React from 'react'
import AdvantagesItem from "./AdvantagesItem";
import img1 from '../static/img/Certyfikat koszerności.jpg'
import img2 from '../static/img/Certyfikat Międzynarodowej Rady Naukowej.png'
import img3 from '../static/img/Halal.jpg'
import img4 from '../static/img/Cruelty-free.jpg'

const Advantages = () => {
    return <section className="advantages">
        <AdvantagesItem img={img1}
                        title="Certyfikat Koszerności"/>
        <span className="advantagesDivider"></span>
        <AdvantagesItem img={img2}
                        title="Certyfikat Międzynarodowej Rady Naukowej ds. Aloesu" />
        <span className="advantagesDivider"></span>
        <AdvantagesItem img={img3}
                        title="Certyfikat Halal"/>
        <span className="advantagesDivider"></span>
        <AdvantagesItem img={img4}
                        title="Produkty nietestowane na zwierzętach" />
    </section>
}

export default Advantages;
