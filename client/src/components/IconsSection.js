import React from 'react'
import AdvantagesItem from "./AdvantagesItem";

import img1 from '../static/img/poland.svg'
import img2 from '../static/img/flower.svg'
import img3 from '../static/img/delivery.svg'

const IconsSection = () => {
    return <section className="iconsSection">
       <main className="iconsSection__main">
           <AdvantagesItem img={img1}
                           title="Polski dystrybutor"
                           text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed" />
           <AdvantagesItem img={img2}
                           title="Naturalne produkty"
                           text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed" />
           <AdvantagesItem img={img3}
                           title="Dostawa w ciągu 48h"
                           text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed" />
       </main>
    </section>
}

export default IconsSection;
