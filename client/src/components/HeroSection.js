import React, { useRef } from 'react'
import ReactSiema from 'react-siema';
import arrow from '../static/img/right-arrow.svg';
import example from '../static/img/baner.png';

const HeroSection = () => {
    let slider = useRef({currentSlide: 0});

    const nextSlide = () => {
        slider.next();
    }

    const prevSlide = () => {
        slider.prev();
    }

    return <main className="hero">
        <button className="hero__btn hero__btn--prev" onClick={() => { prevSlide(); }}>
            <img className="hero__btn__img" src={arrow} alt="poprzedni" />
        </button>
        <ReactSiema perPage={1}
                    ref={siema => { slider = siema; }}
                    loop={true}
        >
            <a className="banner">
                <img className="banner__img" src={example} alt="baner" />
            </a>
            <a className="banner">
                <img className="banner__img" src={example} alt="baner" />
            </a>
            <a className="banner">
                <img className="banner__img" src={example} alt="baner" />
            </a>
        </ReactSiema>
        <button className="hero__btn hero__btn--next" onClick={() => { nextSlide(); }}>
            <img className="hero__btn__img" src={arrow} alt="nastepny" />
        </button>
    </main>
}

export default HeroSection;
