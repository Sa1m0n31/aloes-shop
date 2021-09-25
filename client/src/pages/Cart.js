import React from 'react'
import SiteHeader from "../components/SiteHeader";
import SiteHeaderMobile from "../components/SiteHeaderMobile";
import SiteMenu from "../components/SiteMenu";
import Footer from "../components/Footer";

const Cart = () => {
    return <div className="container cart">
        <SiteHeader />
        <SiteHeaderMobile />
        <SiteMenu />

        <Footer />
    </div>
}

export default Cart;
