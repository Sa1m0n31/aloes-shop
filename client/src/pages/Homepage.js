import React from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteMenu from "../components/SiteMenu";
import HeroSection from "../components/HeroSection";
import ProductsRow from "../components/ProductsRow";
import Footer from "../components/Footer";
import AboutProducent from "../components/AboutProducent";
import IconsSection from "../components/IconsSection";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import AddedToCart from "../components/AddedToCart";

const Homepage = () => {
    return <div className="container">
        <AddedToCart />

        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />
        <HeroSection />
        <ProductsRow title="Polecane" />
        <ProductsRow title="Promocje" />
        <AboutProducent />
        <IconsSection />
        <Footer />
    </div>
}

export default Homepage;
