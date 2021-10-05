import React, {useRef, useEffect, useState} from 'react'
import ReactSiema from 'react-siema';
import arrow from '../static/img/right-arrow.svg';
import {getBanners} from "../helpers/homepageFunctions";
import settings from "../admin/helpers/settings";

const HeroSection = () => {
    let slider = useRef({currentSlide: 0});

    const [banners, setBanners] = useState({});
    const [slide, setSlide] = useState(0)

    useEffect(() => {
        getBanners()
            .then(res => {
                setBanners(res?.data?.result);
            });
    }, []);

    const sliderInterval = (slider) => {
        setInterval(() => {
            if(slider) {
                slider.next();
                setSlide(slider.currentSlide);
            }
        }, 5000);
    }

    const nextSlide = () => {
        slider.next();
        setSlide(slider.currentSlide);
    }

    const prevSlide = () => {
        slider.prev();
        setSlide(slider.currentSlide);
    }

    return <main className="hero">
        <button className="hero__btn hero__btn--prev" onClick={() => { prevSlide(); }}>
            <img className="hero__btn__img" src={arrow} alt="poprzedni" />
        </button>
        <ReactSiema perPage={1}
                    ref={siema => { slider = siema; }}
                    loop={true}
        >
            <a className="banner" href={banners.slider_link_1}>
                <img onLoad={() => { sliderInterval(slider); }} className="banner__img" src={`${settings.API_URL}/image?url=/media/homepage/${banners.slider_image_1}`} alt="baner" />
            </a>
            <a className="banner" href={banners.slider_link_2}>
                <img className="banner__img" src={`${settings.API_URL}/image?url=/media/homepage/${banners.slider_image_2}`} alt="baner" />
            </a>
            <a className="banner" href={banners.slider_link_3}>
                <img className="banner__img" src={`${settings.API_URL}/image?url=/media/homepage/${banners.slider_image_3}`} alt="baner" />
            </a>
        </ReactSiema>
        <button className="hero__btn hero__btn--next" onClick={() => { nextSlide(); }}>
            <img className="hero__btn__img" src={arrow} alt="nastepny" />
        </button>
    </main>
}

export default HeroSection;
