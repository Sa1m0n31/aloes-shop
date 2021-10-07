import React, {useEffect} from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteMenu from "../components/SiteMenu";
import HeroSection from "../components/HeroSection";
import ProductsRow from "../components/ProductsRow";
import Footer from "../components/Footer";
import AboutProducent from "../components/AboutProducent";
import IconsSection from "../components/IconsSection";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import AddedToCart from "../components/AddedToCart";
import StartBaner from "../components/StartBaner";

const Homepage = () => {
    useEffect(() => {
        if(!sessionStorage.getItem('caloe-baner')) {
            sessionStorage.setItem('caloe-baner', 'true');
        }
    }, []);

    return <div className="container homepage">
        <AddedToCart />
        {sessionStorage.getItem('caloe-baner') ? "" : <StartBaner />}

        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <HeroSection />
        <ProductsRow title="Polecane" type="Recoms" />
        <ProductsRow title="Promocje" type="Discounts" />
        <AboutProducent />
        <IconsSection />
        <Footer />
    </div>
}

export default Homepage;
