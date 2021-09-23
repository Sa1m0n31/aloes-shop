import React from 'react'

const AdvantagesItem = ({img, title, text}) => {
    return <section className="advantages__item">
        <img className="advantages__img" src={img} alt={title} />
        <h3 className="advantages__header">
            {title}
        </h3>
        <p className="advantages__text">
            {text}
        </p>
    </section>
}

export default AdvantagesItem;
