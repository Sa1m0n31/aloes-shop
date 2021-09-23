import React from 'react'
import AdvantagesItem from "./AdvantagesItem";
import img from '../static/img/leaves.svg'

const Advantages = () => {
    return <section className="advantages">
        <AdvantagesItem img={img}
                        title="Zaleta 1"
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor" />
        <span className="advantagesDivider"></span>
        <AdvantagesItem img={img}
                        title="Zaleta 2"
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor" />
        <span className="advantagesDivider"></span>
        <AdvantagesItem img={img}
                        title="Zaleta 3"
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor" />
        <span className="advantagesDivider"></span>
        <AdvantagesItem img={img}
                        title="Zaleta 4"
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor" />
    </section>
}

export default Advantages;
