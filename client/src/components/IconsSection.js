import React from 'react'
import AdvantagesItem from "./AdvantagesItem";

import img1 from '../static/img/poland.svg'
import img2 from '../static/img/flower.svg'
import img3 from '../static/img/package.svg'

const IconsSection = () => {
    return <section className="iconsSection">
       <main className="iconsSection__main">
           <AdvantagesItem img={img1}
                           title="Polski dystrybutor" />
           <AdvantagesItem img={img2}
                           title="Naturalne produkty"/>
           <AdvantagesItem img={img3}
                           title="Wypełniacz ekologiczny w paczkach" />
       </main>
    </section>
}

export default IconsSection;
